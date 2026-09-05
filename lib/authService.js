/**
 * services/authService.js
 * ─────────────────────────────────────────────────────────────
 * NOORIVA production-grade client authentication service.
 *
 * This module is the only place in the client bundle that talks
 * to NextAuth. It provides:
 *
 *   • Strict input validation before any network call
 *   • Typed, normalized result objects
 *   • Scoped, redacted logging that never leaks PII
 *   • Session caching to avoid redundant getSession() calls
 *   • Safe provider methods: credentials, Google, phone OTP,
 *     WhatsApp OTP, and email magic link
 *
 * The public result contract is kept stable:
 *   { success: boolean, user?: object, error?: string, code?: string }
 *
 * Notes
 *   • Never log passwords, tokens, OTPs, or phone numbers in full.
 *   • The actual authentication happens inside NextAuth providers.
 *   • This service only sanitizes input and wraps signIn/signOut.
 * ─────────────────────────────────────────────────────────────
 */

"use client";

import { signIn, signOut, getSession } from "next-auth/react";

/* ═══════════════════════════════════════════════════════════
   ENVIRONMENT
   ═══════════════════════════════════════════════════════════ */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";

const IS_DEV = process.env.NODE_ENV === "development";

const DEFAULT_CALLBACK_URL = () => {
  if (typeof window === "undefined") return "/";
  return `${window.location.origin}/noorix`;
};

/* ═══════════════════════════════════════════════════════════
   VALIDATION RULES
   ═══════════════════════════════════════════════════════════ */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

/**
 * Rough international phone validation.
 * Accepts optional `+` and 10–15 digits. No letters/spaces.
 */
const PHONE_REGEX = /^\+?[1-9]\d{9,14}$/;

function isValidEmail(value) {
  return typeof value === "string" && EMAIL_REGEX.test(value.trim());
}

function isValidPassword(value) {
  return typeof value === "string" && value.length >= MIN_PASSWORD_LENGTH;
}

function isValidPhone(value) {
  return typeof value === "string" && PHONE_REGEX.test(value.replace(/[\s-]/g, ""));
}

function isValidOtp(value) {
  return typeof value === "string" && /^\d{4,8}$/.test(value.trim());
}

/**
 * Normalize a phone number to a Supabase-friendly E.164-ish format.
 * Keeps leading `+` and strips spaces/dashes.
 */
function normalizePhone(value) {
  return value.replace(/[\s-]/g, "");
}

/* ═══════════════════════════════════════════════════════════
   RESULT HELPERS
   ═══════════════════════════════════════════════════════════ */

const RESULT_CODES = Object.freeze({
  VALIDATION: "VALIDATION_ERROR",
  NETWORK: "NETWORK_ERROR",
  AUTH_FAILED: "AUTHENTICATION_FAILED",
  SESSION: "SESSION_ERROR",
  UNKNOWN: "UNKNOWN_ERROR",
});

function success(user) {
  return {
    success: true,
    user,
    error: undefined,
    code: undefined,
  };
}

function failure(code, message) {
  return {
    success: false,
    user: undefined,
    error: message,
    code,
  };
}

/**
 * Convert any NextAuth session user into the minimal shape
 * consumed by NOORIX components.
 */
function toPublicUser(sessionUser) {
  if (!sessionUser) return null;

  return {
    id: sessionUser.id ?? null,
    email: sessionUser.email ?? null,
    phone: sessionUser.phone ?? null,
    name: sessionUser.name ?? sessionUser.email ?? sessionUser.phone ?? "Noorix User",
    image: sessionUser.image ?? null,
  };
}

/* ═══════════════════════════════════════════════════════════
   SESSION CACHE
   ═══════════════════════════════════════════════════════════ */

let cachedSessionPromise = null;
let cachedSessionSnapshot = null;
let cachedSessionAt = 0;
const SESSION_CACHE_TTL_MS = 30000; // 30 seconds

function clearSessionCache() {
  cachedSessionPromise = null;
  cachedSessionSnapshot = null;
  cachedSessionAt = 0;
}

async function loadSession({ force = false } = {}) {
  const now = Date.now();

  if (
    !force &&
    cachedSessionSnapshot &&
    cachedSessionAt &&
    now - cachedSessionAt < SESSION_CACHE_TTL_MS
  ) {
    return cachedSessionSnapshot;
  }

  if (!force && cachedSessionPromise) {
    return cachedSessionPromise;
  }

  cachedSessionPromise = (async () => {
    try {
      const session = await getSession();
      const publicUser = toPublicUser(session?.user);
      cachedSessionSnapshot = publicUser;
      cachedSessionAt = Date.now();
      return publicUser;
    } catch (error) {
      clearSessionCache();
      log("error", "getSession failed.", error);
      return null;
    } finally {
      cachedSessionPromise = null;
    }
  })();

  return cachedSessionPromise;
}

