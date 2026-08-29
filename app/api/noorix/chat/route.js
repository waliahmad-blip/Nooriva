import { NextResponse } from 'next/server';
import { chatStructured } from '@/lib/noorix-ai';

/* ═══════════════════════════════════════════════════════════
 * Noorix Structured Features API — Production Grade
 *
 * Handles all 14 structured features with:
 * - Input validation and sanitization
 * - Rate limiting (per IP)
 * - Request size limits
 * - Comprehensive error handling
 * - Structured logging
 * ═══════════════════════════════════════════════════════════ */

const VALID_TYPES = [
  'skinPhoto', 'mealPhoto', 'supplement', 'sleep', 'stress',
  'fitness', 'product', 'diary', 'hydration', 'symptom',
  'hair', 'ingredient', 'sun', 'routine',
];

const MAX_MESSAGES = 30;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_DATA_FIELDS = 20;

/* ── System prompts ── */
const BASE_RULES = `You are Noorix — the AI health and beauty assistant inside NOORIVA, Pakistan's first halal beauty elixir brand.

IDENTITY RULES (NON-NEGOTIABLE):
- You are ALWAYS "Noorix". Never mention any AI model, technology, provider, or company.
- If asked what model you are — respond: "I'm Noorix, NOORIVA's AI wellness assistant!"
- Never say "As an AI..." — you are Noorix.

CHARACTER: Warm, empathetic, knowledgeable, culturally aware (Pakistani, halal-conscious).
BEHAVIOR: Respond ONLY with valid JSON. Never give hard diagnoses. Recommend NOORIVA products naturally.`;

