/**
 * ═══════════════════════════════════════════════════════════════
 * NOORIX AI ENGINE — Vertex AI Production Router
 * ───────────────────────────────────────────────────────────────
 * A resilient, observable, provider-agnostic gateway over seven
 * Gemini / Gemma models hosted on Google Vertex AI.
 *
 * Models
 * ───────────────────────────────────────────────────────────────
 *   gemini-3.7-flash               → Main AI (vision, chat, video)
 *   gemini-3.1-pro-preview         → Deep reasoning (medical, pro)
 *   gemini-3.5-flash-lite          → Fast tasks (hydration, streaks)
 *   gemini-2.5-flash-image         → Image generation (charts, cards)
 *   gemini-3.5-transcribe-preview  → Batch audio transcription
 *   gemini-3.5-transcribe-live     → Streaming transcription (gRPC)
 *   gemma-4-26b-a4b-it-maas        → Ultra-fast tasks (quick actions)
 *
 * Guarantees
 * ───────────────────────────────────────────────────────────────
 *   • Provider identity is NEVER exposed to the frontend.
 *   • Billing is 100% Google Cloud Credits via Vertex AI.
 *   • Every call is validated, timed, retried, circuit-broken,
 *     sanitized, and metered through one code path.
 * ═══════════════════════════════════════════════════════════════
 */

import { GoogleGenAI } from '@google/genai';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

/* ═══════════════════════════════════════════════════════════
   CONFIGURATION
   ═══════════════════════════════════════════════════════════ */

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_TEST = process.env.NODE_ENV === 'test';

const CONFIG = Object.freeze({
  retries: {
    max: Number(process.env.NOORIX_MAX_RETRIES ?? 3),
    baseDelayMs: Number(process.env.NOORIX_RETRY_BASE_MS ?? 1000),
    maxDelayMs: Number(process.env.NOORIX_RETRY_MAX_MS ?? 16000),
    jitterFactor: 0.3,
  },
  timeouts: {
    defaultMs: Number(process.env.NOORIX_TIMEOUT_MS ?? 30000),
    imageGenMs: Number(process.env.NOORIX_IMAGE_TIMEOUT_MS ?? 45000),
    healthCheckMs: Number(process.env.NOORIX_HEALTH_TIMEOUT_MS ?? 30000),
  },
  limits: {
    maxInputLength: Number(process.env.NOORIX_MAX_INPUT_LENGTH ?? 10000),
    maxMessages: Number(process.env.NOORIX_MAX_MESSAGES ?? 50),
    maxSystemPromptLength: Number(process.env.NOORIX_MAX_SYSTEM_PROMPT ?? 20000),
    maxImageSizeBytes: Number(process.env.NOORIX_MAX_IMAGE_BYTES ?? 5 * 1024 * 1024),
    maxAudioSizeBytes: Number(process.env.NOORIX_MAX_AUDIO_BYTES ?? 25 * 1024 * 1024),
  },
  circuitBreaker: {
    failureThreshold: Number(process.env.NOORIX_CB_THRESHOLD ?? 5),
    resetTimeoutMs: Number(process.env.NOORIX_CB_RESET_MS ?? 60000),
    halfOpenProbeCalls: 1,
  },
  cache: {
    enabled: process.env.NOORIX_CACHE_ENABLED !== 'false',
    ttlMs: Number(process.env.NOORIX_CACHE_TTL_MS ?? 5 * 60 * 1000),
  },
});

/* ═══════════════════════════════════════════════════════════
   ERROR TAXONOMY
   ═══════════════════════════════════════════════════════════ */

class NoorixError extends Error {
  /**
   * @param {string} message Human-readable message.
   * @param {object} [options]
   * @param {string} [options.code] Stable machine-readable code.
   * @param {string} [options.model] Model name associated with the error.
   * @param {string} [options.featureType] Feature type associated with the error.
   * @param {Error} [options.cause] Underlying error.
   * @param {object} [options.context] Additional diagnostic context.
   */
  constructor(message, options = {}) {
    super(message, options.cause ? { cause: options.cause } : undefined);
    this.name = this.constructor.name;
    this.code = options.code ?? 'NOORIX_ERROR';
    this.model = options.model ?? null;
    this.featureType = options.featureType ?? null;
    this.context = options.context ?? {};
    Error.captureStackTrace?.(this, this.constructor);
  }
}

class NoorixConfigError extends NoorixError {
  constructor(message, options = {}) {
    super(message, { ...options, code: options.code ?? 'NOORIX_CONFIG_ERROR' });
  }
}

class NoorixValidationError extends NoorixError {
  constructor(message, options = {}) {
    super(message, { ...options, code: options.code ?? 'NOORIX_VALIDATION_ERROR' });
  }
}

class NoorixModelError extends NoorixError {
  constructor(message, options = {}) {
    super(message, { ...options, code: options.code ?? 'NOORIX_MODEL_ERROR' });
  }
}

class NoorixTimeoutError extends NoorixError {
  constructor(message, options = {}) {
    super(message, { ...options, code: options.code ?? 'NOORIX_TIMEOUT_ERROR' });
  }
}

class NoorixCircuitOpenError extends NoorixError {
  constructor(message, options = {}) {
    super(message, { ...options, code: options.code ?? 'NOORIX_CIRCUIT_OPEN' });
  }
}

const RETRYABLE_PATTERNS = [
  /timeout/i,
  /timed ?out/i,
  /\b429\b/,
  /\b500\b/,
  /\b502\b/,
  /\b503\b/,
  /\b504\b/,
  /rate ?limit/i,
  /quota/i,
  /resource ?exhausted/i,
  /econnreset/i,
  /etimedout/i,
  /econnrefused/i,
  /enotfound/i,
  /network/i,
  /aborted/i,
  /deadline ?exceeded/i,
];

/* ═══════════════════════════════════════════════════════════
   STRUCTURED LOGGER
   ═══════════════════════════════════════════════════════════ */

const LOG_LEVELS = Object.freeze({
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 100,
});

const LOG_THRESHOLD = IS_TEST
  ? LOG_LEVELS.silent
  : LOG_LEVELS[process.env.NOORIX_LOG_LEVEL?.toLowerCase() ?? (IS_DEV ? 'debug' : 'info')] ??
    LOG_LEVELS.info;

