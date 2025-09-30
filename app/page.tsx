'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PerfectLight from "@/components/PerfectLight";
import { motion } from "framer-motion";
import { fadeRise } from "@/lib/animations";
import SmartIndicators from "@/components/SmartIndicators";

/**
 * Main Page Component
 * 
 * Structure:
 * 1. Header (fixed navigation)
 * 2. Hero Section (3/9 ASYMMETRIC FULL-BLEED with SmartIndicators)
 * 3. Perfect Light Section (lights demo with Control Center card)
 * 4. Footer (with Works With badges)
 */

export default function Page() {
  return (
    <main>
      {/* Fixed header navigation */}
      <Header />
      
      {/* 
        ========== HERO SECTION (ASYMMETRIC FULL-BLEED) ==========
        
        Design Strategy:
        - Text: 3 columns (25% width) - compact, left-aligned
        - Photo: 9 columns (75% width) - dominant, bleeds off right edge
        - Photo extends beyond container (no right margin/padding)
        - Creates dramatic "photo breaking out" effect
        - SmartIndicators have maximum clean canvas
        - No overlay on photo - keeps it crisp and interactive
        
        Key Principles:
        - Photo is the hero, not the text
        - Text supports but doesn't compete
        - Bleeding edge creates visual drama without full-screen overlay
        - SmartIndicators are unobstructed and prominent
      */}
      <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
        <div className="w-full">
          {/* 
            Asymmetric Grid Container
            - Uses negative margin on right to allow photo bleed
            - 3/9 column split (not centered, photo-dominant)
            - Gap is minimal to let photo feel connected to text
          */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* 
              ===== LEFT COLUMN: TEXT CONTENT (3 columns) =====
              - Compact but comfortable width for reading
              - Left-aligned for natural reading flow
              - Generous left padding for breathing room from edge
              - Vertical centering via flex
            */}
            <motion.div 
              variants={fadeRise} 
              initial="hidden" 
              animate="show" 
              className="md:col-span-3 flex flex-col justify-center space-y-6 px-6 md:px-8 lg:px-12"
            >
              {/* 
                Main Headline
                - Large and bold but not overwhelming
                - Gradient underline on key phrase for emphasis
                - Responsive sizing (smaller on mobile, larger on desktop)
              */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-black leading-tight">
                Your home,{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">perfectly in sync.</span>
                  {/* Subtle gradient underline effect */}
                  <span className="absolute bottom-1 md:bottom-2 left-0 right-0 h-2 md:h-3 bg-gradient-to-r from-gray-200 to-transparent z-0"></span>
                </span>
              </h1>
              
              {/* 
                Value Proposition / Subheading
                - Clear, concise description
                - Good contrast without being too dark
                - Max width keeps lines readable
              */}
              <p className="text-gray-600 text-base md:text-lg max-w-prose leading-relaxed">
                Apple-first integration for lighting, privacy, climate, and security — designed to feel invisible until you need it.
              </p>
              
              {/* 
                Primary CTA Button
                - Single clear call-to-action
                - Black button for strong contrast
                - Links to feature showcase below
                - Smooth hover/active states
              */}
              <div className="pt-2">
                <a 
                  href="#perfect-light" 
                  className="inline-flex items-center rounded-full bg-black text-white px-6 py-3 text-sm md:text-base font-medium
                    hover:bg-gray-900 hover:scale-[1.02] 
                    active:scale-[0.98]
                    transition-all duration-200 ease-out
                    shadow-lg hover:shadow-xl"
                >
                  Explore Features
                </a>
              </div>
            </motion.div>

            {/* 
              ===== RIGHT COLUMN: PHOTO WITH FULL-BLEED (9 columns) =====
              
              Key Techniques:
              1. Takes 9 columns (75% of grid width)
              2. Negative right margin extends photo beyond container
              3. On mobile, full width with small negative margins
              4. Creates "breaking out" visual effect
              5. SmartIndicators overlay on clean, unobstructed photo
            */}
            <motion.div 
              className="md:col-span-9 relative -mx-4 md:mx-0 md:-mr-8 lg:-mr-16 xl:-mr-24"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* 
                Photo Container
                - Relative positioning for SmartIndicators overlay
                - Rounded corners on left side only (right bleeds off)
                - Shadow for depth and separation
                - Aspect ratio maintains photo proportions
              */}
              <div className="relative aspect-[16/10] rounded-l-3xl overflow-hidden shadow-2xl">
                {/* 
                  Room Background Image
                  - High-quality lifestyle photo
                  - Object-cover ensures proper cropping on all screens
                  - Full width and height of container
                */}
                <img
                  src="/Curtains-Open-Lights-On-Homepod.png"
                  alt="Smart home living room with integrated controls"
                  className="w-full h-full object-cover"
                />
                
                {/* 
                  SmartIndicators Overlay
                  - Interactive hotspots showing features
                  - Positioned absolutely over clean photo
                  - No text overlay competition
                  - Maximum space and visibility
                  - Users can click to learn about lights, curtains, climate, security, voice
                */}
                <div className="absolute inset-0">
                  <SmartIndicators />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 
        ========== PERFECT LIGHT SECTION ==========
        Interactive lights demo with Control Center card
        Shows room state changes with synchronized toggles
      */}
      <PerfectLight />
      
      {/* 
        ========== FOOTER ==========
        Works With badges + navigation + legal links
      */}
      <Footer />
    </main>
  );
}
