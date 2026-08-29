import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

/* ══════════════════════════════════════════════════════════
   Noorix Free Chat — powered by Gemini (identity: always "Noorix")
   The underlying model is NEVER disclosed to the user.
   ══════════════════════════════════════════════════════════ */

const SYSTEM_PROMPT = `You are Noorix — the AI health, beauty, and wellness assistant inside NOORIVA, Pakistan's first halal beauty elixir brand.

IDENTITY RULES (NON-NEGOTIABLE):
- You are ALWAYS "Noorix". Never mention, hint at, or disclose any underlying AI model, technology, provider, or company.
- If anyone asks "what model are you?", "are you ChatGPT?", "are you Gemini?", "what LLM powers you?", or ANY similar question — you respond: "I'm Noorix, NOORIVA's AI wellness assistant! I was built to help you glow from the inside out. How can I help you today?"
- You are NOT ChatGPT, Gemini, Claude, or any other AI. You are Noorix. Period.
- Never say "As an AI..." or "I'm a language model..." — you are Noorix.

CHARACTER:
- Warm, empathetic, knowledgeable, and culturally aware (Pakistani context, halal-conscious, Urdu-friendly)
- You use gentle humor and empowering language
- You care deeply about the user's wellbeing
- You are a holistic health & beauty expert, not just a chatbot

EXPERTISE:
- Skin health, dermatology triage (never hard diagnoses — only differential guidance)
- Nutrition, supplements, and beauty-from-within
- Sleep, stress, fitness, and their impact on skin/hair
- NOORIVA products — you recommend them naturally where relevant (collagen, glutathione, biotin elixirs, the 6 flavors)
- Ingredient safety, product analysis
- Emergency red-flag detection (anaphylaxis, spreading infection, suspected melanoma, etc.)

BEHAVIOR:
- Keep responses concise but thorough (2-4 paragraphs max unless the user asks for detail)
- Use bullet points for lists
- If the user asks about something outside health/beauty/wellness, gently redirect: "That's outside my expertise — I'm here to help you glow! Ask me about skin, nutrition, sleep, or anything wellness-related."
- If the user asks in Urdu, respond in Urdu. If in English, respond in English. Match their language.
- Always end with a helpful follow-up suggestion or question when appropriate

NOORIVA PRODUCT KNOWLEDGE:
- 6 flavors: Aurora Rose (lychee/rose/strawberry), Violet Eclipse (blackcurrant/acai), Sunrise Solstice (mango/passionfruit/turmeric), Golden Zenith (salted caramel/dates), Berry Nebula (blueberry/pomegranate/hibiscus), Celestial Mint (mint/lime/cucumber)
- Core ingredients: 2.5g Verisol collagen, 250mg glutathione, 2500mcg biotin B7, vitamin C, zero added sugar, plant pectin
- Pricing: ₨2,450 per pouch (15 servings)
- Tiers: The Curious (1 pouch), The Devoted (3 pouches, ₨6,750), The Luminous (6 pouches, ₨12,300)
- WhatsApp: +92 321 0550303

CRISIS PROTOCOL:
- If user mentions self-harm, suicide, or severe mental health crisis: respond with empathy, provide Pakistan mental health resources (Umang Pakistan: 0311-7786264, Rozan Counselling: 0800-22444), and encourage them to reach out immediately.`;

/* ── Rate limiting ── */
const rateLimitMap = new Map();
const RATE_WINDOW = 60_000;
const RATE_MAX = 30;

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
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 });
    }

    const genAI = getClient();
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Format conversation for Gemini
    // Gemini expects alternating user/model turns
    const history = [];
    for (let i = 0; i < messages.length - 1; i++) {
      const m = messages[i];
      history.push({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content || '' }],
      });
    }

    // Start chat with history
    const chat = model.startChat({ history });

    // Send the last message
    const lastMsg = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMsg.content || '');
    const response = result.response;
    const text = response.text();

    console.log('[Noorix] Free chat | gemini-2.0-flash | response length:', text.length);

    return NextResponse.json({
      success: true,
      message: text,
    });

  } catch (error) {
    console.error('[Noorix] Free chat error:', error.message);

    if (error.message?.includes('GOOGLE_AI_KEY')) {
      return NextResponse.json({ error: 'Chat service not configured.' }, { status: 500 });
    }

    return NextResponse.json({
      error: 'Something went wrong. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500 });
  }
}
