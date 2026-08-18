"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/lib/data";

export default function OrderWhatsApp() {
  const t = useT();
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Assalam-o-Alaikum NOORIVA! I want to order."
  )}`;

  return (
    <section className="section-shell py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="glass rounded-[2.5rem] bg-white/75 p-8 text-center md:p-12"
      >
        <h2 className="display-heading text-3xl md:text-4xl">Order in 30 seconds 🤝</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/60 md:text-base">
          No forms, no accounts. Message us on WhatsApp, pick your flavours, pay
          on delivery anywhere in Pakistan.
        </p>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mx-auto mt-6"
        >
          <MessageCircle size={17} /> {t("faq.whatsapp")}
        </a>
      </motion.div>
    </section>
  );
}
