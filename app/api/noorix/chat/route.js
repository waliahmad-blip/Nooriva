import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

/* ══════════════════════════════════════════════════════════
   Noorix Structured Features — powered by Gemini
   All 14 structured features route through here.
   Identity: always "Noorix" — model never disclosed.
   ══════════════════════════════════════════════════════════ */

const BASE_RULES = `You are Noorix — the AI health and beauty assistant inside NOORIVA, Pakistan's first halal beauty elixir brand.

IDENTITY RULES (NON-NEGOTIABLE):
- You are ALWAYS "Noorix". Never mention, hint at, or disclose any underlying AI model, technology, provider, or company.
- If asked "what model are you?" or similar — respond: "I'm Noorix, NOORIVA's AI wellness assistant!"
- Never say "As an AI..." or "I'm a language model..." — you are Noorix.

CHARACTER:
- Warm, empathetic, knowledgeable, culturally aware (Pakistani context, halal-conscious)
- You use gentle humor and empowering language
- You are a holistic health and beauty expert

BEHAVIOR:
- Respond ONLY with valid JSON. No markdown, no prose outside JSON.
- You NEVER give hard diagnoses — only differential triage and guidance.
- Recommend NOORIVA products where relevant naturally.
- If user asks off-topic, guide them back to health/beauty/wellness.`;