/* ═══════════════════════════════════════════════════════════
   SAFE LOGGING
   ═══════════════════════════════════════════════════════════ */

function log(level = "info", message = "", meta = null) {
  if (level === "error") {
    console.error(`[AuthService] ${message}`, meta ?? "");
    return;
  }

  if (level === "warn") {
    console.warn(`[AuthService] ${message}`, meta ?? "");
    return;
  }

  if (IS_DEV) {
    console.log(`[AuthService] ${message}`, meta ?? "");
  }
}

/**
 * Redact PII before logging.
 */
function redact(value, type = "generic") {
  if (typeof value !== "string" || value.length === 0) return value;

  if (type === "password" || type === "token" || type === "secret") {
    return "[redacted]";
  }

  if (type === "email") {
    const [local = "", domain = ""] = value.split("@");
    if (local.length <= 2) return `${local}***@${domain}`;
    return `${local[0]}***${local[local.length - 1]}@${domain}`;
  }

  if (type === "phone") {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 6) return "***";
    return `${digits.slice(0, 3)}***${digits.slice(-2)}`;
  }

  if (type === "otp") {
    return "****";
  }

  return value;
}

/* ═══════════════════════════════════════════════════════════
   AUTH SERVICE
   ═══════════════════════════════════════════════════════════ */

