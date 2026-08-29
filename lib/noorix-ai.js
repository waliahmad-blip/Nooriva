/**
 * Noorix AI Engine
 *
 * This is the ONLY file that touches the cloud AI provider.
 * All API routes import from here.
 * The underlying provider is NEVER exposed.
 *
 * Public interface:
 *   - chat(messages, systemPrompt)          → string (free-form text)
 *   - chatStructured(messages, systemPrompt) → object (parsed JSON)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

let _client = null;

function getClient() {
  if (_client) return _client;
  const key = process.env.NOORIX_AI_KEY;
  if (!key) throw new Error('NOORIX_AI_KEY not configured');
  _client = new GoogleGenerativeAI(key);
  return _client;
}

/**
 * Free-form chat — returns plain text
 * Used by: Free Chat feature
 */
export async function chat(messages, systemPrompt) {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({
    model: 'noorix-v1',
    systemInstruction: systemPrompt,
  });

  // Build conversation history (provider expects alternating turns)
  const history = [];
  for (let i = 0; i < messages.length - 1; i++) {
    const m = messages[i];
    history.push({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || '' }],
    });
  }

  const session = model.startChat({ history });
  const lastMsg = messages[messages.length - 1];
  const result = await session.sendMessage(lastMsg.content || '');
  return result.response.text();
}

/**
 * Structured chat — returns parsed JSON
 * Used by: All 14 structured features (skin, meal, sleep, etc.)
 */
export async function chatStructured(messages, systemPrompt) {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({
    model: 'noorix-v1-structured',
    systemInstruction: systemPrompt,
    generationConfig: { responseMimeType: 'application/json' },
  });

  const history = [];
  for (let i = 0; i < messages.length - 1; i++) {
    const m = messages[i];
    history.push({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || '' }],
    });
  }

  const session = model.startChat({ history });
  const lastMsg = messages[messages.length - 1];
  const result = await session.sendMessage(lastMsg.content || '');
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch {
    return {
      message: text,
      actions: [],
      disclaimer: 'This is AI-generated guidance, not a medical diagnosis.',
    };
  }
}