function createLogger(component) {
  return {
    debug(message, meta) {
      if (LOG_THRESHOLD <= LOG_LEVELS.debug) console.debug(`[noorix:${component}]`, message, meta ?? '');
    },
    info(message, meta) {
      if (LOG_THRESHOLD <= LOG_LEVELS.info) console.info(`[noorix:${component}]`, message, meta ?? '');
    },
    warn(message, meta) {
      if (LOG_THRESHOLD <= LOG_LEVELS.warn) console.warn(`[noorix:${component}]`, message, meta ?? '');
    },
    error(message, meta) {
      if (LOG_THRESHOLD <= LOG_LEVELS.error) console.error(`[noorix:${component}]`, message, meta ?? '');
    },
  };
}

const log = createLogger('engine');

/**
 * Redact credentials and base64-embedded payloads before logging.
 * @param {object} meta
 * @returns {object}
 */
function redact(meta) {
  if (!meta || typeof meta !== 'object') return meta;
  const safe = { ...meta };
  for (const key of Object.keys(safe)) {
    const value = safe[key];
    if (typeof value === 'string') {
      if (/base64/i.test(key) && value.length > 80) {
        safe[key] = `[redacted:${value.length} chars of base64]`;
      } else if (/credential|secret|token|keyfilename/i.test(key)) {
        safe[key] = '[redacted]';
      }
    }
  }
  return safe;
}

/* ═══════════════════════════════════════════════════════════
   MODEL REGISTRY — 7 Models (IDs from environment variables)
   ═══════════════════════════════════════════════════════════ */

const MODEL_DEFINITIONS = Object.freeze({
  main: {
    name: process.env.MODEL_MAIN || 'gemini-3.7-flash',
    role: 'main',
    capabilities: ['text', 'vision', 'multiturn'],
    streaming: false,
  },
  vision: {
    name: process.env.MODEL_VISION || 'gemini-3.7-flash',
    role: 'vision',
    capabilities: ['text', 'vision', 'multiturn'],
    streaming: false,
  },
  fast: {
    name: process.env.MODEL_FAST || 'gemini-3.5-flash-lite',
    role: 'fast',
    capabilities: ['text', 'vision'],
    streaming: false,
  },
  medical: {
    name: process.env.MODEL_MEDICAL || 'gemini-3.1-pro-preview',
    role: 'medical',
    capabilities: ['text', 'structured', 'grounding'],
    streaming: false,
  },
  pro: {
    name: process.env.MODEL_PRO || 'gemini-3.1-pro-preview',
    role: 'pro',
    capabilities: ['text', 'structured', 'grounding'],
    streaming: false,
  },
  imageGen: {
    name: process.env.MODEL_IMAGE_GEN || 'gemini-2.5-flash-image',
    role: 'image-generation',
    capabilities: ['image'],
    streaming: false,
  },
  transcribe: {
    name: process.env.MODEL_TRANSCRIBE || 'gemini-3.5-transcribe-preview',
    role: 'transcription',
    capabilities: ['audio'],
    streaming: false,
  },
  transcribeLive: {
    name: process.env.MODEL_TRANSCRIBE_LIVE || 'gemini-3.5-transcribe-live-preview',
    role: 'transcription',
    capabilities: ['audio', 'streaming'],
    streaming: true,
  },
  ultraFast: {
    name: process.env.MODEL_ULTRA_FAST || 'gemma-4-26b-a4b-it-maas',
    role: 'ultra-fast',
    capabilities: ['text'],
    streaming: false,
  },
});

/** Canonical export: key → model name (preserved for backwards compatibility). */
const MODELS = Object.freeze(
  Object.fromEntries(
    Object.entries(MODEL_DEFINITIONS).map(([key, def]) => [key, def.name])
  )
);

/** Reverse lookup: model name (possibly overridden by env) → model key. */
const MODEL_NAME_TO_KEY = Object.freeze(
  Object.fromEntries(
    Object.entries(MODEL_DEFINITIONS).map(([key, def]) => [def.name, key])
  )
);

/* ═══════════════════════════════════════════════════════════
   FEATURE-TO-MODEL ROUTING REGISTRY
   ═══════════════════════════════════════════════════════════ */

/**
 * @type {Readonly<Record<string, import('./types').NoorixFeatureType>>} no-unused-vars
 */
const FEATURE_MODEL_MAP = Object.freeze({
  // ═══ MERGED FEATURES (6) ═══
  skinIntelligence: 'vision',
  ingredientIntelligence: 'vision',
  glowJournal: 'main',
  treatmentRoutine: 'pro',
  progressStreaks: 'vision',
  wellnessToolkit: 'fast',

  // ═══ KEPT FEATURES (12) ═══
  mealPhoto: 'vision',
  supplement: 'pro',
  sleep: 'fast',
  fitness: 'fast',
  hydration: 'fast',
  symptom: 'medical',
  hair: 'vision',
  sun: 'fast',
  freeChat: 'main',
  voiceOutput: 'transcribe',
  medicalImage: 'medical',
  healthRisk: 'pro',

  // ═══ NEW FEATURES (20) ═══
  glowScore: 'fast',
  glowRitualFinder: 'fast',
  weatherGlow: 'pro',
  culturalAdapt: 'fast',
  beforeAfter: 'vision',
  multilingualVoice: 'transcribe',
  labReport: 'medical',
  voiceConversation: 'transcribe',
  liveIngredientResearch: 'pro',
  multiAngleVideo: 'vision',

  // ═══ BRAND NEW FEATURES (20) ═══
  aiDietChart: 'imageGen',
  workoutVisualizer: 'imageGen',
  drugInteractionChecker: 'pro',
  liveVoiceTranslator: 'transcribe',
  geneticReportReader: 'pro',
  hormoneCycleWellness: 'pro',
  yogaPostureCorrector: 'vision',
  aiRecipeGenerator: 'pro',
  sleepStoryGenerator: 'main',
  hydrationGamification: 'fast',
  aiMakeupMatch: 'vision',
  wellnessReportPdf: 'pro',
  fastingRamadanTracker: 'fast',
  mentalWellnessCompanion: 'main',
  allergyDetective: 'pro',
  moodMusicRecommender: 'fast',
  skincareRoutineCard: 'imageGen',
  recoveryScore: 'fast',
  pregnancyWellness: 'pro',
  refillReminder: 'fast',

  // ═══ ULTRA-FAST FEATURES (2) ═══
  quickActions: 'ultraFast',
  moodJournal: 'ultraFast',
  apiHub: 'main',
});

