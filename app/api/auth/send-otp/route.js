import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ error: "Auth service is not configured." }, { status: 503 });
    }

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
