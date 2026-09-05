/**
 * lib/auth.js
 * ─────────────────────────────────────────────────────────────
 * NOORIVA NextAuth configuration.
 *
 * Providers
 *   • Google OAuth
 *   • Supabase token exchange
 *   • Phone OTP (SMS)
 *   • WhatsApp magic link (SMS OTP)
 *   • Email magic link
 *
 * The same file is safe to import in both:
 *   • app/api/auth/[...nextauth]/route.js  →
 *       import { handlers } from "@/lib/auth";
 *       export const { GET, POST } = handlers;
 *   • server components / route handlers →
 *       import { auth } from "@/lib/auth";
 *
 * No provider identity is exposed to the client.
 * ─────────────────────────────────────────────────────────────
 */

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

/* ═══════════════════════════════════════════════════════════
   ENVIRONMENT VALIDATION
   ═══════════════════════════════════════════════════════════ */

const REQUIRED_ENV = [
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
];

const OPTIONAL_ENV = ["SUPABASE_URL", "SUPABASE_SECRET"];

function assertEnv() {
  const missing = REQUIRED_ENV.filter((key) => {
    const value = process.env[key];
    return typeof value !== "string" || value.trim() === "";
  });

  if (missing.length > 0) {
    const detail = missing
      .map((key) => `${key} is missing`)
      .join(", ");

    if (process.env.NODE_ENV === "production") {
      throw new Error(`[auth] Build blocked — ${detail}. Check .env.local.`);
    }

    // In development we warn loudly instead of crashing the server.
    console.warn(`[auth] Missing environment variables: ${detail}`);
  }

  const missingOptional = OPTIONAL_ENV.filter((key) => {
    const value = process.env[key];
    return typeof value !== "string" || value.trim() === "";
  });

  if (missingOptional.length > 0) {
    console.warn(
      `[auth] Optional Supabase variables not set (${missingOptional.join(", ")}). Supabase providers will be disabled.`
    );
  }
}

assertEnv();

/* ═══════════════════════════════════════════════════════════
   SUPABASE CLIENT (lazy singleton)
   ═══════════════════════════════════════════════════════════ */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET = process.env.SUPABASE_SECRET;

let supabase = null;

function getSupabase() {
  if (supabase) return supabase;

  const url = SUPABASE_URL?.trim();
  const key = SUPABASE_SECRET?.trim();

  if (!url || !key) return null;

  supabase = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return supabase;
}

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */

const DEFAULT_USER_NAME = "Noorix User";

function logAuth(level, providerId, message, meta) {
  const prefix = `[auth:${providerId}]`;

  if (level === "error") {
    console.error(prefix, message, meta ?? "");
  } else if (level === "warn") {
    console.warn(prefix, message, meta ?? "");
  } else if (process.env.NODE_ENV !== "production") {
    console.log(prefix, message, meta ?? "");
  }
}

/**
 * Normalize any Supabase user into the public session shape used by Noorix.
 * Never exposes tokens, aud, or Supabase internals.
 */
function toPublicUser(user, fallbackName = DEFAULT_USER_NAME) {
  if (!user) return null;

  const metadata = user.user_metadata ?? {};
  const name =
    typeof metadata.full_name === "string"
      ? metadata.full_name
      : typeof metadata.name === "string"
        ? metadata.name
        : user.email ?? user.phone ?? fallbackName;

  return {
    id: user.id,
    email: user.email ?? null,
    phone: user.phone ?? null,
    name,
  };
}

/* ═══════════════════════════════════════════════════════════
   SHARED CREDENTIALS PROVIDERS
   ═══════════════════════════════════════════════════════════ */

const supabaseTokenProvider = Credentials({
  id: "supabase-token",
  name: "Supabase Token",
  credentials: {
    token: { label: "Token", type: "text" },
  },
  async authorize(credentials) {
    const client = getSupabase();
    if (!client) {
      logAuth("warn", "supabase-token", "Supabase is not configured.");
      return null;
    }

    try {
      const { data, error } = await client.auth.getUser(credentials.token);

      if (error || !data?.user) {
        logAuth("warn", "supabase-token", "Invalid token.", error?.message);
        return null;
      }

      return toPublicUser(data.user);
    } catch (error) {
      logAuth(
        "error",
        "supabase-token",
        "Token exchange failed.",
        error?.message
      );
      return null;
    }
  },
});

