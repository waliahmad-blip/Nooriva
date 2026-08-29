/**
 * ═══════════════════════════════════════════════════════════
 * Noorix AI Engine — Production Grade
 * 
 * The ONLY file that touches the cloud provider.
 * All API routes import from here.
 * Provider identity is NEVER exposed.
 * 
 * Features:
 * - Automatic retry with exponential backoff (3 attempts)
 * - 30-second request timeout
 * - Input validation and sanitization
 * - Graceful error handling
 * - Singleton client reuse
 * ═══════════════════════════════════════════════════════════
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

/* ── Constants ── */
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;
const TIMEOUT_MS = 30000;
const MAX_INPUT_LENGTH = 10000;
const MAX_MESSAGES = 50;

/* ── Singleton client ── */
let _client = null;

function getClient() {
  if (_client) return _client;
  const key = process.env.NOORIX_AI_KEY;
  if (!key) throw new Error('NOORIX_AI_KEY not configured');
  _client = new GoogleGenerativeAI(key);
  return _client;
}

/* ── Validation ── */
function validateMessages(messages) {
  if (!Array.isArray(messages)) throw new Error('Messages must be an array');
  if (messages.length === 0) throw new Error('Messages array is empty');
  if (messages.length > MAX_MESSAGES) throw new Error('Too many messages (max ' + MAX_MESSAGES + ')');

  for (const msg of messages) {
    if (!msg || typeof msg !== 'object') throw new Error('Invalid message object');
    if (!msg.role || !['user', 'assistant', 'model'].includes(msg.role)) {
      throw new Error('Invalid message role: ' + msg.role);
    }
    if (msg.content && typeof msg.content === 'string' && msg.content.length > MAX_INPUT_LENGTH) {
      throw new Error('Message too long (max ' + MAX_INPUT_LENGTH + ' chars)');
    }
  }
  return true;
}

function validateSystemPrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') throw new Error('System prompt required');
  if (prompt.length > 20000) throw new Error('System prompt too long');
  return true;
}

/* ── Retry wrapper ── */
async function withRetry(fn, retries = MAX_RETRIES) {
  let lastError;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const isRetryable =
        error.message?.includes('timeout') ||
        error.message?.includes('rate') ||
        error.message?.includes('503') ||
        error.message?.includes('500') ||
        error.message?.includes('429') ||
        error.message?.includes('ECONNRESET') ||
        error.message?.includes('ETIMEDOUT');

      if (!isRetryable || attempt === retries - 1) throw error;

      const delay = BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 500;
      console.warn('[Noorix] Retry ' + (attempt + 1) + '/' + retries + ' after ' + Math.round(delay) + 'ms:', error.message);
      await new Promise(function(resolve) { setTimeout(resolve, delay); });
    }
  }
  throw lastError;
}

/* ── Timeout wrapper ── */
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise(function(_, reject) {
      setTimeout(function() { reject(new Error('Request timed out after ' + ms + 'ms')); }, ms);
    }),
  ]);
}

/* ── Format history for provider ── */
function formatHistory(messages) {
  const history = [];
  for (let i = 0; i < messages.length - 1; i++) {
    const m = messages[i];
    history.push({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: (m.content || '').slice(0, MAX_INPUT_LENGTH) }],
    });
  }
  return history;
}

/* ═══════════════════════════════════════════════════════════
 * Public API
 * ═══════════════════════════════════════════════════════════ */

/**
 * Free-form chat — returns plain text
 * Used by: Free Chat feature
 * 
 * @param {Array} messages - [{role: 'user'|'assistant', content: 'string'}]
 * @param {string} systemPrompt - System instruction
 * @returns {Promise<string>} - AI response text
 */
export async function chat(messages, systemPrompt) {
  validateMessages(messages);
  validateSystemPrompt(systemPrompt);

  return withRetry(async function() {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({
      model: 'noorix-v1',
      systemInstruction: systemPrompt,
    });

    const history = formatHistory(messages);
    const session = model.startChat({ history: history });
    const lastMsg = messages[messages.length - 1];
    const content = (lastMsg.content || '').slice(0, MAX_INPUT_LENGTH);

    const result = await withTimeout(session.sendMessage(content), TIMEOUT_MS);
    const text = result.response.text();

    if (!text || text.trim() === '') throw new Error('Empty response from Noorix');
    return text;
  });
}

/**
 * Structured chat — returns parsed JSON
 * Used by: All 14 structured features
 * 
 * @param {Array} messages - [{role: 'user'|'assistant', content: 'string'}]
 * @param {string} systemPrompt - System instruction with JSON schema
 * @returns {Promise<Object>} - Parsed JSON response
 */
export async function chatStructured(messages, systemPrompt) {
  validateMessages(messages);
  validateSystemPrompt(systemPrompt);

  return withRetry(async function() {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({
      model: 'noorix-v1-structured',
      systemInstruction: systemPrompt,
      generationConfig: { responseMimeType: 'application/json' },
    });

    const history = formatHistory(messages);
    const session = model.startChat({ history: history });
    const lastMsg = messages[messages.length - 1];
    const content = (lastMsg.content || '').slice(0, MAX_INPUT_LENGTH);

    const result = await withTimeout(session.sendMessage(content), TIMEOUT_MS);
    const text = result.response.text();

    if (!text || text.trim() === '') throw new Error('Empty response from Noorix');

    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.warn('[Noorix] JSON parse failed, wrapping raw text');
      return {
        message: text,
        actions: [],
        disclaimer: 'This is AI-generated guidance, not a medical diagnosis.',
      };
    }
  });
}

/**
 * Health check — verify the AI engine is operational
 * @returns {Promise<{status: string, latency: number}>}
 */
export async function healthCheck() {
  const start = Date.now();
  try {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({ model: 'noorix-v1' });
    const result = await withTimeout(
      model.generateContent('ping'),
      10000
    );
    return {
      status: 'operational',
      latency: Date.now() - start,
    };
  } catch (error) {
    return {
      status: 'degraded',
      latency: Date.now() - start,
      error: error.message,
    };
  }
}