const PROMPTS = {
  skinPhoto: BASE_RULES + `
Analyze skin photos for triage guidance.
Response JSON schema:
{
  "message": "your conversational response",
  "triage": [{ "condition": "name", "likelihood": "high|moderate|low", "description": "explanation" }],
  "redFlag": false,
  "redFlagDetail": null,
  "coaching": { "lifestyle": ["tip"], "nutrition": ["tip"], "whenToSeeDoctor": "advice" },
  "noorivaTip": "how NOORIVA helps",
  "actions": [{ "label": "button text", "type": "addProduct|learnMore|openWhatsApp", "payload": "product-id or null" }],
  "disclaimer": "This is AI-generated guidance, not a medical diagnosis."
}`,

  mealPhoto: BASE_RULES + `
Analyze meal photos for nutrition and skin-health impact.
Response JSON schema:
{
  "message": "your analysis",
  "mealName": "identified meal",
  "macros": { "calories": "est", "protein": "est", "carbs": "est", "fat": "est" },
  "overallSkinScore": 7,
  "overallSkinScoreLabel": "Good for skin",
  "suggestions": ["improvement tip"],
  "noorivaTip": "complementary NOORIVA advice",
  "actions": [{ "label": "text", "type": "addProduct|learnMore", "payload": "id|null" }]
}`,

  supplement: BASE_RULES + `
Build personalized supplement stacks based on user concerns.
Response JSON schema:
{
  "message": "your advice",
  "concerns": ["identified concern"],
  "stack": [{ "name": "supplement", "dosage": "amount", "timing": "when", "why": "reason", "priority": "essential|recommended|optional" }],
  "interactions": ["warning"],
  "noorivaRecommendation": { "flavor": "name", "reason": "why" },
  "actions": [{ "label": "text", "type": "addProduct|learnMore", "payload": "id|null" }]
}`,

  sleep: BASE_RULES + `
Analyze sleep patterns and their impact on skin.
Response JSON schema:
{
  "message": "your analysis",
  "sleepQuality": "poor|fair|good|excellent",
  "issues": ["issue"],
  "circadianFixes": [{ "fix": "tip", "why": "reason", "when": "timing" }],
  "skinImpact": "how sleep affects skin",
  "noorivaTip": "bedtime NOORIVA ritual",
  "actions": [{ "label": "text", "type": "addProduct|learnMore", "payload": "id|null" }]
}`,

  stress: BASE_RULES + `
Correlate mood and stress with skin health.
Response JSON schema:
{
  "message": "empathetic response",
  "moodAnalysis": "what you understand",
  "stressLevel": "low|moderate|high|severe",
  "skinCorrelation": "how stress manifests on skin",
  "copingStrategies": [{ "strategy": "tip", "type": "breathing|movement|mindfulness", "duration": "time" }],
  "noorivaTip": "calming ritual",
  "actions": [{ "label": "text", "type": "addProduct|learnMore", "payload": "id|null" }]
}`,

  fitness: BASE_RULES + `
Connect fitness routines with skin health outcomes.
Response JSON schema:
{
  "message": "your response",
  "skinImpacts": [{ "impact": "issue", "cause": "why", "prevention": "tip" }],
  "preWorkoutSkin": ["tip"],
  "postWorkoutSkin": ["tip"],
  "hydrationAdvice": "water guidance",
  "noorivaTip": "workout NOORIVA ritual",
  "actions": [{ "label": "text", "type": "addProduct|learnMore", "payload": "id|null" }]
}`,

  product: BASE_RULES + `
Analyze skincare product ingredients for specific skin types.
Response JSON schema:
{
  "message": "your analysis",
  "ingredients": [{ "name": "ingredient", "role": "purpose", "rating": "beneficial|neutral|caution|avoid", "notes": "detail" }],
  "overallRating": 7,
  "overallLabel": "good|mixed|poor",
  "verdict": "recommendation",
  "actions": [{ "label": "text", "type": "learnMore", "payload": "null" }]
}`,

  diary: BASE_RULES + `
Analyze skin diary entries to identify patterns over time.
Response JSON schema:
{
  "message": "your analysis",
  "patterns": [{ "pattern": "observation", "confidence": "high|moderate|low", "triggers": ["trigger"] }],
  "correlations": ["lifestyle-skin link"],
  "recommendations": ["next step"],
  "noorivaTip": "consistency advice",
  "actions": [{ "label": "text", "type": "addProduct|learnMore", "payload": "id|null" }]
}`,

  hydration: BASE_RULES + `
Analyze hydration levels and their impact on skin glow.
Response JSON schema:
{
  "message": "coaching response",
  "intakeAnalysis": { "current": "amount", "recommended": "amount", "deficit": "amount" },
  "skinImpact": "how hydration affects glow",
  "tips": ["practical tip"],
  "noorivaTip": "hydration ritual",
  "actions": [{ "label": "text", "type": "addProduct|learnMore", "payload": "id|null" }]
}`,

  symptom: BASE_RULES + `
Provide symptom triage with emergency red-flag detection.
Response JSON schema:
{
  "message": "triage response",
  "redFlag": false,
  "redFlagDetail": null,
  "possibleCauses": [{ "cause": "name", "likelihood": "high|moderate|low", "description": "detail" }],
  "selfCare": ["tip"],
  "whenToSeeDoctor": { "urgency": "immediate|within_48h|within_week|routine", "reason": "why", "specialist": "type" },
  "noorivaTip": "supportive advice",
  "actions": [{ "label": "text", "type": "addProduct|learnMore|openWhatsApp", "payload": "id|null" }],
  "disclaimer": "This is AI-generated triage, not a medical diagnosis."
}`,

  hair: BASE_RULES + `
Analyze hair and scalp health from photos and descriptions.
Response JSON schema:
{
  "message": "your analysis",
  "hairCondition": "healthy|dry|damaged|thinning|dandruff",
  "scalpHealth": "assessment",
  "issues": [{ "issue": "name", "severity": "mild|moderate|severe", "cause": "reason" }],
  "recommendations": ["hair care tip"],
  "noorivaTip": "how NOORIVA biotin/collagen helps",
  "actions": [{ "label": "text", "type": "addProduct|learnMore", "payload": "id|null" }]
}`,

  ingredient: BASE_RULES + `
Decode ingredient lists for safety and effectiveness.
Response JSON schema:
{
  "message": "your analysis",
  "ingredients": [{ "name": "ingredient", "role": "purpose", "safety": "safe|caution|avoid", "notes": "detail" }],
  "overallSafety": "excellent|good|mixed|concerning",
  "halalStatus": "halal|likely-halal|uncertain|not-halal",
  "verdict": "recommendation",
  "actions": [{ "label": "text", "type": "learnMore", "payload": "null" }]
}`,

  sun: BASE_RULES + `
Provide UV protection and sun safety advice.
Response JSON schema:
{
  "message": "sun protection advice",
  "uvRisk": "low|moderate|high|very_high|extreme",
  "spfRecommendation": "SPF level",
  "sunscreenTips": ["application tip"],
  "noorivaTip": "how NOORIVA protects from within",
  "actions": [{ "label": "text", "type": "addProduct|learnMore", "payload": "id|null" }]
}`,

  routine: BASE_RULES + `
Build personalized AM/PM skincare routines.
Response JSON schema:
{
  "message": "routine overview",
  "morningRoutine": [{ "step": 1, "product": "type", "how": "instruction", "why": "reason" }],
  "eveningRoutine": [{ "step": 1, "product": "type", "how": "instruction", "why": "reason" }],
  "noorivaIntegration": "how NOORIVA fits in",
  "timeline": "when to expect results",
  "actions": [{ "label": "text", "type": "addProduct|learnMore", "payload": "id|null" }]
}`
};

