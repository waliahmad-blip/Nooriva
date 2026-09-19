'use client';
import BackToHome from "@/components/ui/BackToHome";

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

const AtmosphericSkySphere = dynamic(() => import('@/components/three/AtmosphericSkySphere'), { ssr: false });
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  CloudFog,
  Snowflake,
  Share2,
  Check,
  ArrowRight,
  Sparkles,
  MapPin,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '@/lib/store';

/* ─────────────────────────────────────────────
   CITY ROUTER — free Open-Meteo endpoints
   ───────────────────────────────────────────── */

const CITIES = [
  { name: 'Lahore', lat: 31.5204, lon: 74.3587 },
  { name: 'Karachi', lat: 24.8607, lon: 67.0011 },
  { name: 'Islamabad', lat: 33.6844, lon: 73.0479 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Riyadh', lat: 24.7136, lon: 46.6753 },
];

const RITUAL_MATCH = [
  { min: 32, ritual: 'ALOE TIDE', slug: 'aloe-tide', note: 'Cooling barrier for hot days', color: '#22d3ee' },
  { min: 26, ritual: 'COCO GLOW', slug: 'coco-glow', note: 'Reset your light in warm air', color: '#5eead4' },
  { min: 20, ritual: 'ROSE HALO', slug: 'rose-halo', note: 'Soft glow for easy weather', color: '#ff8fb2' },
  { min: 12, ritual: 'SAFFRON MIST', slug: 'saffron-mist', note: 'Golden comfort for cool air', color: '#a78bfa' },
  { min: -99, ritual: 'BAMBOO SILK', slug: 'bamboo-silk', note: 'Warm reflect for crisp days', color: '#d6d3d1' },
];

const WEATHER_EMOJI = {
  0: { icon: Sun, label: 'Clear', sky: 'linear-gradient(180deg, #0ea5e9, #67e8f9)' },
  1: { icon: Sun, label: 'Mostly clear', sky: 'linear-gradient(180deg, #38bdf8, #a5f3fc)' },
  2: { icon: CloudSun, label: 'Partly cloudy', sky: 'linear-gradient(180deg, #60a5fa, #bae6fd)' },
  3: { icon: CloudSun, label: 'Cloudy', sky: 'linear-gradient(180deg, #64748b, #cbd5e1)' },
  45: { icon: CloudFog, label: 'Foggy', sky: 'linear-gradient(180deg, #94a3b8, #e2e8f0)' },
  51: { icon: CloudRain, label: 'Light drizzle', sky: 'linear-gradient(180deg, #0284c7, #7dd3fc)' },
  61: { icon: CloudRain, label: 'Rain', sky: 'linear-gradient(180deg, #1e40af, #93c5fd)' },
  71: { icon: Snowflake, label: 'Snow', sky: 'linear-gradient(180deg, #475569, #f1f5f9)' },
};

function weatherInfo(code) {
  return WEATHER_EMOJI[code] || WEATHER_EMOJI[0];
}

function protectionAdvice(temp, uv) {
  if (uv >= 8) return 'Very high UV — SPF 50+, avoid direct sun midday.';
  if (uv >= 5) return 'High UV — SPF 30+, reapply every 2 hours.';
  if (temp >= 32) return 'Hot day — hydration windows every 2 hours, light botanical mist.';
  if (temp <= 14) return 'Cool day — lock moisture with a golden warm ritual.';
  return 'Mild day — SPF 30, stay hydrated, skin food twice.';
}

function getRitual(temp) {
  return RITUAL_MATCH.find((r) => temp >= r.min) || RITUAL_MATCH[RITUAL_MATCH.length - 1];
}

export default function WeatherGlow() {
  const addToCart = useStore((s) => s.addToCart);
  const reduced = useReducedMotion();
  const [city, setCity] = useState(CITIES[0]);
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState(null);
  const [shared, setShared] = useState(false);

  async function loadWeather(selected) {
    setLoading(true);
    try {
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${selected.lat}&longitude=${selected.lon}&current_weather=true&daily=uv_index_max,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const [wRes, aRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${selected.lat}&longitude=${selected.lon}&current=pm2_5`),
      ]);

      if (!wRes.ok || !aRes.ok) throw new Error('Weather fetch failed');

      const wData = await wRes.json();
      const aData = await aRes.json();

      setWeather({
        temp: Math.round(wData.current_weather.temperature),
        wind: Math.round(wData.current_weather.windspeed),
        code: wData.current_weather.weathercode,
        uv: wData.daily?.uv_index_max?.[0] ?? null,
        dailyMax: wData.daily?.temperature_2m_max?.[0],
        dailyMin: wData.daily?.temperature_2m_min?.[0],
      });

      setAqi(Math.round(aData.current?.pm2_5 ?? 0));
    } catch {
      setWeather(null);
      setAqi(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather(city);
  }, [city]);

  const info = weather ? weatherInfo(weather.code) : weatherInfo(0);
  const ritual = weather ? getRitual(weather.temp) : RITUAL_MATCH[0];
  const advice = weather ? protectionAdvice(weather.temp, weather.uv) : 'Tuning into nature…';

  function shareCard() {
    const text = `${city.name} — ${weather ? weather.temp + '°C' : '--'} · UV ${weather?.uv ?? '--'} · AQI ${aqi ?? '--'}\nToday's natural glow: ${ritual.ritual}. ${advice}\n#WeatherGlow #NOORIVA #DrinkYourNaturalGlow`;
    if (navigator.share) {
      navigator.share({ title: 'NOORIVA Weather Glow', text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#ffffff] text-ink pb-36">
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-20 md:px-8"><BackToHome className="mb-2 inline-block" /></div>
      {/* Animated sky backdrop */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 transition-all duration-1000"
        style={{ background: info.sky, opacity: 0.22 }}
        animate={reduced ? {} : { opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(circle at 10% 10%, rgba(103,232,249,0.18), transparent 35%),
            radial-gradient(circle at 90% 20%, rgba(94,234,212,0.14), transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(254,240,138,0.12), transparent 45%)
          `,
        }}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-12 md:px-8">
        {/* Header */}
        <section className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300 backdrop-blur-md"
          >
            <CloudSun size={14} />
            Weather Glow
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-heading mt-5 text-5xl leading-[0.95] md:text-7xl"
          >
            Your skin,
            <span className="block bg-gradient-to-r from-[#67e8f9] to-[#22d3ee] bg-clip-text text-transparent">
              tuned to the sky.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-ink/60"
          >
            Live weather, UV, and air — matched to your natural glow ritual.
          </motion.p>

          {/* City selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {CITIES.map((c) => (
              <button
                key={c.name}
                onClick={() => setCity(c)}
                className={`rounded-full border px-5 py-2.5 text-sm font-bold backdrop-blur-md transition ${
                  city.name === c.name
                    ? 'border-cyan-400 bg-cyan-400/20 text-cyan-200'
                    : 'border-ink/10 bg-ink/5 text-ink/60 hover:bg-ink/10'
                }`}
              >
                {c.name}
              </button>
            ))}
          </motion.div>
        </section>

        
        {/* 3D Atmospheric Sky Sphere with Dynamic Solar Flare / Rain Caustics */}
        <div className="mx-auto mt-6 max-w-lg">
          <AtmosphericSkySphere
            weatherType={weather?.rain ? 'rain' : 'clear'}
            uvIndex={weather?.uv || 6}
          />
        </div>
  
        {/* Main weather card */}
        <section className="mx-auto mt-12 max-w-4xl">
          <div className="glass relative overflow-hidden rounded-[2.5rem] p-8 text-center md:p-12">
            <div
              className="absolute inset-0 opacity-10"
              style={{ background: info.sky }}
            />
            <div className="relative">
              {loading ? (
                <p className="text-ink/50">Reading nature&apos;s pulse…</p>
              ) : weather ? (
                <>
                  <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
                    <div>
                      <info.icon size={72} className="mx-auto text-cyan-300" />
                      <p className="mt-2 text-sm uppercase tracking-[0.25em] text-ink/50">
                        {info.label}
                      </p>
                    </div>

                    <div>
                      <p className="text-7xl font-black md:text-8xl">{weather.temp}°C</p>
                      <p className="mt-2 text-ink/60">
                        H {weather.dailyMax}° · L {weather.dailyMin}°
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 w-full max-w-sm mt-4 md:mt-0">
                      <div className="rounded-2xl border border-ink/10 bg-white/70 p-3 text-center shadow-sm">
                        <Sun size={18} className="mx-auto text-amber-500 mb-1" />
                        <span className="block text-xl font-black text-ink">{weather.uv ?? '--'}</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-ink/40">UV Index</span>
                      </div>
                      <div className="rounded-2xl border border-ink/10 bg-white/70 p-3 text-center shadow-sm">
                        <Wind size={18} className="mx-auto text-cyan-500 mb-1" />
                        <span className="block text-xl font-black text-ink">{weather.wind}</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-ink/40">km/h Wind</span>
                      </div>
                      <div className="rounded-2xl border border-ink/10 bg-white/70 p-3 text-center shadow-sm">
                        <Droplets size={18} className="mx-auto text-sky-500 mb-1" />
                        <span className="block text-xl font-black text-ink">{aqi ? Math.round(aqi) : '24'}</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-ink/40">PM2.5 AQI</span>
                      </div>
                    </div>
                  </div>

                  <p className="mx-auto mt-6 max-w-xl text-sm italic leading-relaxed text-ink/70">
                    {advice}
                  </p>
                </>
              ) : (
                <p className="text-red-300">Could not read the sky. Please try again.</p>
              )}
            </div>
          </div>
        </section>

        {/* Ritual match */}
        <section className="mx-auto mt-10 max-w-4xl">
          <div className="glass flex flex-col items-center gap-6 rounded-[2.5rem] p-8 text-center md:flex-row md:text-left">
            <div
              className="h-28 w-20 rounded-[36%]"
              style={{
                background: `linear-gradient(160deg, ${ritual.color}, ${ritual.color}55 55%, #ffffff10)`,
                boxShadow: `0 30px 70px ${ritual.color}44`,
              }}
            />
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#22d3ee]">
                Today&apos;s Natural Ritual
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">{ritual.ritual}</h2>
              <p className="mt-2 text-ink/60">{ritual.note}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => addToCart(ritual.slug)}
                  className="btn-primary !py-2.5 !px-5 text-xs inline-flex items-center gap-2 shadow-md hover:scale-105"
                >
                  <ShoppingBag size={15} /> Add to Bag · ₨ 2,450
                </button>
                <Link
                  href={`/drinks/${ritual.slug}`}
                  className="btn-secondary !py-2.5 !px-5 text-xs inline-flex items-center gap-1.5"
                >
                  Explore Ritual <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hourly protection timeline */}
        <section className="mt-16">
          <h2 className="display-heading mb-5 text-3xl text-ink">Protection Timeline</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {Array.from({ length: 8 }).map((_, i) => {
              const hour = (new Date().getHours() + i * 3) % 24;
              const label = `${String(hour).padStart(2, '0')}:00`;
              const step = weather && weather.uv >= 5 ? 'SPF + mist' : weather && weather.temp >= 30 ? 'Hydrate' : 'Skin food';
              return (
                <div key={i} className="glass min-w-[110px] rounded-2xl p-4 text-center">
                  <p className="text-sm font-bold text-ink/80">{label}</p>
                  <p className="mt-2 text-xs font-semibold text-cyan-300">{step}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mood input */}
        <section className="mt-16">
          <h2 className="display-heading mb-5 text-3xl text-ink">How does your skin feel?</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { emoji: '😊', label: 'Glowing' },
              { emoji: '😐', label: 'Okay' },
              { emoji: '🥵', label: 'Oily' },
              { emoji: '😶‍🌫️', label: 'Dull' },
              { emoji: '🥶', label: 'Dry' },
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => setMood(option.label)}
                className={`glass rounded-full px-5 py-3 text-sm font-bold transition ${
                  mood === option.label ? 'ring-2 ring-cyan-400' : ''
                }`}
              >
                {option.emoji} {option.label}
              </button>
            ))}
          </div>
          {mood && (
            <p className="mt-4 text-sm italic text-ink/50">
              Noted — {mood}. Noorix will tune your glow accordingly.
            </p>
          )}
        </section>

        {/* Share card */}
        <section className="mt-16 pb-10">
          <button
            onClick={shareCard}
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-ink transition hover:scale-105"
          >
            {shared ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} className="text-cyan-300" />}
            {shared ? 'Copied!' : 'Share Weather Glow'}
          </button>
        </section>
      </main>
    </div>
  );
}
