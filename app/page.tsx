'use client';
import Header from "@/components/Header";
import WorksWith from "@/components/WorksWith"; // Import the new WorksWith component
import { motion } from "framer-motion";
import { fadeRise } from "@/lib/animations";
import SmartIndicators from "@/components/SmartIndicators";

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

          {/* Right: Room with smart indicators */}
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* The room image */}
            <img
              src="/Curtains-Open-Lights-On.png"
              alt="Smart home living room"
              className="w-full h-auto rounded-3xl"
            />
            
            {/* Smart feature indicators overlaid on the room */}
            <SmartIndicators />
          </motion.div>
        </div>
      </section>
      <WorksWith />
    </main>
  );
}