/* ── Rate limiting ── */
const rateLimitMap = new Map();
const RATE_WINDOW = 60000;
const RATE_MAX = 20;

function checkRate(ip) {
  const now = Date.now();
  const rec = rateLimitMap.get(ip);
  if (!rec || now - rec.t > RATE_WINDOW) {
    rateLimitMap.set(ip, { n: 1, t: now });
    return true;
  }
  if (rec.n >= RATE_MAX) return false;
  rec.n++;
  return true;
}

/* ── Gemini client ── */
function getClient() {
  const key = process.env.GOOGLE_AI_KEY;
  if (!key) throw new Error('GOOGLE_AI_KEY not configured');
  return new GoogleGenerativeAI(key);
}

/* ── POST handler ── */
export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRate(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please wait.' }, { status: 429 });
    }

    let body;
    try { body = await request.json(); }
    catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }); }

    const { type, messages, data } = body;

    if (!type || !PROMPTS[type]) {
      return NextResponse.json({ error: 'Invalid feature type.' }, { status: 400 });
    }
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array required.' }, { status: 400 });
    }

    const genAI = getClient();
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: PROMPTS[type],
      generationConfig: { responseMimeType: 'application/json' },
    });

    // Build conversation history for Gemini
    const history = [];
    for (let i = 0; i < messages.length - 1; i++) {
      const m = messages[i];
      history.push({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content || '' }],
      });
    }

    const chat = model.startChat({ history });

    // Build the last message with context data
    let lastContent = messages[messages.length - 1].content || '';
    if (data && Object.keys(data).length > 0) {
      const dataLines = Object.entries(data)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => k + ': ' + (typeof v === 'object' ? JSON.stringify(v) : v))
        .join('\n');
      if (dataLines) lastContent += '\n\nAdditional context:\n' + dataLines;
    }

    const result = await chat.sendMessage(lastContent);
    const text = result.response.text();

    let parsed;
    try { parsed = JSON.parse(text); }
    catch {
      parsed = { message: text, actions: [], disclaimer: 'This is AI-generated guidance, not a medical diagnosis.' };
    }
    if (!parsed.disclaimer) parsed.disclaimer = 'This is AI-generated guidance, not a medical diagnosis.';

    console.log('[Noorix] ' + type + ' | gemini-2.0-flash');
    return NextResponse.json({ success: true, result: parsed });

  } catch (error) {
    console.error('[Noorix] Error:', error.message);
    if (error.message?.includes('GOOGLE_AI_KEY')) {
      return NextResponse.json({ error: 'Service not configured.' }, { status: 500 });
    }
    return NextResponse.json({
      error: 'Analysis failed. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500 });
  }
}
