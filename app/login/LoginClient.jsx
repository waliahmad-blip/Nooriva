'use client'
import BackToHome from "@/components/ui/BackToHome";;

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2, AlertCircle, ArrowLeft, Phone, Key, Chrome } from 'lucide-react';
import LanguageToggle from '@/components/ui/LanguageToggle';
import Link from 'next/link';

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [authMode, setAuthMode] = useState('phone');
  const [mounted, setMounted] = useState(false);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    setMounted(true);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseAnonKey) {
      setSupabase(createClient(supabaseUrl, supabaseAnonKey));
    }
  }, []);

  if (!mounted) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!supabase) {
      setError('Authentication service is not configured.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({ email, password });
      if (supabaseError) throw supabaseError;

      if (data.session) {
        const res = await signIn('supabase-token', { token: data.session.access_token, redirect: false });
        if (res?.ok) {
          router.push('/account');
        } else {
          setError('Failed to create session. Please try again.');
        }
      } else {
        setError('No session returned. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOtp = async () => {
    setError('');
    if (!phone) {
      setError('Please enter your phone number.');
      return;
    }
    if (!supabase) {
      setError('Authentication service is not configured.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({ phone, options: { shouldCreateUser: true } });
      if (otpError) throw otpError;
      setOtpSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const { data, error: otpError } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
      if (otpError) throw otpError;

      if (data.session) {
        const res = await signIn('phone-otp', { phone, otp, redirect: false });
        if (res?.ok) {
          router.push('/account');
        } else {
          setError('Failed to create session.');
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to verify OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await signIn('google', { callbackUrl: '/account' });
    } catch (err) {
      setError('Failed to initiate Google login.');
      setIsSubmitting(false);
    }
  };

  const tabButtonClass = (mode) =>
    `flex-1 py-2 text-xs font-bold rounded-lg transition ${
      authMode === mode
        ? 'bg-white/10 text-white shadow-sm'
        : 'text-white/50 hover:bg-white/5'
    }`;

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-[#ff5e99] focus:bg-white/10 focus:shadow-[0_0_15px_rgba(255,94,153,0.2)]';

  return (
      <div className="relative min-h-screen w-full overflow-x-hidden text-white flex items-center justify-center login-aurora">
        <BackToHome />
      <div className="absolute top-6 left-0 right-0 z-30 flex w-full items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#ff5e99] to-[#7c3aed] shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:scale-110 transition-transform" />
          <span className="text-lg font-bold tracking-wider text-white/90">NOORIVA</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Home
          </Link>
          <div className="rounded-full border border-white/10 bg-white/5 p-0.5 backdrop-blur-md">
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0a12]/70 p-8 shadow-[0_0_60px_rgba(124,58,237,0.25)] backdrop-blur-xl"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-xs text-white/50 mt-1">Sign in to access your glow journey</p>
          </div>

          <div className="flex gap-1 mb-6 p-1 rounded-xl border border-white/10 bg-black/20">
            <button onClick={() => setAuthMode('phone')} className={tabButtonClass('phone')}>Phone</button>
            <button onClick={() => setAuthMode('credentials')} className={tabButtonClass('credentials')}>Email</button>
          </div>

          <AnimatePresence mode="wait">
            {authMode === 'phone' ? (
              <motion.form
                key="phone"
                onSubmit={otpSent ? handleVerifyOtp : (e) => { e.preventDefault(); handleSendOtp(); }}
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div>
                  <label className="text-xs font-bold text-white/50 mb-1.5 block">Phone Number</label>
                  <div className="relative group">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#ff5e99] transition-colors" />
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={otpSent} className={`${inputClass} disabled:opacity-50`} placeholder="+92 3XX XXXXXXX" />
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <label className="text-xs font-bold text-white/50 mb-1.5 block">OTP Code</label>
                    <div className="relative group">
                      <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#ff5e99] transition-colors" />
                      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required className={inputClass} placeholder="6-digit code" />
                    </div>
                  </div>
                )}

                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-300">
                    <AlertCircle size={14} /> <span>{error}</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff5e99] via-[#7c3aed] to-[#06b6d4] hover:brightness-110"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : otpSent ? <><LogIn size={16} /> Verify OTP</> : <><Phone size={16} /> Send OTP</>}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="credentials"
                onSubmit={handleLogin}
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div>
                  <label className="text-xs font-bold text-white/50 mb-1.5 block">Email</label>
                  <div className="relative group">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#ff5e99] transition-colors" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/50 mb-1.5 block">Password</label>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#ff5e99] transition-colors" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} placeholder="••••••••" />
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-300">
                    <AlertCircle size={14} /> <span>{error}</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff5e99] via-[#7c3aed] to-[#06b6d4] hover:brightness-110"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><LogIn size={16} /> Login</>}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-xs"><span className="bg-[#0a0a12]/70 px-2 text-white/40">OR</span></div>
          </div>

          <motion.button
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 rounded-xl py-3 text-sm font-bold text-white bg-white/5 border border-white/10 shadow-lg transition-all hover:bg-white/10 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Chrome size={16} /> Continue with Google
          </motion.button>

          <div className="mt-6 text-center text-xs text-white/40">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#ff5e99] hover:underline font-bold transition-colors">Sign up</Link>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .login-aurora {
          background:
            radial-gradient(circle at 20% 30%, rgba(255, 94, 153, 0.22) 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.22) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
            #050509;
          background-size: 150% 150%;
          animation: loginAurora 16s ease-in-out infinite alternate;
        }
        @keyframes loginAurora {
          0% { background-position: 0% 0%, 100% 0%, 50% 100%; }
          100% { background-position: 100% 100%, 0% 100%, 50% 0%; }
        }
      `}</style>
    </div>
  );
}
