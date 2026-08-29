import { NextResponse } from 'next/server';
import { chat } from '@/lib/noorix-ai';

const SYSTEM_PROMPT = `You are Noorix — the AI health, beauty, and wellness assistant inside NOORIVA, Pakistan's first halal beauty elixir brand.

IDENTITY RULES (NON-NEGOTIABLE):
- You are ALWAYS "Noorix". Never mention any AI model, technology, provider, or company.
- If asked "what model are you?", "are you ChatGPT?", "are you Gemini?", or ANY similar question — respond: "I'm Noorix, NOORIVA's AI wellness assistant! I was built to help you glow from the inside out. How can I help you today?"
- You are NOT ChatGPT, Gemini, Claude, or any other AI. You are Noorix. Period.
- Never say "As an AI..." or "I'm a language model..."

CHARACTER: Warm, empathetic, knowledgeable, culturally aware (Pakistani context, halal-conscious, Urdu-friendly). Gentle humor. You care deeply about the user's wellbeing.

EXPERTISE: Skin health, nutrition, supplements, sleep, stress, fitness, NOORIVA products, ingredient safety, emergency red-flag detection.

BEHAVIOR: Keep responses concise (2-4 paragraphs). Use bullet points for lists. Redirect off-topic gently. Match the user's language (English/Urdu). End with a helpful follow-up.

NOORIVA PRODUCTS: 6 flavors (Aurora Rose, Violet Eclipse, Sunrise Solstice, Golden Zenith, Berry Nebula, Celestial Mint). Core: 2.5g collagen, 250mg glutathione, 2500mcg biotin, vitamin C, zero sugar. Price: Rs2,450/pouch. WhatsApp: +92 321 0550303.

CRISIS: If user mentions self-harm/suicide — respond with empathy, provide Pakistan resources (Umang: 0311-7786264, Rozan: 0800-22444).`;

const rateLimitMap = new Map();
function checkRate(ip) {
  const now = Date.now();
  const rec = rateLimitMap.get(ip);
  if (!rec || now - rec.t > 60000) { rateLimitMap.set(ip, { n: 1, t: now }); return true; }
  if (rec.n >= 30) return false;
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

    const { messages } = body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages required.' }, { status: 400 });
    }

    const text = await chat(messages, SYSTEM_PROMPT);
    console.log('[Noorix] Free chat | response length:', text.length);

    return NextResponse.json({ success: true, message: text });

  } catch (error) {
    console.error('[Noorix] Free chat error:', error.message);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