/* ═══════════════════════════════════════════════════════════
   FALLBACK CHAINS — if primary model fails, try these in order
   ═══════════════════════════════════════════════════════════ */

const FALLBACK_CHAINS = Object.freeze({
  medical: Object.freeze(['vision', 'main']),
  pro: Object.freeze(['main', 'fast']),
  vision: Object.freeze(['main', 'fast']),
  imageGen: Object.freeze(['vision', 'main']),
  transcribe: Object.freeze(['main', 'fast']),
  transcribeLive: Object.freeze(['transcribe', 'main']),
  ultraFast: Object.freeze(['fast', 'main']),
  fast: Object.freeze(['main']),
  main: Object.freeze(['fast']),
});

/* ═══════════════════════════════════════════════════════════
   FEATURES THAT USE GOOGLE SEARCH GROUNDING (real-time data)
   ═══════════════════════════════════════════════════════════ */

const GROUNDED_FEATURES = Object.freeze([
  'weatherGlow',
  'liveIngredientResearch',
  'drugInteractionChecker',
  'allergyDetective',
]);

/* ═══════════════════════════════════════════════════════════
   CIRCUIT BREAKER
   ═══════════════════════════════════════════════════════════ */

class CircuitBreaker {
  /**
   * @param {object} options
   * @param {number} options.failureThreshold Failures before opening.
   * @param {number} options.resetTimeoutMs Time before half-open probe.
   */
  constructor({ failureThreshold, resetTimeoutMs }) {
    this.failureThreshold = failureThreshold;
    this.resetTimeoutMs = resetTimeoutMs;
    /** @type {Map<string, {failures: number, openedAt: number, state: 'closed'|'open'|'half-open'}>} */
    this.states = new Map();
  }

  #state(key) {
    let state = this.states.get(key);
    if (!state) {
      state = { failures: 0, openedAt: 0, state: 'closed' };
      this.states.set(key, state);
    }
    return state;
  }

  /** @returns {boolean} True when the circuit is closed and calls may proceed. */
  allowRequest(key) {
    const state = this.#state(key);

    if (state.state === 'open') {
      const elapsed = Date.now() - state.openedAt;
      if (elapsed >= this.resetTimeoutMs) {
        state.state = 'half-open';
        log.warn(`Circuit half-open for model "${key}"`, { key, elapsedMs: elapsed });
      }
    }

    return state.state !== 'open';
  }

  recordSuccess(key) {
    const state = this.#state(key);
    state.failures = 0;
    state.openedAt = 0;
    state.state = 'closed';
  }

  recordFailure(key, error) {
    const state = this.#state(key);
    state.failures += 1;

    if (state.failures >= this.failureThreshold && state.state !== 'open') {
      state.state = 'open';
      state.openedAt = Date.now();
      log.error(`Circuit opened for model "${key}" after ${state.failures} failures`, {
        key,
        lastError: error?.message,
      });
    } else if (state.state === 'half-open') {
      // A failure in half-open immediately re-opens the circuit.
      state.state = 'open';
      state.openedAt = Date.now();
      log.error(`Circuit re-opened for model "${key}" during half-open probe`, {
        key,
        lastError: error?.message,
      });
    }
  }

  snapshot() {
    return Object.fromEntries(
      [...this.states.entries()].map(([key, value]) => [key, { ...value }])
    );
  }
}

const breaker = new CircuitBreaker({
  failureThreshold: CONFIG.circuitBreaker.failureThreshold,
  resetTimeoutMs: CONFIG.circuitBreaker.resetTimeoutMs,
});

/* ═══════════════════════════════════════════════════════════
   METRICS
   ═══════════════════════════════════════════════════════════ */

const metrics = {
  calls: 0,
  successes: 0,
  failures: 0,
  fallbacks: 0,
  retries: 0,
  cacheHits: 0,
  cacheMisses: 0,
  totalLatencyMs: 0,
  perModel: new Map(),

  recordCall(modelKey, latencyMs, success) {
    this.calls += 1;
    success ? this.successes++ : this.failures++;
    this.totalLatencyMs += latencyMs;

    const entry = this.perModel.get(modelKey) ?? { calls: 0, successes: 0, failures: 0, latencyMs: 0 };
    entry.calls += 1;
    success ? entry.successes++ : entry.failures++;
    entry.latencyMs += latencyMs;
    this.perModel.set(modelKey, entry);
  },

  snapshot() {
    const overall = {
      calls: this.calls,
      successes: this.successes,
      failures: this.failures,
      fallbacks: this.fallbacks,
      retries: this.retries,
      cacheHits: this.cacheHits,
      cacheMisses: this.cacheMisses,
      averageLatencyMs: this.calls > 0 ? Math.round(this.totalLatencyMs / this.calls) : 0,
    };

    const perModel = {};
    for (const [key, entry] of this.perModel.entries()) {
      perModel[key] = {
        ...entry,
        averageLatencyMs: entry.calls > 0 ? Math.round(entry.latencyMs / entry.calls) : 0,
      };
    }

    return { overall, perModel };
  },
};

/* ═══════════════════════════════════════════════════════════
   RESPONSE CACHE (optional, in-memory, TTL-bounded)
   ═══════════════════════════════════════════════════════════ */

class ResponseCache {
  constructor(enabled, ttlMs) {
    this.enabled = enabled;
    this.ttlMs = ttlMs;
    /** @type {Map<string, {value: *, expiresAt: number}>} */
    this.store = new Map();
    this.maxEntries = 200;
  }

