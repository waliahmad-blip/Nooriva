/**
 * ═══════════════════════════════════════════════════════════
 * Noorix AI Engine — Multi-Model Production Grade
 * 
 * Models:
 *   - gemini-3.7-flash       → Main AI (chat, structured analysis)
 *   - gemma-4-26b-a4b-it-maas → Fast lightweight tasks
 *   - medsiglip-448          → Medical image classification
 * 
 * Provider identity is NEVER exposed.
 * ═══════════════════════════════════════════════════════════
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;
const TIMEOUT_MS = 30000;
const MAX_INPUT_LENGTH = 10000;
const MAX_MESSAGES = 50;

const MODELS = {
  main: 'gemini-3.7-flash',
  fast: 'gemma-4-26b-a4b-it-maas',
  medical: 'medsiglip-448',
};

const FAST_FEATURES = ['quickActions', 'moodJournal', 'hydration', 'streaks', 'darkMode'];

let _client = null;

function getClient() {
  if (_client) return _client;
  const key = process.env.NOORIX_AI_KEY;
  if (!key) throw new Error('NOORIX_AI_KEY not configured');
  _client = new GoogleGenerativeAI(key);
  return _client;
}

function getModelForFeature(featureType) {
  if (FAST_FEATURES.includes(featureType)) return MODELS.fast;
  return MODELS.main;
}

function validateMessages(messages) {
  if (!Array.isArray(messages)) throw new Error('Messages must be an array');
  if (messages.length === 0) throw new Error('Messages array is empty');
  if (messages.length > MAX_MESSAGES) throw new Error('Too many messages (max ' + MAX_MESSAGES + ')');
  for (const msg of messages) {
    if (!msg || typeof msg !== 'object') throw new Error('Invalid message object');
    if (!msg.role || !['user', 'assistant', 'model'].includes(msg.role)) throw new Error('Invalid role');
    if (msg.content && typeof msg.content === 'string' && msg.content.length > MAX_INPUT_LENGTH) throw new Error('Message too long');
  }
  return true;
}

function validateSystemPrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') throw new Error('System prompt required');
  if (prompt.length > 20000) throw new Error('System prompt too long');
  return true;
}

async function withRetry(fn, retries = MAX_RETRIES) {
  let lastError;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const isRetryable = error.message?.includes('timeout') || error.message?.includes('rate') ||
        error.message?.includes('503') || error.message?.includes('500') || error.message?.includes('429') ||
        error.message?.includes('ECONNRESET') || error.message?.includes('ETIMEDOUT');
      if (!isRetryable || attempt === retries - 1) throw error;
      const delay = BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 500;
      console.warn('[Noorix] Retry ' + (attempt + 1) + '/' + retries + ' after ' + Math.round(delay) + 'ms');
      await new Promise(function(resolve) { setTimeout(resolve, delay); });
    }
  }
  throw lastError;
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise(function(_, reject) { setTimeout(function() { reject(new Error('Request timed out after ' + ms + 'ms')); }, ms); }),
  ]);
}

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

export async function chat(messages, systemPrompt, featureType) {
  validateMessages(messages);
  validateSystemPrompt(systemPrompt);
  const modelName = getModelForFeature(featureType || 'freeChat');

  return withRetry(async function() {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({ model: modelName, systemInstruction: systemPrompt });
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

export async function chatStructured(messages, systemPrompt, featureType) {
  validateMessages(messages);
  validateSystemPrompt(systemPrompt);
  const modelName = getModelForFeature(featureType || 'skinPhoto');

  return withRetry(async function() {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({
      model: modelName,
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
    try { return JSON.parse(text); }
    catch { return { message: text, actions: [], disclaimer: 'This is AI-generated guidance, not a medical diagnosis.' }; }
  });
}

export async function analyzeMedicalImage(imageBase64, prompt) {
  return withRetry(async function() {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({ model: MODELS.main });
    const imagePart = {
      inlineData: { data: imageBase64.replace(/^data:image\/[a-z]+;base64,/, ''), mimeType: 'image/jpeg' },
    };
    const result = await withTimeout(
      model.generateContent([imagePart, { text: prompt }]),
      TIMEOUT_MS
    );
    const text = result.response.text();
    if (!text || text.trim() === '') throw new Error('Empty response from Noorix');
    try { return JSON.parse(text); }
    catch { return { message: text }; }
  });
}

export async function healthCheck() {
  const start = Date.now();
  try {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({ model: MODELS.main });
    const result = await withTimeout(model.generateContent('ping'), 10000);
    return { status: 'operational', latency: Date.now() - start, models: MODELS };
  } catch (error) {
    return { status: 'degraded', latency: Date.now() - start, error: error.message };
  }
}

export { MODELS };
