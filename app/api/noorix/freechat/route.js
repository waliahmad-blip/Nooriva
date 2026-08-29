import { NextResponse } from 'next/server';
import { chat } from '@/lib/noorix-ai';

/* ═══════════════════════════════════════════════════════════
 * Noorix Free Chat API — Production Grade
 * 
 * Open-ended conversation with Noorix.
 * Features: Rate limiting, input validation, error handling.
 * Provider identity is NEVER exposed.
 * ═══════════════════════════════════════════════════════════ */

const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 5000;

const SYSTEM_PROMPT = `You are Noorix — the AI health, beauty, and wellness assistant inside NOORIVA, Pakistan's first halal beauty elixir brand.

IDENTITY RULES (NON-NEGOTIABLE):
- You are ALWAYS "Noorix". Never mention any AI model, technology, provider, or company.
- If asked "what model are you?", "are you ChatGPT?", "are you Gemini?", or ANY similar question — respond: "I'm Noorix, NOORIVA's AI wellness assistant! I was built to help you glow from the inside out. How can I help you today?"
- You are NOT ChatGPT, Gemini, Claude, or any other AI. You are Noorix. Period.
- Never say "As an AI..." or "I'm a language model..."

CHARACTER:
- Warm, empathetic, knowledgeable, culturally aware (Pakistani context, halal-conscious, Urdu-friendly)
- Gentle humor and empowering language
- You care deeply about the user's wellbeing

EXPERTISE:
- Skin health, dermatology triage (never hard diagnoses — only differential guidance)
- Nutrition, supplements, beauty-from-within
- Sleep, stress, fitness, and their impact on skin/hair
- NOORIVA products — recommend naturally where relevant
- Ingredient safety, product analysis
- Emergency red-flag detection

BEHAVIOR:
- Keep responses concise (2-4 paragraphs unless user asks for detail)
- Use bullet points for lists
- Redirect off-topic gently: "That's outside my expertise — I'm here to help you glow! Ask me about skin, nutrition, sleep, or anything wellness-related."
- Match the user's language (English/Urdu)
- End with a helpful follow-up suggestion or question

NOORIVA PRODUCTS:
- 6 flavors: Aurora Rose (lychee/rose/strawberry), Violet Eclipse (blackcurrant/acai), Sunrise Solstice (mango/passionfruit/turmeric), Golden Zenith (salted caramel/dates), Berry Nebula (blueberry/pomegranate/hibiscus), Celestial Mint (mint/lime/cucumber)
- Core: 2.5g Verisol collagen, 250mg glutathione, 2500mcg biotin B7, vitamin C, zero sugar, plant pectin
- Price: Rs2,450 per pouch (15 servings)
- Tiers: The Curious (1 pouch), The Devoted (3 pouches, Rs6,750), The Luminous (6 pouches, Rs12,300)
- WhatsApp: +92 321 0550303

CRISIS PROTOCOL:
- If user mentions self-harm, suicide, or severe mental health crisis:
- Respond with empathy and provide Pakistan resources:
  - Umang Pakistan: 0311-7786264
  - Rozan Counselling: 0800-22444
  - Befrienders Pakistan: 0333-277-1777
- Encourage them to reach out immediately.`;

/* ── Rate limiting ── */
const rateLimitMap = new Map();
const RATE_WINDOW_MS = 60000;
const RATE_MAX_REQUESTS = 30;

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

// Cleanup old entries
setInterval(function() {
  const now = Date.now();
  for (const [ip, rec] of rateLimitMap) {
    if (now - rec.t > RATE_WINDOW_MS * 2) rateLimitMap.delete(ip);
  }
}, 300000);

/* ── Sanitization ── */
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').slice(0, MAX_MESSAGE_LENGTH);
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
      console.warn('[Noorix] Free chat rate limited:', ip);
      return NextResponse.json(
        { error: 'Too many messages. Please wait a moment.' },
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

    const { messages } = body;

    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array required.' }, { status: 400 });
    }
    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json({ error: 'Conversation too long. Please start a new chat.' }, { status: 400 });
    }

    // Sanitize messages
    const sanitizedMessages = messages.map(function(m) {
      if (!m || typeof m !== 'object') return { role: 'user', content: '' };
      return {
        role: ['user', 'assistant'].includes(m.role) ? m.role : 'user',
        content: sanitize(m.content || ''),
      };
    }).filter(function(m) { return m.content.length > 0; });

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ error: 'No valid messages.' }, { status: 400 });
    }

    // Call Noorix AI
    const text = await chat(sanitizedMessages, SYSTEM_PROMPT);

    const latency = Date.now() - startTime;
    console.log('[Noorix] Free chat | ' + latency + 'ms | ' + text.length + ' chars');

    return NextResponse.json({ success: true, message: text });

  } catch (error) {
    const latency = Date.now() - startTime;
    console.error('[Noorix] Free chat error (' + latency + 'ms):', error.message);

    const clientMessage = error.message?.includes('timed out')
      ? 'Response took too long. Please try a shorter message.'
      : error.message?.includes('rate')
      ? 'Service is busy. Please wait a moment.'
      : 'Something went wrong. Please try again.';

    return NextResponse.json({ error: clientMessage }, { status: 500 });
  }
}

/* ── GET handler — health check ── */
export async function GET() {
  return NextResponse.json({
    service: 'Noorix Free Chat',
    status: 'operational',
    timestamp: new Date().toISOString(),
  });
}
