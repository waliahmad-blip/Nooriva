"use client";

import dynamic from "next/dynamic";

/* ═══════════════════════════════════════════════════════════
   NOORIX CHAT — CLIENT BOUNDARY
   The `ssr: false` dynamic import must live inside a Client
   Component. Keeping it here lets app/noorix/chat/page.jsx stay
   a Server Component that still emits metadata + JSON-LD.
   ═══════════════════════════════════════════════════════════ */

const NoorixChat = dynamic(() => import("@/components/noorix/NoorixChat"), {
  ssr: false,
  loading: () => <NoorixChatLoadingScreen />,
});

function NoorixChatLoadingScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0f] text-white">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 opacity-40 blur-2xl animate-pulse" />
        <div className="relative h-12 w-12 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
      </div>
      <p className="mt-6 text-sm font-medium text-white/50">
        Awakening Noorix…
      </p>
    </div>
  );
}

export default function NoorixChatClient() {
  return <NoorixChat />;
}
