'use client';
import Header from "@/components/Header";
import FeatureStrip from "@/components/FeatureStrip";
import { motion } from "framer-motion";
import { fadeRise } from "@/lib/animations";
import FloatingCard from "@/components/FloatingCard";
import { MicrophoneIcon, KeyIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Page() {
  return (
    <main>
      <Header />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text */}
          <motion.div variants={fadeRise} initial="hidden" animate="show" className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600">
              <span>Seamless Smart Home</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black">
              Your home, perfectly in sync.
            </h1>
            <p className="text-gray-600 text-lg max-w-prose">
              Apple-first integration for lighting, privacy, climate, and security —
              designed to feel invisible until you need it.
            </p>
            <div className="flex gap-3">
              <a href="#features" className="rounded-full bg-black text-white px-5 py-3 text-sm">
                Explore Features
              </a>
              <a href="#contact" className="rounded-full border px-5 py-3 text-sm">
                Get Started
              </a>
            </div>
          </motion.div>

          {/* Right: Room with floating cards */}
          <div className="relative">
            <img
              src="/Curtains-Open-Lights-On.png"
              alt="Room Lights On"
              className="rounded-3xl shadow-lg"
            />

            {/* Floating cards with stagger */}
            <FloatingCard
              icon={<MicrophoneIcon className="w-5 h-5 text-blue-600" />}
              title="Voice Control"
              subtitle="Just ask Siri"
              className="top-4 left-4"
              delay={0.1}
            />
            <FloatingCard
              icon={<KeyIcon className="w-5 h-5 text-green-600" />}
              title="HomeKey"
              subtitle="Tap. You're home."
              className="top-4 right-4"
              delay={0.2}
            />
            <FloatingCard
              icon={<LockClosedIcon className="w-5 h-5 text-red-600" />}
              title="Security"
              subtitle="See who's here"
              className="bottom-6 left-4"
              delay={0.3}
            />
            <FloatingCard
              icon={<SparklesIcon className="w-5 h-5 text-purple-600" />}
              title="Automation"
              subtitle="Set the mood"
              className="bottom-6 right-4"
              delay={0.4}
            />
          </div>
        </div>
      </section>
      <FeatureStrip />
    </main>
  );
}
