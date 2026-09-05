'use client'
import BackToHome from "@/components/ui/BackToHome";;
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { createClient } from '@supabase/supabase-js';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, UserPlus, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import LanguageToggle from '@/components/ui/LanguageToggle';
import Link from 'next/link';

export default function SignupClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    setMounted(true);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseAnonKey) {
      setSupabase(createClient(supabaseUrl, supabaseAnonKey));
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!supabase) {
      setError('Authentication service is not configured.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error: supabaseError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (supabaseError) {
        setError(supabaseError.message);
        setIsSubmitting(false);
        return;
      }

      if (data.user) {
        if (data.session) {
          const res = await signIn('supabase-token', {
            token: data.session.access_token,
            redirect: false,
          });
          if (res?.ok) {
            router.push('/account');
          } else {
            setError('Failed to create session. Please login manually.');
            router.push('/login');
          }
        } else {
          setError('Account created! Please check your email to verify your address.');
          setTimeout(() => router.push('/login'), 3000);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred during signup.');
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
      <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] text-white flex items-center justify-center">
        <BackToHome />

      <motion.div
        className="absolute inset-0 z-0 opacity-25"
        style={{
          background: 'linear-gradient(135deg, #ff8fb2 0%, #a78bfa 50%, #67e8f9 100%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div className="absolute inset-0 z-0 bg-[#0a0a0f]/85" />

      <motion.div
        className="absolute top-20 left-10 w-24 h-40 rounded-full bg-white/5 blur-sm"
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-48 rounded-full bg-white/5 blur-sm"
        animate={{ y: [0, 40, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-20 h-32 rounded-full bg-white/5 blur-sm"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top Bar with Back to Home Button */}
      <div className="absolute top-6 left-0 right-0 z-30 flex w-full items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#ff8fb2] to-[#a78bfa] opacity-90 group-hover:scale-110 transition-transform" />
          <span className="text-lg font-bold tracking-wider text-white/90">NOORIVA</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Home
          </Link>
          <div className="rounded-full bg-white/5 p-0.5 backdrop-blur-md border border-white/10">
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center min-h-[40px] max-w-md"
        >
          <p className="text-sm text-white/50 font-mono">
            Registering new bio-signature...
            <span className="animate-pulse text-white/30">_</span>
          </p>
        </motion.div>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass relative w-full max-w-md rounded-3xl p-8 border border-white/10"
        >
          <div className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(167, 139, 250, 0.3)' }} />

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white/90">Create Account</h1>
            <p className="text-xs text-white/40 mt-1">Join NOORIVA to access Noorix AI</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-white/50 mb-1.5 block">Email</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#a78bfa] transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#a78bfa]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(167,139,250,0.1)]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-white/50 mb-1.5 block">Password</label>
              <div className="relative group">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#a78bfa] transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#a78bfa]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(167,139,250,0.1)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                className="flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-xs text-blue-400/80 overflow-hidden"
              >
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #a78bfa, #67e8f9)', boxShadow: '0 0 15px rgba(103, 232, 249, 0.2)' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={16} /> Sign Up
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-xs text-white/40">
            Already have an account?{' '}
            <Link href="/login" className="text-[#a78bfa] hover:underline font-bold transition-colors">
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
