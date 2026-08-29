import { NextResponse } from 'next/server';
import { chatStructured } from '@/lib/noorix-ai';

const BASE_RULES = `You are Noorix — the AI health and beauty assistant inside NOORIVA, Pakistan's first halal beauty elixir brand.

IDENTITY RULES (NON-NEGOTIABLE):
- You are ALWAYS "Noorix". Never mention any AI model, technology, provider, or company.
- If asked what model you are — respond: "I'm Noorix, NOORIVA's AI wellness assistant!"
- Never say "As an AI..." — you are Noorix.

CHARACTER: Warm, empathetic, knowledgeable, culturally aware (Pakistani, halal-conscious).
BEHAVIOR: Respond ONLY with valid JSON. Never give hard diagnoses. Recommend NOORIVA products naturally.`;

const PROMPTS = {
  skinPhoto: BASE_RULES + '\nAnalyze skin photos for triage. Response: {"message":"","triage":[{"condition":"","likelihood":"high|moderate|low","description":""}],"redFlag":false,"redFlagDetail":null,"coaching":{"lifestyle":[""],"nutrition":[""],"whenToSeeDoctor":""},"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore|openWhatsApp","payload":""}],"disclaimer":"AI guidance, not medical diagnosis."}',
  mealPhoto: BASE_RULES + '\nAnalyze meal photos for nutrition and skin impact. Response: {"message":"","mealName":"","macros":{"calories":"","protein":"","carbs":"","fat":""},"overallSkinScore":7,"overallSkinScoreLabel":"","suggestions":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  supplement: BASE_RULES + '\nBuild personalized supplement stacks. Response: {"message":"","concerns":[""],"stack":[{"name":"","dosage":"","timing":"","why":"","priority":"essential|recommended|optional"}],"interactions":[""],"noorivaRecommendation":{"flavor":"","reason":""},"actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  sleep: BASE_RULES + '\nAnalyze sleep and skin impact. Response: {"message":"","sleepQuality":"poor|fair|good|excellent","issues":[""],"circadianFixes":[{"fix":"","why":"","when":""}],"skinImpact":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  stress: BASE_RULES + '\nCorrelate mood/stress with skin. Response: {"message":"","moodAnalysis":"","stressLevel":"low|moderate|high|severe","skinCorrelation":"","copingStrategies":[{"strategy":"","type":"","duration":""}],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  fitness: BASE_RULES + '\nConnect fitness with skin health. Response: {"message":"","skinImpacts":[{"impact":"","cause":"","prevention":""}],"preWorkoutSkin":[""],"postWorkoutSkin":[""],"hydrationAdvice":"","noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  product: BASE_RULES + '\nAnalyze product ingredients. Response: {"message":"","ingredients":[{"name":"","role":"","rating":"beneficial|neutral|caution|avoid","notes":""}],"overallRating":7,"overallLabel":"good|mixed|poor","verdict":"","actions":[{"label":"","type":"learnMore","payload":""}]}',
  diary: BASE_RULES + '\nAnalyze skin diary patterns. Response: {"message":"","patterns":[{"pattern":"","confidence":"high|moderate|low","triggers":[""]}],"correlations":[""],"recommendations":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  hydration: BASE_RULES + '\nAnalyze hydration and skin glow. Response: {"message":"","intakeAnalysis":{"current":"","recommended":"","deficit":""},"skinImpact":"","tips":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  symptom: BASE_RULES + '\nSymptom triage with red-flag detection. Response: {"message":"","redFlag":false,"redFlagDetail":null,"possibleCauses":[{"cause":"","likelihood":"high|moderate|low","description":""}],"selfCare":[""],"whenToSeeDoctor":{"urgency":"immediate|within_48h|within_week|routine","reason":"","specialist":""},"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore|openWhatsApp","payload":""}],"disclaimer":"AI triage, not medical diagnosis."}',
  hair: BASE_RULES + '\nAnalyze hair and scalp health. Response: {"message":"","hairCondition":"healthy|dry|damaged|thinning|dandruff","scalpHealth":"","issues":[{"issue":"","severity":"mild|moderate|severe","cause":""}],"recommendations":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  ingredient: BASE_RULES + '\nDecode ingredient lists. Response: {"message":"","ingredients":[{"name":"","role":"","safety":"safe|caution|avoid","notes":""}],"overallSafety":"excellent|good|mixed|concerning","halalStatus":"halal|likely-halal|uncertain|not-halal","verdict":"","actions":[{"label":"","type":"learnMore","payload":""}]}',
  sun: BASE_RULES + '\nUV protection advice. Response: {"message":"","uvRisk":"low|moderate|high|very_high|extreme","spfRecommendation":"","sunscreenTips":[""],"noorivaTip":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}',
  routine: BASE_RULES + '\nBuild AM/PM skincare routines. Response: {"message":"","morningRoutine":[{"step":1,"product":"","how":"","why":""}],"eveningRoutine":[{"step":1,"product":"","how":"","why":""}],"noorivaIntegration":"","timeline":"","actions":[{"label":"","type":"addProduct|learnMore","payload":""}]}'
};

const rateLimitMap = new Map();
function checkRate(ip) {
  const now = Date.now();
  const rec = rateLimitMap.get(ip);
  if (!rec || now - rec.t > 60000) { rateLimitMap.set(ip, { n: 1, t: now }); return true; }
  if (rec.n >= 20) return false;
  rec.n++;
  return true;
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRate(ip)) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

    let body;
    try { body = await request.json(); }
    catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

    const { type, messages, data } = body;

    if (!type || !PROMPTS[type]) return NextResponse.json({ error: 'Invalid feature type.' }, { status: 400 });
    if (!Array.isArray(messages) || messages.length === 0) return NextResponse.json({ error: 'Messages required.' }, { status: 400 });

    // Append context data to last message
    const allMessages = [...messages];
    if (data && Object.keys(data).length > 0) {
      const last = allMessages[allMessages.length - 1];
      const dataLines = Object.entries(data)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => k + ': ' + v)
        .join('\n');
      if (dataLines) {
        allMessages[allMessages.length - 1] = {
          ...last,
          content: (last.content || '') + '\n\nContext:\n' + dataLines,
        };
      }
    }

    const result = await chatStructured(allMessages, PROMPTS[type]);

    if (!result.disclaimer) result.disclaimer = 'This is AI-generated guidance, not a medical diagnosis.';
    console.log('[Noorix] ' + type + ' | structured');

    return NextResponse.json({ success: true, result });

  } catch (error) {
    console.error('[Noorix] Error:', error.message);
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 });
  }
}