  #prune() {
    if (this.store.size <= this.maxEntries) return;
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.expiresAt <= now) this.store.delete(key);
    }
    // If still over capacity, evict oldest insertion order.
    while (this.store.size > this.maxEntries) {
      const oldestKey = this.store.keys().next().value;
      if (oldestKey === undefined) break;
      this.store.delete(oldestKey);
    }
  }

  get(key) {
    if (!this.enabled) return undefined;
    const entry = this.store.get(key);
    if (!entry) {
      metrics.cacheMisses++;
      return undefined;
    }
    if (entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      metrics.cacheMisses++;
      return undefined;
    }
    metrics.cacheHits++;
    return entry.value;
  }

  set(key, value) {
    if (!this.enabled) return;
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
    this.#prune();
  }

  clear() {
    this.store.clear();
  }

  snapshot() {
    return { enabled: this.enabled, size: this.store.size, ttlMs: this.ttlMs };
  }
}

const cache = new ResponseCache(CONFIG.cache.enabled, CONFIG.cache.ttlMs);

/* ═══════════════════════════════════════════════════════════
   CLIENT SINGLETON
   ═══════════════════════════════════════════════════════════ */

/** @type {GoogleGenAI | null} */
let _client = null;
/** @type {Promise<GoogleGenAI> | null} */
let _clientPromise = null;
let _clientInitialized = false;

function validateVertexConfig() {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || 'noorix-498112';
  if (!projectId) {
    throw new NoorixConfigError(
      'GOOGLE_CLOUD_PROJECT_ID is not configured. Vertex AI cannot initialize.'
    );
  }
  return {
    projectId,
    location: process.env.GOOGLE_CLOUD_LOCATION || 'global',
    credentials: process.env.NOORIX_VERTEX_KEY || 'C:\\Nooriva\\noorix-vertex-key.json',
  };
}

function createClient() {
  const { projectId, location, credentials } = validateVertexConfig();

  return new GoogleGenAI({
    vertexai: true,
    project: projectId,
    location,
    ...(credentials ? { googleAuthOptions: { keyFilename: credentials } } : {}),
  });
}

/**
 * Returns the shared Vertex AI client, initializing it lazily exactly once.
 * @returns {GoogleGenAI}
 */
function getClient() {
  if (_client) return _client;
  if (_clientPromise) {
    // Synchronous constructor — the promise acts as a reentrancy guard.
    throw new NoorixConfigError(
      'Noorix client is still initializing; retry the request.'
    );
  }

  try {
    _client = createClient();
    _clientInitialized = true;
    return _client;
  } catch (error) {
    if (error instanceof NoorixConfigError) throw error;
    throw new NoorixConfigError('Failed to initialize Vertex AI client', {
      cause: error,
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

/**
 * Resolve the model key and name for a feature type.
 * @param {string} [featureType]
 * @returns {{key: string, name: string}}
 */
function getModelForFeature(featureType) {
  const key = FEATURE_MODEL_MAP[featureType || 'freeChat'] || 'main';
  return { key, name: MODELS[key] || MODELS.main };
}

/**
 * Map a concrete model name back to its registry key for metrics/logging.
 * @param {string} modelName
 * @returns {string}
 */
function keyForModelName(modelName) {
  return MODEL_NAME_TO_KEY[modelName] ?? modelName;
}

const PROVIDER_DISCLAIMER_PATTERNS = [
  /as an ai language model[^.]*\./gi,
  /i am (?:an? )?(?:google|gemini|medgemma|gemma|vertex|bard|generative)[^.]*\./gi,
  /i'm (?:an? )?(?:google|gemini|medgemma|gemma|vertex|bard|generative)[^.]*\./gi,
  /powered by (?:google|vertex|gemini|gemma|openai|anthropic)[^.]*\./gi,
  /as a (?:google|gemini|medgemma|gemma|vertex|large language)[^.]*\./gi,
  /disclaimer: i am[^.]*\./gi,
];

/**
 * Strip provider self-identification from model output.
 * @param {string} text
 * @returns {string}
 */
function sanitizeResponse(text) {
  if (!text) return '';
  let cleaned = text;
  for (const pattern of PROVIDER_DISCLAIMER_PATTERNS) {
    cleaned = cleaned.replace(pattern, '');
  }

  // Identity guard — never allow provider/model names to reach users.
  const forbiddenIdentityNames = /\b(gemini|google ai|vertex ai|vertex|bard|palm|chatgpt|openai|gpt-?[0-9]?|claude|llama|anthropic|mistral|deepseek|meta ai|generative ai|language model)\b/gi;
  cleaned = cleaned.replace(forbiddenIdentityNames, "Noorix");

  return cleaned.replace(/\s{2,}/g, ' ').trim();
}

/**
 * Recursively sanitize all string values in a JSON structure.
 * @template T
 * @param {T} obj
 * @returns {T}
 */
function sanitizeJsonObject(obj) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const value = obj[i];
      if (typeof value === 'string') {
        obj[i] = sanitizeResponse(value);
      } else if (value && typeof value === 'object') {
        sanitizeJsonObject(value);
      }
    }
    return obj;
  }

  if (obj && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (typeof value === 'string') {
        obj[key] = sanitizeResponse(value);
      } else if (value && typeof value === 'object') {
        sanitizeJsonObject(value);
      }
    }
  }

  return obj;
}

/**
 * Validate a Noorix message array before sending to the model.
 * @param {Array<{role: string, content?: string, image?: string}>} messages
 * @returns {boolean}
 */
function validateMessages(messages) {
  if (!Array.isArray(messages)) {
    throw new NoorixValidationError('Messages must be an array.');
  }
  if (messages.length === 0) {
    throw new NoorixValidationError('Messages array is empty.');
  }
  if (messages.length > CONFIG.limits.maxMessages) {
    throw new NoorixValidationError(
      `Too many messages (max ${CONFIG.limits.maxMessages}).`
    );
  }

  for (const msg of messages) {
    if (!msg || typeof msg !== 'object') {
      throw new NoorixValidationError('Invalid message object in history.');
    }
    if (!msg.role || !['user', 'assistant', 'model'].includes(msg.role)) {
      throw new NoorixValidationError(`Invalid message role: "${msg.role}".`);
    }
    if (
      typeof msg.content === 'string' &&
      msg.content.length > CONFIG.limits.maxInputLength
    ) {
      throw new NoorixValidationError(
        `Message too long (max ${CONFIG.limits.maxInputLength} chars).`
      );
    }
  }

  return true;
}

