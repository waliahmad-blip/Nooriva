import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET
);

export async function POST(request) {
  try {
    const { phone } = await request.json();
    if (!phone) return NextResponse.json({ error: "Phone required." }, { status: 400 });

    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: { channel: 'sms' },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to send OTP." }, { status: 500 });
  }
}
