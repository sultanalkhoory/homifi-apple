'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PerfectControl from "@/components/PerfectControl";
import { motion } from "framer-motion";
import { fadeRise } from "@/lib/animations";
import SmartIndicators from "@/components/SmartIndicators";

/**
 * Main Page Component
 * 
 * Structure:
 * 1. Header (fixed navigation)
 * 2. Hero Section (with SmartIndicators)
 * 3. Perfect Control Section (lights demo with iPhone)
 * 4. Footer (with Works With badges)
 */

export default function Page() {
  return (
    <main>
      {/* Fixed header navigation */}
      <Header />
      
      {/* 
        ========== HERO SECTION ==========
        5/7 grid layout
        Left: Text content
        Right: Room photo with interactive SmartIndicators overlay
      */}
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left column - Text content (5/12) */}
          <motion.div 
            variants={fadeRise} 
            initial="hidden" 
            animate="show" 
            className="space-y-6 md:col-span-5"
          >
            {/* Main headline with gradient underline effect */}
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black">
              Your home,{" "}
              <span className="relative">
                <span className="relative z-10">perfectly in sync.</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-gray-50 to-transparent z-0"></span>
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-gray-600 text-lg max-w-prose">
              Apple-first integration for lighting, privacy, climate, and security — designed to feel invisible until you need it.
            </p>
            
            {/* Single CTA button */}
            <div className="pt-2">
              <a 
                href="#perfect-control" 
                className="rounded-full bg-black text-white px-5 py-3 text-sm inline-flex hover:bg-gray-900 transition-colors"
              >
                Explore Features
              </a>
            </div>
          </motion.div>

          {/* Right column - Room photo with SmartIndicators (7/12) */}
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-lg md:col-span-7"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Room background image */}
            <img
              src="/Curtains-Open-Lights-On.png"
              alt="Smart home living room"
              className="w-full h-auto rounded-3xl"
            />
            
            {/* 
              Interactive feature indicators overlay
              Shows lights, curtains, climate, security hotspots
            */}
            <SmartIndicators />
          </motion.div>
        </div>
      </section>
      
      {/* 
        ========== PERFECT CONTROL SECTION ==========
        Interactive lights demo with iPhone overlay
        Shows room state changes with synchronized toggles
      */}
      <PerfectControl />
      
      {/* 
        ========== FOOTER ==========
        Works With badges + navigation + legal links
      */}
      <Footer />
    </main>
  );
}