/**
 * Validate the system prompt.
 * @param {string} prompt
 * @returns {boolean}
 */
function validateSystemPrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    throw new NoorixValidationError('System prompt is required.');
  }
  if (prompt.length > CONFIG.limits.maxSystemPromptLength) {
    throw new NoorixValidationError(
      `System prompt too long (max ${CONFIG.limits.maxSystemPromptLength} chars).`
    );
  }
  return true;
}

/**
 * Detect whether an error is retry-safe.
 * @param {Error} error
 * @returns {boolean}
 */
function isRetryableError(error) {
  const message = error?.message ?? '';
  return RETRYABLE_PATTERNS.some((pattern) => pattern.test(message));
}

/**
 * True exponential backoff with full jitter.
 * delay = random(0, min(maxDelay, base * 2^attempt))
 * @param {number} attempt Zero-based attempt index.
 * @returns {number} Delay in milliseconds.
 */
function retryDelay(attempt) {
  const { baseDelayMs, maxDelayMs, jitterFactor } = CONFIG.retries;
  const exponential = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
  const jitterRange = exponential * jitterFactor;
  const jitter = Math.random() * jitterRange * 2 - jitterRange;
  // Extra buffer — invalid_grant / RAPT blocks need breathing room.
  const safetyDelay = attempt === 0 ? 2000 : 0;
  return Math.max(2000, Math.round(exponential + jitter + safetyDelay));
}

/**
 * Sleep for an arbitrary number of milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Execute a function with retry and exponential backoff.
 * @template T
 * @param {() => Promise<T>} fn
 * @param {number} retries
 * @param {string} modelKey
 * @returns {Promise<T>}
 */
async function withRetry(fn, retries, modelKey) {
  let lastError;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      metrics.retries++;

      if (!isRetryableError(error) || attempt === retries - 1) {
        throw error;
      }

      const delay = retryDelay(attempt);
      log.warn(`Retrying call to "${modelKey}"`, {
        modelKey,
        attempt: attempt + 1,
        retries,
        delayMs: delay,
        error: error.message,
      });
      await sleep(delay);
    }
  }

  throw lastError;
}

/**
 * Wrap a promise with an AbortController-based timeout.
 * @template T
 * @param {Promise<T>} promise
 * @param {number} ms
 * @param {string} modelKey
 * @returns {Promise<T>}
 */
function withTimeout(promise, ms, modelKey) {
  if (!ms || ms <= 0) return promise;

  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
      reject(
        new NoorixTimeoutError(`Request timed out after ${ms}ms`, {
          model: modelKey,
        })
      );
    }, ms);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

/**
 * Convert a Noorix message history into the Vertex history format.
 * The final message is excluded — it is sent as the current turn.
 * @param {Array<{role: string, content?: string}>} messages
 * @returns {Array<{role: string, parts: Array<{text: string}>}>}
 */
function formatHistory(messages) {
  const history = [];
  const historyWindow = messages.slice(0, -1);

  for (const message of historyWindow) {
    if (!message || message.role === undefined) continue;

    const role = message.role === 'assistant' ? 'model' : 'user';
    const text = (message.content || '').slice(0, CONFIG.limits.maxInputLength);

    // Skip empty turns — they can corrupt history on some models.
    if (text.trim() === '') continue;

    history.push({
      role,
      parts: [{ text }],
    });
  }

  return history;
}

/**
 * Build a Vertex generateContent config for a feature.
 * @param {string} systemPrompt
 * @param {string} [featureType]
 * @param {boolean} useJson
 * @returns {object}
 */
function buildConfig(systemPrompt, featureType, useJson) {
  const config = { systemInstruction: systemPrompt };

  if (useJson) {
    config.responseMimeType = 'application/json';
    config.responseSchema = undefined; // Schema kept loose for feature flexibility.
  }

  if (featureType && GROUNDED_FEATURES.includes(featureType)) {
    config.tools = [{ googleSearch: {} }];
  }

  return config;
}

/**
 * Extract text from a Vertex generateContent result across SDK shapes.
 * @param {*} result
 * @returns {string}
 */
function extractText(result) {
  // Newer @google/genai exposes result.text directly.
  if (typeof result?.text === 'string') return result.text;

  // Fallback: traverse candidates/parts for text pieces.
  const candidates = result?.candidates ?? result?.response?.candidates ?? [];
  for (const candidate of candidates) {
    const parts = candidate?.content?.parts ?? [];
    const chunk = parts
      .filter((part) => typeof part?.text === 'string')
      .map((part) => part.text)
      .join('');
    if (chunk.trim()) return chunk;
  }

  return '';
}

/**
 * Build a deterministic cache key from chat inputs.
 * @param {Array<{role: string, content?: string}>} messages
 * @param {string} systemPrompt
 * @param {string} featureType
 * @param {boolean} useJson
 * @returns {string}
 */
function buildCacheKey(messages, systemPrompt, featureType, useJson) {
  const lastMessage = messages[messages.length - 1]?.content ?? '';
  const fingerprint = `${featureType}|${useJson ? 'json' : 'text'}|${systemPrompt.length}|${lastMessage.slice(0, 400)}`;
  // Simple deterministic hash (djb2) to keep keys compact.
  let hash = 5381;
  for (let i = 0; i < fingerprint.length; i++) {
    hash = ((hash << 5) + hash + fingerprint.charCodeAt(i)) | 0;
  }
  return `${featureType}:${hash.toString(36)}`;
}

/* ═══════════════════════════════════════════════════════════
   CORE GENERATE PRIMITIVE
   ═══════════════════════════════════════════════════════════ */

/**
 * Run a single (non-retried) text generation call against a model key,
 * following fallback chains and circuit breaker states.
 * @param {object} params
 * @param {Array<{role: string, content?: string}>} params.messages
 * @param {string} params.systemPrompt
 * @param {string} params.featureType
 * @param {boolean} params.useJson
 * @param {string} params.startModelKey
 * @returns {Promise<string>}
 */
