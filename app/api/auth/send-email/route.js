import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET
);

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: "Email required." }, { status: 400 });

    const { error } = await supabase.auth.signInWithOtp({
      email,
      emailRedirectTo: `${process.env.NEXTAUTH_URL}/api/auth/callback/email`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