const phoneOtpProvider = Credentials({
  id: "phone-otp",
  name: "Phone OTP",
  credentials: {
    phone: { label: "Phone", type: "tel" },
    otp: { label: "OTP", type: "text" },
  },
  async authorize(credentials) {
    const client = getSupabase();
    if (!client) return null;

    if (!credentials?.phone?.trim() || !credentials?.otp?.trim()) {
      return null;
    }

    try {
      const { data, error } = await client.auth.verifyOtp({
        phone: credentials.phone.trim(),
        token: credentials.otp.trim(),
        type: "sms",
      });

      if (error || !data?.user) {
        logAuth("warn", "phone-otp", "OTP verification failed.", error?.message);
        return null;
      }

      return toPublicUser(data.user, data.user.phone);
    } catch (error) {
      logAuth("error", "phone-otp", "OTP verification failed.", error?.message);
      return null;
    }
  },
});

const whatsappLinkProvider = Credentials({
  id: "whatsapp-link",
  name: "WhatsApp Magic Link",
  credentials: {
    phone: { label: "Phone", type: "tel" },
    code: { label: "Code", type: "text" },
  },
  async authorize(credentials) {
    const client = getSupabase();
    if (!client) return null;

    if (!credentials?.phone?.trim() || !credentials?.code?.trim()) {
      return null;
    }

    try {
      const { data, error } = await client.auth.verifyOtp({
        phone: credentials.phone.trim(),
        token: credentials.code.trim(),
        type: "sms",
      });

      if (error || !data?.user) {
        logAuth(
          "warn",
          "whatsapp-link",
          "WhatsApp code verification failed.",
          error?.message
        );
        return null;
      }

      return toPublicUser(data.user, data.user.phone);
    } catch (error) {
      logAuth(
        "error",
        "whatsapp-link",
        "WhatsApp code verification failed.",
        error?.message
      );
      return null;
    }
  },
});

const emailLinkProvider = Credentials({
  id: "email-link",
  name: "Email Magic Link",
  credentials: {
    email: { label: "Email", type: "email" },
  },
  async authorize(credentials) {
    const client = getSupabase();
    if (!client) return null;

    if (!credentials?.email?.trim()) {
      return null;
    }

    const email = credentials.email.trim();

    try {
      const { data, error } = await client.auth.signInWithOtp({
        email,
        emailRedirectTo: `${process.env.NEXTAUTH_URL}/api/auth/callback/email`,
      });

      if (error) {
        logAuth("warn", "email-link", "Magic link send failed.", error?.message);
        return null;
      }

      // This provider is a trigger-only flow: it sends the magic link email.
      // The actual session is created after the user clicks the link.
      return {
        id: data?.user?.id ?? email,
        email,
        phone: data?.user?.phone ?? null,
        name: data?.user?.email ?? email,
      };
    } catch (error) {
      logAuth(
        "error",
        "email-link",
        "Magic link send failed.",
        error?.message
      );
      return null;
    }
  },
});

/* ═══════════════════════════════════════════════════════════
   GOOGLE PROVIDER
   ═══════════════════════════════════════════════════════════ */

const googleProvider = Google({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
});

/* ═══════════════════════════════════════════════════════════
   NEXTAUTH CONFIG
   ═══════════════════════════════════════════════════════════ */

export const config = {
  providers: [
    supabaseTokenProvider,
    googleProvider,
    phoneOtpProvider,
    whatsappLinkProvider,
    emailLinkProvider,
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  trustHost: true,

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Runs when a new provider account is linked.
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId ?? null;
      }

      // Runs on initial sign-in with credentials providers.
      if (user) {
        token.userId = user.id ?? token.sub;
        token.email = user.email ?? token.email ?? null;
        token.phone = user.phone ?? token.phone ?? null;
        token.name = user.name ?? token.name ?? DEFAULT_USER_NAME;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId ?? token.sub;
        session.user.email = token.email ?? session.user.email ?? null;
        session.user.name = token.name ?? session.user.name ?? DEFAULT_USER_NAME;
        session.user.phone = token.phone ?? null;
      }

      session.provider = token.provider ?? null;
      session.providerAccountId = token.providerAccountId ?? null;

      return session;
    },
  },
};

export const authOptions = config;

/* ═══════════════════════════════════════════════════════════
   HANDLERS + SERVER HELPERS
   ═══════════════════════════════════════════════════════════ */

export const { handlers, auth, signIn, signOut } = NextAuth(config);