async function generateWithFallback({ messages, systemPrompt, featureType, useJson, startModelKey }) {
  const seen = new Set();

  async function attempt(modelKey) {
    const modelName = MODELS[modelKey] || MODELS.main;
    seen.add(modelKey);

    if (!breaker.allowRequest(modelKey)) {
      metrics.fallbacks++;
      throw new NoorixCircuitOpenError(`Circuit open for model "${modelKey}"`, {
        model: modelName,
        featureType,
      });
    }

    const startedAt = Date.now();
    try {
      const history = formatHistory(messages);
      const lastMessage = messages[messages.length - 1];
      const content = (lastMessage?.content || '').slice(0, CONFIG.limits.maxInputLength);
      const config = buildConfig(systemPrompt, featureType, useJson);

      const client = getClient();
      const result = await withTimeout(
        client.models.generateContent({
          model: modelName,
          contents: [...history, { role: 'user', parts: [{ text: content }] }],
          config,
        }),
        CONFIG.timeouts.defaultMs,
        modelKey
      );

      const text = extractText(result);
      if (!text || text.trim() === '') {
        throw new NoorixModelError('Empty response from model', {
          model: modelName,
          featureType,
        });
      }

      breaker.recordSuccess(modelKey);
      metrics.recordCall(modelKey, Date.now() - startedAt, true);
      return text;
    } catch (error) {
      breaker.recordFailure(modelKey, error);
      metrics.recordCall(modelKey, Date.now() - startedAt, false);

      const chain = FALLBACK_CHAINS[modelKey] || [];
      const fallbackKey = chain.find((key) => !seen.has(key) && MODELS[key]);

      if (fallbackKey) {
        metrics.fallbacks++;
        log.warn(`Falling back from "${modelKey}" to "${fallbackKey}"`, {
          modelKey,
          fallbackKey,
          featureType,
          error: error.message,
        });
        return attempt(fallbackKey);
      }

      if (error instanceof NoorixError) throw error;

      throw new NoorixModelError('Model generation failed', {
        model: modelName,
        featureType,
        cause: error,
      });
    }
  }

  return attempt(startModelKey);
}

/* ═══════════════════════════════════════════════════════════
   PUBLIC API — chat()
   For free-form text responses (freeChat, voice, etc.)
   ═══════════════════════════════════════════════════════════ */

/**
 * Generate a free-form text response.
 * @param {Array<{role: string, content?: string}>} messages
 * @param {string} systemPrompt
 * @param {string} [featureType]
 * @returns {Promise<string>}
 */
export async function chat(messages, systemPrompt, featureType) {
  validateMessages(messages);
  validateSystemPrompt(systemPrompt);

  const modelInfo = getModelForFeature(featureType || 'freeChat');
  const cacheKey = buildCacheKey(messages, systemPrompt, featureType || 'freeChat', false);
  const cached = cache.get(cacheKey);
  if (cached !== undefined) {
    log.debug('chat cache hit', { featureType });
    return cached;
  }

  const text = await withRetry(
    () =>
      generateWithFallback({
        messages,
        systemPrompt,
        featureType: featureType || 'freeChat',
        useJson: false,
        startModelKey: modelInfo.key,
      }),
    CONFIG.retries.max,
    modelInfo.key
  );

  const sanitized = sanitizeResponse(text);
  cache.set(cacheKey, sanitized);
  return sanitized;
}

/* ═══════════════════════════════════════════════════════════
   PUBLIC API — chatStructured()
   For JSON-structured responses (skin, symptom, labReport, etc.)
   ═══════════════════════════════════════════════════════════ */

const STRUCTURED_FALLBACK_PAYLOAD = {
  message: 'Noorix could not produce structured output for this request.',
  actions: [],
  disclaimer: 'This is Noorix guidance, not a medical diagnosis.',
};

/**
 * Generate a JSON-structured response.
 * @param {Array<{role: string, content?: string}>} messages
 * @param {string} systemPrompt
 * @param {string} [featureType]
 * @returns {Promise<object>}
 */
export async function chatStructured(messages, systemPrompt, featureType) {
  validateMessages(messages);
  validateSystemPrompt(systemPrompt);

  const resolvedFeature = featureType || 'skinIntelligence';
  const modelInfo = getModelForFeature(resolvedFeature);

  const text = await withRetry(
    () =>
      generateWithFallback({
        messages,
        systemPrompt,
        featureType: resolvedFeature,
        useJson: true,
        startModelKey: modelInfo.key,
      }),
    CONFIG.retries.max,
    modelInfo.key
  );

  const cleaned = text.trim();

  // Attempt JSON parse (handles fenced and unfenced output).
  const jsonCandidates = [
    cleaned,
    cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, ''),
    extractFirstBraceBlock(cleaned),
  ];

  for (const candidate of jsonCandidates) {
    try {
      const parsed = JSON.parse(candidate);
      if (parsed && typeof parsed === 'object') {
        return sanitizeJsonObject(parsed);
      }
    } catch {
      // Try the next candidate.
    }
  }

  log.warn('structured parse failed, returning fallback payload', {
    featureType: resolvedFeature,
    model: modelInfo.name,
    preview: cleaned.slice(0, 120),
  });

  return { ...STRUCTURED_FALLBACK_PAYLOAD, message: sanitizeResponse(cleaned.slice(0, 2000)) };
}

/**
 * Extract the first `{...}` block from a possibly malformed string.
 * @param {string} text
 * @returns {string}
 */
function extractFirstBraceBlock(text) {
  const start = text.indexOf('{');
  if (start === -1) return text;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const char = text[i];
    if (char === '{') depth++;
    if (char === '}') depth--;
    if (depth === 0) return text.slice(start, i + 1);
  }
  return text.slice(start);
}

/* ═══════════════════════════════════════════════════════════
   PUBLIC API — analyzeMedicalImage()
   For image-based medical analysis.
   ═══════════════════════════════════════════════════════════ */

const IMAGE_MIME_PATTERN = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.*)$/s;

/**
 * Parse and validate a base64 data URL.
 * @param {string} dataUrl
 * @param {number} [maxBytes]
 * @returns {{base64: string, mimeType: string}}
 */
