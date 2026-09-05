import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=31.5204&longitude=74.3587&current_weather=true&daily=temperature_2m_max,temperature_2m_min,uv_index_max&timezone=Asia%2FKarachi"
    );
    if (!res.ok) throw new Error("Weather fetch failed");
    const d = await res.json();
    const c = d.current_weather;
    const temp = Math.round(c.temperature);
    const uv = d.daily?.uv_index_max?.[0] ?? null;

    let advice = "Stay hydrated with a NOORISH GOLD ritual.";
    if (uv >= 8) advice = "Very high UV — use SPF 50 and stay inside at midday.";
    else if (uv >= 5) advice = "High UV — apply SPF 30+ and reapply every 2 hours.";
    else if (temp >= 35) advice = "Extreme heat — hydrate and opt for ALOE TIDE or COCO GLOW.";
    else if (temp <= 15) advice = "Cool weather — warm up with SAFFRON MIST.";

    return NextResponse.json({
      success: true,
      city: "Lahore",
      temperature: temp,
      windspeed: Math.round(c.windspeed),
      uvIndex: uv,
      advice,
      source: "Open-Meteo",
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