export const AuthService = {
  /**
   * Email + password sign-in.
   *
   * Expected NextAuth provider:
   *   `email-password` or `credentials`
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{success:boolean,user?:object,error?:string,code?:string}>}
   */
  async login(email, password) {
    try {
      if (!isValidEmail(email)) {
        return failure(
          RESULT_CODES.VALIDATION,
          "Please enter a valid email address."
        );
      }

      if (!isValidPassword(password)) {
        return failure(
          RESULT_CODES.VALIDATION,
          `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
        );
      }

      log("info", "Login attempt.", {
        email: redact(email, "email"),
      });

      const response = await signIn("email-password", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (!response || response.error) {
        log("warn", "Login rejected by provider.", {
          error: response?.error ?? "unknown",
        });
        return failure(
          RESULT_CODES.AUTH_FAILED,
          response?.error ?? "Unable to sign in with those details."
        );
      }

      clearSessionCache();
      const user = await loadSession({ force: true });

      if (!user) {
        return failure(
          RESULT_CODES.SESSION,
          "Signed in, but your session could not be loaded."
        );
      }

      return success(user);
    } catch (error) {
      log("error", "Login failed.", error?.message);
      return failure(RESULT_CODES.NETWORK, "Something went wrong. Please try again.");
    }
  },

  /**
   * Google OAuth sign-in.
   *
   * @param {{callbackUrl?:string}} [options]
   */
  async loginWithGoogle(options = {}) {
    try {
      const response = await signIn("google", {
        redirect: false,
        callbackUrl: options.callbackUrl ?? DEFAULT_CALLBACK_URL(),
      });

      if (!response || response.error) {
        return failure(
          RESULT_CODES.AUTH_FAILED,
          response?.error ?? "Google sign-in failed."
        );
      }

      clearSessionCache();
      const user = await loadSession({ force: true });

      if (!user) {
        return failure(
          RESULT_CODES.SESSION,
          "Google sign-in completed, but your session could not be loaded."
        );
      }

      return success(user);
    } catch (error) {
      log("error", "Google login failed.", error?.message);
      return failure(RESULT_CODES.NETWORK, "Google sign-in failed. Please try again.");
    }
  },

  /**
   * Phone OTP sign-in.
   *
   * Expected NextAuth provider:
   *   `phone-otp`
   *
   * @param {string} phone
   * @param {string} otp
   */
  async loginWithPhoneOtp(phone, otp) {
    try {
      if (!isValidPhone(phone)) {
        return failure(
          RESULT_CODES.VALIDATION,
          "Please enter a valid phone number."
        );
      }

      if (!isValidOtp(otp)) {
        return failure(
          RESULT_CODES.VALIDATION,
          "Please enter the 4–8 digit code sent to your phone."
        );
      }

      const normalizedPhone = normalizePhone(phone);

      log("info", "Phone OTP attempt.", {
        phone: redact(normalizedPhone, "phone"),
      });

      const response = await signIn("phone-otp", {
        phone: normalizedPhone,
        otp: otp.trim(),
        redirect: false,
      });

      if (!response || response.error) {
        return failure(
          RESULT_CODES.AUTH_FAILED,
          response?.error ?? "OTP verification failed."
        );
      }

      clearSessionCache();
      const user = await loadSession({ force: true });

      if (!user) {
        return failure(
          RESULT_CODES.SESSION,
          "OTP verified, but your session could not be loaded."
        );
      }

      return success(user);
    } catch (error) {
      log("error", "Phone OTP login failed.", error?.message);
      return failure(RESULT_CODES.NETWORK, "OTP sign-in failed. Please try again.");
    }
  },

  /**
   * WhatsApp magic-link / OTP sign-in.
   *
   * Expected NextAuth provider:
   *   `whatsapp-link`
   *
   * @param {string} phone
   * @param {string} code
   */
  async loginWithWhatsApp(phone, code) {
    try {
      if (!isValidPhone(phone)) {
        return failure(
          RESULT_CODES.VALIDATION,
          "Please enter a valid WhatsApp number."
        );
      }

      if (!isValidOtp(code)) {
        return failure(
          RESULT_CODES.VALIDATION,
          "Please enter the 4–8 digit code sent to WhatsApp."
        );
      }

      const normalizedPhone = normalizePhone(phone);

      log("info", "WhatsApp OTP attempt.", {
        phone: redact(normalizedPhone, "phone"),
      });

      const response = await signIn("whatsapp-link", {
        phone: normalizedPhone,
        code: code.trim(),
        redirect: false,
      });

      if (!response || response.error) {
        return failure(
          RESULT_CODES.AUTH_FAILED,
          response?.error ?? "WhatsApp verification failed."
        );
      }

      clearSessionCache();
      const user = await loadSession({ force: true });

      if (!user) {
        return failure(
          RESULT_CODES.SESSION,
          "WhatsApp verified, but your session could not be loaded."
        );
      }

      return success(user);
    } catch (error) {
      log("error", "WhatsApp login failed.", error?.message);
      return failure(
        RESULT_CODES.NETWORK,
        "WhatsApp sign-in failed. Please try again."
      );
    }
  },

  /**
   * Email magic-link send.
   *
   * This does NOT create a browser session immediately.
   * It triggers the provider, which sends a magic link.
   * The session is created after the user clicks the link.
   *
   * Expected NextAuth provider:
   *   `email-link`
   *
   * @param {string} email
   */
  async sendEmailLink(email) {
    try {
      if (!isValidEmail(email)) {
        return failure(
          RESULT_CODES.VALIDATION,
          "Please enter a valid email address."
        );
      }

      log("info", "Magic link send attempt.", {
        email: redact(email, "email"),
      });

      const response = await signIn("email-link", {
        email: email.trim(),
        redirect: false,
      });

      if (!response || response.error) {
        return failure(
          RESULT_CODES.AUTH_FAILED,
          response?.error ?? "Could not send the magic link."
        );
      }

      return {
        success: true,
        user: undefined,
        error: undefined,
        code: undefined,
        message: "Magic link sent. Check your inbox.",
      };
    } catch (error) {
      log("error", "Email magic link failed.", error?.message);
      return failure(
        RESULT_CODES.NETWORK,
        "Could not send the magic link. Please try again."
      );
    }
  },

  /**
   * Sign out and clear the local session cache.
   */
  async logout() {
    clearSessionCache();

    try {
      await signOut({
        redirect: false,
        callbackUrl: typeof window !== "undefined" ? "/" : undefined,
      });
      return { success: true };
    } catch (error) {
      log("error", "Sign out failed.", error?.message);
      return failure(RESULT_CODES.SESSION, "Sign out failed. You may still be signed in.");
    }
  },

  /**
   * Return the currently authenticated public user, if any.
   */
  async getUser() {
    const user = await loadSession();
    return {
      success: Boolean(user),
      user: user ?? undefined,
      error: user ? undefined : "Not authenticated.",
      code: user ? undefined : RESULT_CODES.AUTH_FAILED,
    };
  },

  /**
   * Force-refresh the cached session.
   */
  async refreshSession() {
    const user = await loadSession({ force: true });
    return {
      success: Boolean(user),
      user: user ?? undefined,
      error: user ? undefined : "Session expired or missing.",
      code: user ? undefined : RESULT_CODES.SESSION,
    };
  },
};

export { RESULT_CODES };
