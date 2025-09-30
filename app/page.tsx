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
 * 2. Hero Section (FULL-SCREEN with text overlay and SmartIndicators)
 * 3. Perfect Light Section (lights demo with Control Center card)
 * 4. Footer (with Works With badges)
 */

export default function Page() {
  return (
    <main>
      {/* Fixed header navigation */}
      <Header />
      
      {/* 
        ========== HERO SECTION (FULL-SCREEN IMMERSIVE) ==========
        Apple-style hero with:
        - Full-screen background photo
        - Centered text overlay with subtle dark backdrop
        - SmartIndicators overlaid on the photo for interactivity
        - Bold, dramatic, premium feel
        
        Design Philosophy:
        - Photo is the hero (not text)
        - Text is minimal and centered
        - SmartIndicators get maximum canvas space
        - Immersive first impression
      */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* 
          Full-Screen Background Photo
          - Covers entire viewport
          - High-quality room image with HomePod
          - Object-cover ensures proper aspect ratio on all screens
        */}
        <img
          src="/Curtains-Open-Lights-On-Homepod.png"
          alt="Smart home living room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* 
          Subtle Dark Overlay
          - Improves text readability without darkening too much
          - 30% black opacity maintains photo's beauty while ensuring contrast
          - Only visible behind text area
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
        
        {/* 
          Centered Text Overlay
          - Positioned above photo with z-10
          - Max width keeps text readable (not stretched across full screen)
          - Text color is white for contrast against darkened background
          - Minimal content: headline, subhead, single CTA
        */}
        <motion.div 
          variants={fadeRise} 
          initial="hidden" 
          animate="show"
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        >
          {/* 
            Main Headline
            - Large, bold, attention-grabbing
            - Uses relative positioning for gradient underline on "perfectly in sync"
            - Responsive text sizes (5xl on mobile, 7xl on desktop)
          */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            Your home,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">perfectly in sync.</span>
              {/* 
                Gradient Underline Effect
                - Subtle highlight beneath key phrase
                - White gradient fading to transparent
                - Positioned absolutely below text
              */}
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-white/40 via-white/20 to-transparent z-0"></span>
            </span>
          </h1>
          
          {/* 
            Subheading / Value Proposition
            - Describes the product in one clear sentence
            - Slightly smaller, good contrast
            - Drop shadow for extra readability
          */}
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/95 max-w-2xl mx-auto drop-shadow-lg">
            Apple-first integration for lighting, privacy, climate, and security — designed to feel invisible until you need it.
          </p>
          
          {/* 
            Primary CTA Button
            - Single, clear call-to-action
            - White background for high contrast against dark overlay
            - Smooth hover effects (scale + shadow)
            - Links to PerfectLight section to show features
          */}
          <div className="pt-2">
            <a 
              href="#perfect-light" 
              className="inline-flex items-center rounded-full bg-white text-black px-6 py-3.5 text-base font-medium
                hover:bg-gray-100 hover:scale-[1.02] hover:shadow-2xl
                active:scale-[0.98]
                transition-all duration-200 ease-out
                shadow-xl"
            >
              Explore Features
            </a>
          </div>
        </motion.div>
        
        {/* 
          Interactive SmartIndicators Overlay
          - Positioned absolutely over the photo
          - Shows hotspots for lights, curtains, climate, security, voice control
          - Users can click indicators to learn about features
          - Gets maximum space on full-screen canvas
          - z-20 to sit above everything else
        */}
        <div className="absolute inset-0 z-20">
          <SmartIndicators />
        </div>
        
        {/* 
          Scroll Indicator (Optional)
          - Subtle hint to scroll down
          - Positioned at bottom center
          - Bouncing animation draws attention
          - Can be removed if you don't want it
        */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg 
            className="w-6 h-6 text-white/60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </motion.div>
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