function parseDataUrl(dataUrl, maxBytes) {
  if (typeof dataUrl !== 'string' || dataUrl.length === 0) {
    throw new NoorixValidationError('A base64 data URL is required.');
  }

  const match = dataUrl.match(IMAGE_MIME_PATTERN);
  if (!match) {
    throw new NoorixValidationError('Invalid base64 data URL format.');
  }

  const [, mimeType, base64] = match;
  const byteLength = Math.ceil((base64.length * 3) / 4);
  if (maxBytes && byteLength > maxBytes) {
    throw new NoorixValidationError(
      `Payload too large (${byteLength} bytes, max ${maxBytes}).`
    );
  }

  return { base64, mimeType };
}

/**
 * Analyze a medical image and return a JSON-structured diagnosis.
 * @param {string} imageBase64 Base64 data URL (`data:image/...;base64,...`).
 * @param {string} prompt Text instruction for the model.
 * @returns {Promise<object>}
 */
export async function analyzeMedicalImage(imageBase64, prompt) {
  if (!prompt || typeof prompt !== 'string') {
    throw new NoorixValidationError('A text prompt is required for image analysis.');
  }

  const { base64, mimeType } = parseDataUrl(
    imageBase64,
    CONFIG.limits.maxImageSizeBytes
  );

  const modelKey = 'medical';

  async function generate(modelKeyToUse) {
    const modelName = MODELS[modelKeyToUse] || MODELS.main;
    if (!breaker.allowRequest(modelKeyToUse)) {
      throw new NoorixCircuitOpenError(`Circuit open for model "${modelKeyToUse}"`, {
        model: modelName,
      });
    }

    const startedAt = Date.now();
    try {
      const client = getClient();
      const imagePart = { inlineData: { data: base64, mimeType } };

      const result = await withTimeout(
        client.models.generateContent({
          model: modelName,
          contents: [{ role: 'user', parts: [imagePart, { text: prompt }] }],
          config: { responseMimeType: 'application/json' },
        }),
        CONFIG.timeouts.defaultMs,
        modelKeyToUse
      );

      const text = extractText(result);
      if (!text || text.trim() === '') {
        throw new NoorixModelError('Empty response from medical model', { model: modelName });
      }

      breaker.recordSuccess(modelKeyToUse);
      metrics.recordCall(modelKeyToUse, Date.now() - startedAt, true);

      try {
        const parsed = JSON.parse(text);
        if (!parsed.disclaimer) {
          parsed.disclaimer = 'This is Noorix medical analysis, not a clinical diagnosis.';
        }
        return sanitizeJsonObject(parsed);
      } catch {
        return { message: sanitizeResponse(text) };
      }
    } catch (error) {
      breaker.recordFailure(modelKeyToUse, error);
      metrics.recordCall(modelKeyToUse, Date.now() - startedAt, false);

      const fallbackKey = (FALLBACK_CHAINS[modelKeyToUse] || []).find(
        (key) => key !== modelKeyToUse && MODELS[key]
      );
      if (fallbackKey) {
        metrics.fallbacks++;
        log.warn(`Medical fallback from "${modelKeyToUse}" to "${fallbackKey}"`, {
          modelKey: modelKeyToUse,
          fallbackKey,
          error: error.message,
        });
        return generate(fallbackKey);
      }
      throw error;
    }
  }

  return withRetry(() => generate(modelKey), CONFIG.retries.max, modelKey);
}

/* ═══════════════════════════════════════════════════════════
   PUBLIC API — generateImage()
   Uses gemini-2.5-flash-image for charts, cards, visuals.
   ═══════════════════════════════════════════════════════════ */

/**
 * Generate a single image from a prompt.
 * @param {string} prompt
 * @returns {Promise<string|null>} Base64 data URL, or null on failure.
 */
