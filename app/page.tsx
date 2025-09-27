'use client';
import Header from "@/components/Header";
import IPhoneFrame from "@/components/IPhoneFrame";
import FeatureStrip from "@/components/FeatureStrip";
import { motion } from "framer-motion";
import { fadeRise } from "@/lib/animations";

export default function Page() {
  return (
    <main>
      <Header />

      {/* HERO */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-12 gap-12 items-center">
          {/* Copy */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            animate="show"
            className="md:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600">
              <span>Seamless Smart Home</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black">
              Your home, perfectly in sync.
            </h1>
            <p className="text-gray-600 text-lg max-w-prose">
              Apple-first integration for lighting, privacy, climate, and security — designed to feel invisible until you need it.
            </p>
            <div className="flex gap-3">
              <a href="#features" className="rounded-full bg-black text-white px-5 py-3 text-sm">Explore Features</a>
              <a href="#contact" className="rounded-full border px-5 py-3 text-sm">Get Started</a>
            </div>
          </motion.div>

          {/* Visual (photo block with iPhone overlay) */}
          <div className="md:col-span-6 md:justify-self-end w-full md:max-w-[45vw]">
            <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              {/* Background photo = single source of truth */}
              <img
                src="/Curtains-Open-Lights-On.png"
                alt="Living room"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Subtle separation glow behind the phone (very light) */}
              <div className="pointer-events-none absolute right-0 bottom-0 w-2/3 h-2/3
                              bg-[radial-gradient(60%_60%_at_75%_75%,rgba(255,255,255,0.35),transparent_60%)]" />

              {/* iPhone overlay — capped sizing via internal component + extra scale to avoid oversized desktop */}
              <div className="absolute bottom-4 right-4 origin-bottom-right
                              scale-90 sm:scale-95 md:scale-100 lg:scale-100">
                {/* If your IPhoneFrame screen is truly transparent, you can omit children.
                   If your component currently REQUIRES children, keep the same image to stay visually in sync. */}
                <IPhoneFrame>
                  <img
                    src="/Curtains-Open-Lights-On.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </IPhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeatureStrip />
    </main>
  );
}
