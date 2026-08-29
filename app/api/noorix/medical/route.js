import { NextResponse } from 'next/server';
import { analyzeMedicalImage } from '@/lib/noorix-ai';

const MEDICAL_PROMPT = `You are Noorix — a medical image analysis AI. Analyze this medical/skin image and provide:

IDENTITY: You are ALWAYS "Noorix". Never mention any AI model or provider.

Response JSON:
{
  "message": "Your analysis in plain language",
  "findings": [
    { "observation": "what you see", "confidence": "high|moderate|low", "significance": "what it means" }
  ],
  "possibleConditions": [
    { "condition": "name", "likelihood": "high|moderate|low", "description": "explanation" }
  ],
  "severity": "mild|moderate|severe|critical",
  "redFlag": false,
  "redFlagDetail": null,
  "recommendations": ["actionable recommendation"],
  "whenToSeeDoctor": { "urgency": "immediate|within_48h|within_week|routine", "reason": "why" },
  "noorivaTip": "how NOORIVA can help",
  "disclaimer": "This is AI-generated analysis, not a medical diagnosis. Always consult a healthcare provider."
}

RULES:
- Be thorough but accessible
- Flag emergencies immediately
- Never claim certainty — use "possible", "suggests", "consistent with"
- Recommend NOORIVA products where relevant`;

const rateLimitMap = new Map();
function checkRate(ip) {
  const now = Date.now();
  const rec = rateLimitMap.get(ip);
  if (!rec || now - rec.t > 60000) { rateLimitMap.set(ip, { n: 1, t: now }); return true; }
  if (rec.n >= 10) return false;
  rec.n++;
  return true;
}

export async function POST(request) {
  const startTime = Date.now();
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  try {
    if (!checkRate(ip)) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

    let body;
    try { body = await request.json(); }
    catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

    const { image, context } = body;
    if (!image) return NextResponse.json({ error: 'Image required.' }, { status: 400 });

    const prompt = context ? MEDICAL_PROMPT + '\n\nUser context: ' + context : MEDICAL_PROMPT;
    const result = await analyzeMedicalImage(image, prompt);

    if (!result.disclaimer) result.disclaimer = 'This is AI-generated analysis, not a medical diagnosis.';

    const latency = Date.now() - startTime;
    console.log('[Noorix] Medical image | ' + latency + 'ms');

    return NextResponse.json({ success: true, result });

  } catch (error) {
    console.error('[Noorix] Medical error:', error.message);
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 });
  }
}
