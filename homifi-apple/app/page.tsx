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
      <section className="pt-44 pb-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeRise} initial="hidden" animate="show" className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600">
              <span>Seamless Smart Home</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black">Your home, perfectly in sync.</h1>
            <p className="text-gray-600 text-lg max-w-prose">Apple‑first integration for lighting, privacy, climate, and security — designed to feel invisible until you need it.</p>
            <div className="flex gap-3">
              <a href="#features" className="rounded-full bg-black text-white px-5 py-3 text-sm">Explore Features</a>
              <a href="#contact" className="rounded-full border px-5 py-3 text-sm">Get Started</a>
            </div>
          </motion.div>
          <div className="justify-self-center">
            <IPhoneFrame>
              <img src="/Curtains-Open-Lights-On.png" alt="Room Lights On" className="w-full h-full object-cover" />
            </IPhoneFrame>
          </div>
        </div>
      </section>
      <FeatureStrip />
    </main>
  );
}