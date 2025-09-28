'use client';
import Header from "@/components/Header";
import IPhoneFrame from "@/components/IPhoneFrame";
import FeatureStrip from "@/components/FeatureStrip";
import HeroDashboard from "@/components/HeroDashboard";
import { motion } from "framer-motion";
import { fadeRise } from "@/lib/animations";

export default function Page() {
  return (
    <main>
      <Header />

      {/* 
        ========== HERO SECTION ==========
        
        Layout:
        - Desktop: Two-column grid (text left, visual right)
        - Mobile: Stacked vertically (text first, visual below)
        
        Key Implementation:
        - Single photo source (background image in photo block)
        - iPhone overlays with TRANSPARENT screen
        - Photo shows through iPhone naturally (no duplicate images)
        - iPhone capped at ≤45% viewport width on desktop
      */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN - Copy Block */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            animate="show"
            className="md:col-span-6 space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600">
              <span>Seamless Smart Home</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black">
              Your home, perfectly in sync.
            </h1>
            
            {/* Subhead */}
            <p className="text-gray-600 text-lg max-w-prose">
              Apple-first integration for lighting, privacy, climate, and security — designed to feel invisible until you need it.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex gap-3">
              <a href="#features" className="rounded-full bg-black text-white px-5 py-3 text-sm">
                Explore Features
              </a>
              <a href="#contact" className="rounded-full border px-5 py-3 text-sm">
                Get Started
              </a>
            </div>
          </motion.div>

          {/* 
            RIGHT COLUMN - Visual Block
            - Self-aligns to right on desktop
            - Max width 45vw to maintain balance with text
          */}
          <div className="md:col-span-6 md:justify-self-end w-full md:max-w-[45vw]">
            
            {/* 
              PHOTO BLOCK - Single source of truth
              - Contains background photo
              - iPhone overlays on this block
              - iPhone screen is transparent, shows this photo through it
            */}
            <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              
              {/* Background Photo - THE ONLY IMAGE SOURCE */}
              <img
                src="/Curtains-Open-Lights-On.png"
                alt="Living room with lights on and curtains open"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* 
                Subtle Separation Glow
                - Soft light behind iPhone for depth
                - Bottom-right radial gradient
                - Very subtle (35% opacity)
              */}
              <div className="pointer-events-none absolute right-0 bottom-0 w-2/3 h-2/3
                              bg-[radial-gradient(60%_60%_at_75%_75%,rgba(255,255,255,0.35),transparent_60%)]" />

              {/* 
                IPHONE OVERLAY
                - Positioned bottom-right
                - Responsive scaling (90% mobile → 100% desktop)
                - NO CHILDREN = transparent screen shows photo through it
                - Glass UI controls can be added inside IPhoneFrame later
              */}
              <div className="absolute bottom-4 right-4 origin-bottom-right
                              scale-90 sm:scale-95 md:scale-100 lg:scale-100">
                <IPhoneFrame>
                  <HeroDashboard />
                </IPhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <FeatureStrip />
    </main>
  );
}