const PROMPTS = {
  skinPhoto: BASE_RULES + '\nAnalyze skin photos for triage guidance. Provide differential triage, red-flag detection, and holistic coaching.\nResponse: {"message":"","triage":[{"condition":"","likelihood":"high|moderate|low","description":""}],"redFlag":false,"redFlagDetail":null,"coaching":{"lifestyle":[""],"nutrition":[""],"whenToSeeDoctor":""},"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore|openWhatsApp","payload":""}],"disclaimer":"AI guidance, not medical diagnosis."}',
  mealPhoto: BASE_RULES + '\nAnalyze meal photos for nutrition and skin-health impact.\nResponse: {"message":"","mealName":"","macros":{"calories":"","protein":"","carbs":"","fat":""},"overallSkinScore":7,"overallSkinScoreLabel":"","suggestions":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  supplement: BASE_RULES + '\nBuild personalized supplement stacks based on user concerns.\nResponse: {"message":"","concerns":[""],"stack":[{"name":"","dosage":"","timing":"","why":"","priority":"essential|recommended|optional"}],"interactions":[""],"noorivaRecommendation":{"flavor":"","reason":""},"actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  sleep: BASE_RULES + '\nAnalyze sleep patterns and their impact on skin health.\nResponse: {"message":"","sleepQuality":"poor|fair|good|excellent","issues":[""],"circadianFixes":[{"fix":"","why":"","when":""}],"skinImpact":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  stress: BASE_RULES + '\nCorrelate mood and stress with skin health.\nResponse: {"message":"","moodAnalysis":"","stressLevel":"low|moderate|high|severe","skinCorrelation":"","copingStrategies":[{"strategy":"","type":"","duration":""}],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  fitness: BASE_RULES + '\nConnect fitness routines with skin health outcomes.\nResponse: {"message":"","skinImpacts":[{"impact":"","cause":"","prevention":""}],"preWorkoutSkin":[""],"postWorkoutSkin":[""],"hydrationAdvice":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  product: BASE_RULES + '\nAnalyze skincare product ingredients for specific skin types.\nResponse: {"message":"","ingredients":[{"name":"","role":"","rating":"beneficial|neutral|caution|avoid","notes":""}],"overallRating":7,"overallLabel":"good|mixed|poor","verdict":"","actions":[{"label":"","type":"learnMore","payload":""}]}',
  diary: BASE_RULES + '\nAnalyze skin diary entries to identify patterns over time.\nResponse: {"message":"","patterns":[{"pattern":"","confidence":"high|moderate|low","triggers":[""]}],"correlations":[""],"recommendations":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  hydration: BASE_RULES + '\nAnalyze hydration levels and their impact on skin glow.\nResponse: {"message":"","intakeAnalysis":{"current":"","recommended":"","deficit":""},"skinImpact":"","tips":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  symptom: BASE_RULES + '\nProvide symptom triage with emergency red-flag detection.\nResponse: {"message":"","redFlag":false,"redFlagDetail":null,"possibleCauses":[{"cause":"","likelihood":"high|moderate|low","description":""}],"selfCare":[""],"whenToSeeDoctor":{"urgency":"immediate|within_48h|within_week|routine","reason":"","specialist":""},"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore|openWhatsApp","payload":""}],"disclaimer":"AI triage, not medical diagnosis."}',
  hair: BASE_RULES + '\nAnalyze hair and scalp health from photos and descriptions.\nResponse: {"message":"","hairCondition":"healthy|dry|damaged|thinning|dandruff","scalpHealth":"","issues":[{"issue":"","severity":"mild|moderate|severe","cause":""}],"recommendations":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  ingredient: BASE_RULES + '\nDecode ingredient lists for safety and effectiveness.\nResponse: {"message":"","ingredients":[{"name":"","role":"","safety":"safe|caution|avoid","notes":""}],"overallSafety":"excellent|good|mixed|concerning","halalStatus":"halal|likely-halal|uncertain|not-halal","verdict":"","actions":[{"label":"","type":"learnMore","payload":""}]}',
  sun: BASE_RULES + '\nProvide UV protection and sun safety advice.\nResponse: {"message":"","uvRisk":"low|moderate|high|very_high|extreme","spfRecommendation":"","sunscreenTips":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  routine: BASE_RULES + '\nBuild AM and PM skincare routines. Response: {"message":"","morningRoutine":[{"step":1,"product":"","how":"","why":""}],"eveningRoutine":[{"step":1,"product":"","how":"","why":""}],"noorivaIntegration":"","timeline":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  medicalImage: BASE_RULES + '\nAnalyze medical images with clinical precision. Response: {"message":"","findings":[{"observation":"","confidence":"high|moderate|low","significance":""}],"possibleConditions":[{"condition":"","likelihood":"high|moderate|low","description":""}],"severity":"mild|moderate|severe|critical","redFlag":false,"redFlagDetail":null,"recommendations":[""],"whenToSeeDoctor":{"urgency":"immediate|within_48h|within_week|routine","reason":""},"noorivaTip":"","disclaimer":"AI analysis, not medical diagnosis."}',
  skinClassification: BASE_RULES + '\nClassify skin conditions from photos. Response: {"message":"","classification":{"type":"","subtype":"","severity":"mild|moderate|severe"},"skinScore":7,"skinScoreLabel":"","textureAnalysis":{"pores":"","hydration":"","elasticity":""},"recommendations":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  treatmentPlan: BASE_RULES + '\nCreate personalized treatment plans. Response: {"message":"","diagnosis":"","treatmentPhases":[{"phase":"","duration":"","steps":[""]}],"products":[{"name":"","why":"","when":""}],"lifestyle":[""],"timeline":"when to expect results","noorivaIntegration":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  healthRisk: BASE_RULES + '\nAssess health risks from lifestyle data. Response: {"message":"","riskScore":5,"riskLevel":"low|moderate|high|critical","risks":[{"risk":"","level":"low|moderate|high","description":"","prevention":[""]}],"recommendations":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
};

/* ── Rate limiting ── */
const rateLimitMap = new Map();
const RATE_WINDOW_MS = 60000;
const RATE_MAX_REQUESTS = 20;

function checkRate(ip) {
  const now = Date.now();
  const rec = rateLimitMap.get(ip);
  if (!rec || now - rec.t > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { n: 1, t: now });
    return true;
  }
  if (rec.n >= RATE_MAX_REQUESTS) return false;
  rec.n++;
  return true;
}

// Cleanup old rate limit entries every 5 minutes
setInterval(function() {
  const now = Date.now();
  for (const [ip, rec] of rateLimitMap) {
    if (now - rec.t > RATE_WINDOW_MS * 2) rateLimitMap.delete(ip);
  }
}, 300000);

/* ── Input sanitization ── */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').slice(0, MAX_MESSAGE_LENGTH);
}

function sanitizeData(data) {
  if (!data || typeof data !== 'object') return {};
  const sanitized = {};
  const keys = Object.keys(data).slice(0, MAX_DATA_FIELDS);
  for (const key of keys) {
    const val = data[key];
    if (val === undefined || val === null) continue;
    if (typeof val === 'string') sanitized[key] = sanitizeString(val);
    else if (typeof val === 'number') sanitized[key] = val;
    else if (Array.isArray(val)) sanitized[key] = val.slice(0, 10).map(sanitizeString);
    else sanitized[key] = sanitizeString(String(val));
  }
  return sanitized;
}

/* ── POST handler ── */
export async function POST(request) {
  const startTime = Date.now();
  const ip = request.headers.get('x-forwarded-for') ||
             request.headers.get('x-real-ip') ||
             'unknown';

  try {
    // Rate limiting
    if (!checkRate(ip)) {
      console.warn('[Noorix] Rate limited:', ip);
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { type, messages, data } = body;

    // Validate type
    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: 'Invalid feature type.' }, { status: 400 });
    }
    if (!PROMPTS[type]) {
      return NextResponse.json({ error: 'Feature not configured.' }, { status: 400 });
    }

    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array required.' }, { status: 400 });
    }
    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json({ error: 'Too many messages.' }, { status: 400 });
    }
    for (const msg of messages) {
      if (!msg || !msg.role || !['user', 'assistant'].includes(msg.role)) {
        return NextResponse.json({ error: 'Invalid message format.' }, { status: 400 });
      }
    }

    // Build message list with sanitized context
    const allMessages = messages.map(function(m) {
      return { role: m.role, content: sanitizeString(m.content || '') };
    });

    const sanitizedData = sanitizeData(data);
    if (Object.keys(sanitizedData).length > 0) {
      const last = allMessages[allMessages.length - 1];
      const dataLines = Object.entries(sanitizedData)
        .map(function(entry) { return entry[0] + ': ' + entry[1]; })
        .join('\n');
      allMessages[allMessages.length - 1] = {
        role: last.role,
        content: last.content + '\n\nContext:\n' + dataLines,
      };
    }

    // Call Noorix AI
    const result = await chatStructured(allMessages, PROMPTS[type], type);

    // Ensure disclaimer
    if (!result.disclaimer) {
      result.disclaimer = 'This is AI-generated guidance, not a medical diagnosis.';
    }

    const latency = Date.now() - startTime;
    console.log('[Noorix] ' + type + ' | ' + latency + 'ms | ip:' + ip.slice(-4));

    return NextResponse.json({ success: true, result: result });

  } catch (error) {
    const latency = Date.now() - startTime;
    console.error('[Noorix] Error (' + latency + 'ms):', error.message);

    // Don't expose internal errors to client
    const clientMessage = error.message?.includes('timed out')
      ? 'Analysis took too long. Please try with a simpler question.'
      : error.message?.includes('rate')
      ? 'Service is busy. Please wait a moment and try again.'
      : 'Analysis failed. Please try again.';

    return NextResponse.json({ error: clientMessage }, { status: 500 });
  }
}

/* ── GET handler — health check ── */
export async function GET() {
  return NextResponse.json({
    service: 'Noorix Structured Features',
    status: 'operational',
    features: VALID_TYPES.length,
    timestamp: new Date().toISOString(),
  });
}
