"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Utensils, CloudSun, Sparkles, Loader2, ArrowRight, RefreshCw,
  GlassWater, Wind, Quote, Lightbulb, Activity, Users, Moon, Cat, MapPin,
  User as UserIcon, Globe, Music, BookOpen, HelpCircle, Newspaper, Compass,
  Sunrise, CalendarDays, Hash, HeartPulse, Salad, FlaskConical
} from "lucide-react";
import Link from "next/link";
import ScrollToTop from "@/components/ui/ScrollToTop";

/* ═══════════════════════════════════════════════════════════
   GENERIC API HOOK
   ═══════════════════════════════════════════════════════════ */

function useApi(url, autoLoad = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setData(await res.json());
    } catch (err) {
      setError(err.message || "Could not load.");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (autoLoad && url) load();
  }, [load, autoLoad, url]);

  return { data, loading, error, load };
}

/* ═══════════════════════════════════════════════════════════
   GENERIC WIDGET
   ═══════════════════════════════════════════════════════════ */

function ApiWidget({ title, icon: Icon, endpoint, render, refreshLabel = "Refresh" }) {
  const { data, loading, error, load } = useApi(endpoint);
  return (
    <motion.section
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon size={18} className="text-pink-400" />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <button
        onClick={load}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/20 disabled:opacity-50"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={14} />}
        {refreshLabel}
      </button>
      <AnimatePresence mode="wait">
        {loading && !data && <p className="mt-4 text-center text-sm text-white/50">Loading…</p>}
        {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
        {data && (
          <motion.div
            key={JSON.stringify(data).slice(0, 40)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            {render(data)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROFILE GUESS (Agify + Genderize + Nationalize)
   ═══════════════════════════════════════════════════════════ */

function ProfileGuessCard() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  const ageUrl = submitted ? `https://api.agify.io/?name=${encodeURIComponent(submitted)}` : null;
  const natUrl = submitted ? `https://api.nationalize.io/?name=${encodeURIComponent(submitted)}` : null;
  const genUrl = submitted ? `https://api.genderize.io/?name=${encodeURIComponent(submitted)}` : null;

  const age = useApi(ageUrl, false);
  const nat = useApi(natUrl, false);
  const gen = useApi(genUrl, false);

  function submit(e) {
    e.preventDefault();
    const v = name.trim();
    if (!v) return;
    setSubmitted(v);
  }

  useEffect(() => {
    if (submitted) {
      age.load();
      nat.load();
      gen.load();
    }
  }, [submitted]);

  return (
    <motion.section whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Users size={18} className="text-emerald-400" />
        <h2 className="text-lg font-bold">Guess My Profile</h2>
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter any name"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-emerald-400/50"
        />
        <button type="submit" className="rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2.5 text-sm font-bold text-black transition hover:brightness-110">
          <Sparkles size={16} />
        </button>
      </form>

      {submitted && (
        <div className="mt-4 space-y-3 text-sm">
          <div className="rounded-xl bg-white/5 p-3">
            {age.loading ? <Loader2 size={16} className="mx-auto animate-spin" /> : age.error ? <p className="text-red-400">{age.error}</p> : (
              <p><span className="font-bold text-white">{submitted}</span> is likely <span className="text-pink-400 font-bold">{age.data?.age ?? "—"}</span> years old.</p>
            )}
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            {nat.loading ? <Loader2 size={16} className="mx-auto animate-spin" /> : nat.error ? <p className="text-red-400">{nat.error}</p> : (
              <p>Most likely from <span className="text-emerald-400 font-bold">{nat.data?.country?.[0]?.country_id ?? "—"}</span> ({(nat.data?.country?.[0]?.probability ?? 0) * 100}%)</p>
            )}
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            {gen.loading ? <Loader2 size={16} className="mx-auto animate-spin" /> : gen.error ? <p className="text-red-400">{gen.error}</p> : (
              <p>Likely <span className="text-cyan-400 font-bold">{gen.data?.gender ?? "—"}</span> ({(gen.data?.probability ?? 0) * 100}%)</p>
            )}
          </div>
        </div>
      )}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN API HUB DASHBOARD
   ═══════════════════════════════════════════════════════════ */

export default function ApiHubDashboard() {
  const [foodQuery, setFoodQuery] = useState("");
  const [foodLoading, setFoodLoading] = useState(false);
  const [foodError, setFoodError] = useState(null);
  const [foodResult, setFoodResult] = useState(null);

  async function searchFood(e) {
    e?.preventDefault();
    if (!foodQuery.trim()) return;
    setFoodLoading(true);
    setFoodError(null);
    setFoodResult(null);
    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(foodQuery)}&search_simple=1&action=process&json=1&page_size=1`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("Food search failed.");
      const data = await res.json();
      const p = data.products?.[0];
      if (!p) {
        setFoodError("No food found.");
      } else {
        const n = p.nutriments || {};
        setFoodResult({
          name: p.product_name || foodQuery,
          brand: p.brands || "Unknown brand",
          image: p.image_front_small_url || p.image_url || null,
          calories: n["energy-kcal_100g"] ? Math.round(n["energy-kcal_100g"]) : null,
          protein: n.proteins_100g != null ? Math.round(n.proteins_100g * 10) / 10 : null,
          carbs: n.carbohydrates_100g != null ? Math.round(n.carbohydrates_100g * 10) / 10 : null,
          fat: n.fat_100g != null ? Math.round(n.fat_100g * 10) / 10 : null,
        });
      }
    } catch (err) {
      setFoodError(err.message);
    } finally {
      setFoodLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0f] text-white p-4 md:p-8 pt-24">
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <motion.div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-[120px]" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 16, repeat: Infinity }} />
        <motion.div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[120px]" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 18, repeat: Infinity }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-pink-300 backdrop-blur-md">
            <Sparkles size={14} /> NOORIX · 50TH FEATURE
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">AI API Hub</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
            20 live free APIs for nutrition, health, lifestyle, and knowledge.
          </p>
          <Link href="/account" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-md transition hover:bg-white/20">
            <ArrowRight size={16} /> Back to Dashboard
          </Link>
        </motion.header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Nutrition Lookup (Open Food Facts) */}
          <motion.section whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2"><Search size={18} className="text-pink-400" /><h2 className="text-lg font-bold">Nutrition Lookup</h2></div>
            <form onSubmit={searchFood} className="flex gap-2">
              <input value={foodQuery} onChange={(e) => setFoodQuery(e.target.value)} placeholder="e.g. banana, yogurt" className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-pink-400/50" />
              <button type="submit" disabled={foodLoading} className="rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-50">{foodLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}</button>
            </form>
            {foodError && <p className="mt-4 text-center text-sm text-red-400">{foodError}</p>}
            {foodResult && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                {foodResult.image && <img src={foodResult.image} alt={foodResult.name} className="mx-auto h-32 w-32 rounded-2xl object-cover" />}
                <h3 className="mt-3 text-center font-bold">{foodResult.name}</h3>
                <p className="mb-2 text-center text-xs text-white/40">{foodResult.brand}</p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[["kcal", foodResult.calories], ["Protein", foodResult.protein], ["Carbs", foodResult.carbs], ["Fat", foodResult.fat]].map(([l, v]) => (
                    <div key={l} className="rounded-xl bg-white/5 p-2"><p className="text-lg font-extrabold">{v ?? "—"}</p><p className="text-[10px] uppercase tracking-wider text-white/40">{l}</p></div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.section>

          {/* USDA FoodData Central */}
          <ApiWidget
            title="USDA FoodData"
            icon={FlaskConical}
            endpoint="https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=1&api_key=DEMO_KEY"
            render={(d) => {
              const food = d.foods?.[0];
              if (!food) return <p className="text-center text-red-400">No data.</p>;
              return (
                <div className="text-center">
                  <h3 className="font-bold">{food.description}</h3>
                  <p className="text-xs text-white/40">{food.foodCategory}</p>
                  <p className="mt-2 text-sm text-white/60">First nutrient: {food.foodNutrients?.[0]?.nutrientName} {food.foodNutrients?.[0]?.value}</p>
                </div>
              );
            }}
          />

          {/* TheCocktailDB */}
          <ApiWidget
            title="Glow Drink Inspiration"
            icon={GlassWater}
            endpoint="https://www.thecocktaildb.com/api/json/v1/1/random.php"
            render={(d) => {
              const drink = d.drinks?.[0];
              if (!drink) return <p className="text-center text-red-400">No drink found.</p>;
              return (
                <>
                  <img src={drink.strDrinkThumb} alt={drink.strDrink} className="mx-auto h-32 w-32 rounded-2xl object-cover" />
                  <h3 className="mt-3 text-center font-bold">{drink.strDrink}</h3>
                  <p className="text-center text-xs text-white/40">{drink.strCategory} · {drink.strAlcoholic}</p>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/60">{drink.strInstructions}</p>
                </>
              );
            }}
          />

          {/* Open-Meteo Weather */}
          <ApiWidget
            title="Live Weather"
            icon={CloudSun}
            endpoint="https://api.open-meteo.com/v1/forecast?latitude=31.5204&longitude=74.3587&current_weather=true&daily=temperature_2m_max,temperature_2m_min,uv_index_max&timezone=Asia%2FKarachi"
            render={(d) => {
              const c = d.current_weather;
              const temp = Math.round(c.temperature);
              const uv = d.daily?.uv_index_max?.[0] ?? null;
              return (
                <div className="text-center">
                  <p className="text-5xl font-extrabold">{temp}°C</p>
                  <p className="mt-1 text-sm text-white/60">Lahore · UV {uv ?? "—"} · Wind {Math.round(c.windspeed)} km/h</p>
                  <p className="mt-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">
                    {temp >= 30 ? "Stay hydrated — time for a NOORISH GOLD ritual." : temp >= 20 ? "Perfect weather for a refreshing glow drink." : "Warm up with a comforting ritual."}
                  </p>
                </div>
              );
            }}
          />

          {/* Open-Meteo Air Quality */}
          <ApiWidget
            title="Air Quality"
            icon={Wind}
            endpoint="https://air-quality-api.open-meteo.com/v1/air-quality?latitude=31.5204&longitude=74.3587&current=pm10,pm2_5"
            render={(d) => {
              const c = d.current;
              const pm25 = c.pm2_5;
              const status = pm25 <= 12 ? "Good" : pm25 <= 35 ? "Moderate" : pm25 <= 55 ? "Unhealthy" : "Hazardous";
              return (
                <div className="text-center">
                  <p className="text-4xl font-extrabold">{pm25}</p>
                  <p className="text-sm text-white/60">PM2.5 · Lahore</p>
                  <p className="mt-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">{status} air quality</p>
                </div>
              );
            }}
          />

          {/* Sunrise Sunset */}
          <ApiWidget
            title="Sunrise & Sunset"
            icon={Sunrise}
            endpoint="https://api.sunrise-sunset.org/json?lat=31.5204&lng=74.3587&formatted=0"
            render={(d) => {
              const r = d.results;
              return (
                <div className="text-center">
                  <p className="text-sm text-white/60">Sunrise: <span className="font-bold text-white">{new Date(r.sunrise).toLocaleTimeString()}</span></p>
                  <p className="text-sm text-white/60">Sunset: <span className="font-bold text-white">{new Date(r.sunset).toLocaleTimeString()}</span></p>
                </div>
              );
            }}
          />

          {/* 7Timer! */}
          <ApiWidget
            title="Astronomy Forecast"
            icon={Compass}
            endpoint="https://www.7timer.info/bin/astro.php?lon=74.3587&lat=31.5204&ac=0&unit=metric&output=json"
            render={(d) => (
              <div className="text-center">
                <p className="text-sm text-white/60">Product: {d.product}</p>
                <p className="text-sm text-white/60">Init: {d.init}</p>
              </div>
            )}
          />

          {/* Quotable */}
          <ApiWidget
            title="Daily Inspiration"
            icon={Quote}
            endpoint="https://dummyjson.com/quotes/random"
            render={(q) => (
              <blockquote className="text-center">
                <p className="text-sm leading-relaxed text-white/80">"{q.quote}"</p>
                <footer className="mt-2 text-xs font-bold text-pink-400">— {q.author}</footer>
              </blockquote>
            )}
          />

          {/* ZenQuotes */}
          <ApiWidget
            title="Zen Quote"
            icon={HeartPulse}
            endpoint="https://zenquotes.io/api/random"
            render={(d) => {
              const q = d[0];
              return (
                <blockquote className="text-center">
                  <p className="text-sm leading-relaxed text-white/80">"{q.q}"</p>
                  <footer className="mt-2 text-xs font-bold text-emerald-400">— {q.a}</footer>
                </blockquote>
              );
            }}
          />

          {/* Numbers API */}
          <ApiWidget
            title="Useful Facts"
            icon={Hash}
            endpoint="https://uselessfacts.jsph.pl/random.json?language=en"
            render={(fact) => (
              <p className="text-center text-sm leading-relaxed text-white/80">{fact.text}</p>
            )}
          />

          {/* Aladhan Prayer Times */}
          <ApiWidget
            title="Prayer Times"
            icon={Moon}
            endpoint="https://api.aladhan.com/v1/timingsByCity?city=Lahore&country=Pakistan&method=1"
            render={(d) => {
              const t = d.data.timings;
              return (
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((p) => (
                    <div key={p} className="rounded-xl bg-white/5 p-2">
                      <p className="text-[10px] uppercase tracking-wider text-white/40">{p}</p>
                      <p className="mt-1 font-bold">{t[p]}</p>
                    </div>
                  ))}
                </div>
              );
            }}
          />

          {/* Islamic Calendar */}
          <ApiWidget
            title="Hijri Date"
            icon={CalendarDays}
            endpoint="https://api.aladhan.com/v1/gToH"
            render={(d) => {
              const h = d.data.hijri;
              return (
                <div className="text-center">
                  <p className="text-2xl font-extrabold">{h.day} {h.month.en} {h.year}</p>
                  <p className="text-xs text-white/40">{h.weekday.en}</p>
                </div>
              );
            }}
          />

          {/* IPWho.is */}
          <ApiWidget
            title="Your Location"
            icon={MapPin}
            endpoint="https://ipwho.is/"
            render={(d) => (
              <div className="text-center">
                <p className="text-4xl">{d.flag?.emoji ?? ""}</p>
                <p className="mt-1 text-sm text-white/60">{d.city}, {d.country}</p>
                <p className="mt-1 text-xs text-white/40">{d.ip}</p>
                <p className="mt-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">{d.connection?.isp}</p>
              </div>
            )}
          />

          {/* iTunes Search */}
          <ApiWidget
            title="Music Search"
            icon={Music}
            endpoint="https://itunes.apple.com/search?term=meditation&limit=1"
            render={(d) => {
              const item = d.results?.[0];
              if (!item) return <p className="text-center text-red-400">No result.</p>;
              return (
                <div className="text-center">
                  <img src={item.artworkUrl100} alt={item.trackName} className="mx-auto h-24 w-24 rounded-xl object-cover" />
                  <h3 className="mt-2 font-bold">{item.trackName}</h3>
                  <p className="text-xs text-white/40">{item.artistName}</p>
                </div>
              );
            }}
          />

          {/* Wikipedia */}
          <ApiWidget
            title="Wikipedia Summary"
            icon={BookOpen}
            endpoint="https://en.wikipedia.org/api/rest_v1/page/summary/Health"
            render={(d) => (
              <div className="text-center">
                <h3 className="font-bold">{d.title}</h3>
                <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-white/60">{d.extract}</p>
              </div>
            )}
          />

          {/* Open Trivia DB */}
          <ApiWidget
            title="Trivia Question"
            icon={HelpCircle}
            endpoint="https://opentdb.com/api.php?amount=1&type=multiple"
            render={(d) => {
              const q = d.results?.[0];
              if (!q) return <p className="text-center text-red-400">No question.</p>;
              return (
                <div className="text-center">
                  <p className="text-sm font-semibold text-white/80" dangerouslySetInnerHTML={{ __html: q.question }} />
                  <p className="mt-2 text-xs text-white/40">{q.category} · {q.difficulty}</p>
                </div>
              );
            }}
          />

          {/* Hacker News */}
          <ApiWidget
            title="Hacker News Top"
            icon={Newspaper}
            endpoint="https://hacker-news.firebaseio.com/v0/topstories.json"
            render={(ids) => (
              <div className="text-center">
                <p className="text-sm text-white/60">Top story IDs: {ids.slice(0, 3).join(", ")}</p>
              </div>
            )}
          />

          {/* Nominatim */}
          <ApiWidget
            title="Geocoding"
            icon={Globe}
            endpoint="https://nominatim.openstreetmap.org/search?q=Lahore&format=json&limit=1"
            render={(d) => {
              const place = d[0];
              if (!place) return <p className="text-center text-red-400">No result.</p>;
              return (
                <div className="text-center">
                  <p className="font-bold">{place.display_name}</p>
                  <p className="text-xs text-white/40">Lat: {place.lat}, Lon: {place.lon}</p>
                </div>
              );
            }}
          />

          {/* Profile Guess */}
          <ProfileGuessCard />
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}