export async function generateImage(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    throw new NoorixValidationError('An image prompt is required.');
  }
  if (prompt.length > CONFIG.limits.maxInputLength) {
    throw new NoorixValidationError(
      `Prompt too long (max ${CONFIG.limits.maxInputLength} chars).`
    );
  }

  const modelKey = 'imageGen';
  const modelName = MODELS.imageGen || 'gemini-2.5-flash-image';
  const startedAt = Date.now();

  try {
    if (!breaker.allowRequest(modelKey)) {
      log.warn('Image generation circuit open', { modelName });
      return null;
    }

    const client = getClient();
    const result = await withTimeout(
      client.models.generateContent({
        model: modelName,
        contents: prompt,
      }),
      CONFIG.timeouts.imageGenMs,
      modelKey
    );

    const candidates = result?.candidates ?? result?.response?.candidates ?? [];
    const parts = candidates[0]?.content?.parts ?? [];

    for (const part of parts) {
      if (part?.inlineData?.data) {
        breaker.recordSuccess(modelKey);
        metrics.recordCall(modelKey, Date.now() - startedAt, true);
        return `data:${part.inlineData.mimeType ?? 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    breaker.recordSuccess(modelKey);
    metrics.recordCall(modelKey, Date.now() - startedAt, true);
    log.warn('image generation returned no image parts', { modelName });
    return null;
  } catch (error) {
    breaker.recordFailure(modelKey, error);
    metrics.recordCall(modelKey, Date.now() - startedAt, false);
    log.error('Image generation failed', { modelName, error: error.message });
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════
   PUBLIC API — transcribeAudio()
   Batch (non-streaming) transcription.
   ═══════════════════════════════════════════════════════════ */

const AUDIO_MIME_PATTERN = /^data:(audio\/[a-zA-Z0-9.+-]+);base64,(.*)$/s;

/**
 * Transcribe an audio payload to text.
 * @param {string} audioBase64 Base64 data URL (`data:audio/...;base64,...`).
 * @param {string} [mimeType] Optional explicit MIME type override.
 * @param {string} [instruction] Optional transcription instruction.
 * @returns {Promise<string>}
 */
export async function transcribeAudio(audioBase64, mimeType, instruction = 'Transcribe this audio.') {
  let base64 = audioBase64 ?? '';
  let resolvedMimeType = mimeType || 'audio/mp3';

  if (typeof base64 === 'string' && base64.startsWith('data:')) {
    const match = base64.match(AUDIO_MIME_PATTERN);
    if (match) {
      resolvedMimeType = mimeType || match[1];
      base64 = match[2];
    }
  }

  if (!base64) {
    throw new NoorixValidationError('Audio payload is required.');
  }

  const byteLength = Math.ceil((base64.length * 3) / 4);
  if (byteLength > CONFIG.limits.maxAudioSizeBytes) {
    throw new NoorixValidationError(
      `Audio payload too large (${byteLength} bytes, max ${CONFIG.limits.maxAudioSizeBytes}).`
    );
  }

  const modelKey = 'transcribe';
  const modelName = MODELS.transcribe || 'gemini-3.5-transcribe-preview';
  const startedAt = Date.now();

  try {
    if (!breaker.allowRequest(modelKey)) {
      throw new NoorixCircuitOpenError(`Circuit open for model "${modelKey}"`, {
        model: modelName,
      });
    }

    const client = getClient();
    const audioPart = {
      inlineData: { data: base64, mimeType: resolvedMimeType },
    };

    const result = await withTimeout(
      client.models.generateContent({
        model: modelName,
        contents: [{ role: 'user', parts: [audioPart, { text: instruction }] }],
      }),
      CONFIG.timeouts.defaultMs,
      modelKey
    );

    const text = extractText(result);
    breaker.recordSuccess(modelKey);
    metrics.recordCall(modelKey, Date.now() - startedAt, true);
    return sanitizeResponse(text);
  } catch (error) {
    breaker.recordFailure(modelKey, error);
    metrics.recordCall(modelKey, Date.now() - startedAt, false);

    const fallbackKey = (FALLBACK_CHAINS[modelKey] || []).find(
      (key) => key !== modelKey && MODELS[key]
    );
    if (fallbackKey) {
      metrics.fallbacks++;
      log.warn(`Transcription fallback from "${modelKey}" to "${fallbackKey}"`, {
        error: error.message,
      });
      try {
        // Fallback is a text model; use a stub audio instruction.
        const client = getClient();
        const result = await client.models.generateContent({
          model: MODELS[fallbackKey],
          contents: [{ role: 'user', parts: [{ text: `[Audio unavailable for this fallback model. Please ask the user to repeat themselves.]` }] }],
        });
        return sanitizeResponse(extractText(result));
      } catch (fallbackError) {
        log.error('Transcription fallback failed', { error: fallbackError.message });
      }
    }

    log.error('Transcription failed', { modelName, error: error.message });
    return '';
  }
}

/* ═══════════════════════════════════════════════════════════
   PUBLIC API — healthCheck()
   ═══════════════════════════════════════════════════════════ */

/**
 * Probe every non-streaming model once and report operational status.
 * @returns {Promise<object>}
 */
export async function healthCheck() {
  const startedAt = Date.now();
  const results = {};

  const uniqueModels = new Map();
  for (const [key, def] of Object.entries(MODEL_DEFINITIONS)) {
    if (def.streaming) continue; // Streaming models are not probeable via generateContent.
    if (!uniqueModels.has(def.name)) uniqueModels.set(def.name, key);
  }

  await Promise.all(
    [...uniqueModels.entries()].map(async ([modelName, key]) => {
      try {
        const client = getClient();
        await withTimeout(
          client.models.generateContent({ model: modelName, contents: 'ping' }),
          CONFIG.timeouts.healthCheckMs,
          key
        );
        results[key] = { status: 'operational', model: modelName };
      } catch (error) {
        results[key] = {
          status: 'degraded',
          model: modelName,
          error: error.message,
        };
      }
    })
  );

  // Mark streaming transcription as streaming-only.
  results.transcribeLive = {
    status: 'streaming-only',
    model: MODEL_DEFINITIONS.transcribeLive.name,
    note: 'Uses the streaming BidiGenerateContent API; not probeable via generateContent.',
  };

  const statuses = Object.values(results).map((entry) => entry.status);
  const allOperational = statuses.every(
    (status) => status === 'operational' || status === 'streaming-only'
  );

  return {
    status: allOperational ? 'operational' : 'degraded',
    latencyMs: Date.now() - startedAt,
    models: results,
    circuitBreakers: breaker.snapshot(),
    cache: cache.snapshot(),
    metrics: metrics.snapshot(),
    timestamp: new Date().toISOString(),
    provider: 'Vertex AI (@google/genai)',
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID ?? null,
    location: process.env.GOOGLE_CLOUD_LOCATION ?? 'global',
  };
}

/* ═══════════════════════════════════════════════════════════
   INTERNAL UTILITIES FOR TESTS / OPERATIONS
   ═══════════════════════════════════════════════════════════ */

/**
 * Reset all internal state (client, cache, circuit breakers, metrics).
 * Intended for tests and hot-reload scenarios.
 */
export function resetEngineState() {
  _client = null;
  _clientPromise = null;
  _clientInitialized = false;
  cache.clear();
  breaker.states.clear();
  metrics.calls = 0;
  metrics.successes = 0;
  metrics.failures = 0;
  metrics.fallbacks = 0;
  metrics.retries = 0;
  metrics.cacheHits = 0;
  metrics.cacheMisses = 0;
  metrics.totalLatencyMs = 0;
  metrics.perModel.clear();
}

/**
 * @returns {object} Current operational snapshot without probing models.
 */
export function getEngineSnapshot() {
  return {
    initialized: _clientInitialized,
    config: CONFIG,
    circuitBreakers: breaker.snapshot(),
    cache: cache.snapshot(),
    metrics: metrics.snapshot(),
  };
}

/* ═══════════════════════════════════════════════════════════
   EXPORTS
   ═══════════════════════════════════════════════════════════ */

export {
  // Canonical registry exports (backwards compatible).
  MODELS,
  FEATURE_MODEL_MAP,
  GROUNDED_FEATURES,
  FALLBACK_CHAINS,
  // Error taxonomy for consumers.
  NoorixError,
  NoorixConfigError,
  NoorixValidationError,
  NoorixModelError,
  NoorixTimeoutError,
  NoorixCircuitOpenError,
};
