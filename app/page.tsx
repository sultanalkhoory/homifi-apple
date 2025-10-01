'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PerfectLight from "@/components/PerfectLight";
import PerfectPrivacy from "@/components/PerfectPrivacy";
import { motion } from "framer-motion";
import { fadeRise } from "@/lib/animations";
import SmartIndicators from "@/components/SmartIndicators";

/**
 * Main Page Component
 * 
 * Structure:
 * 1. Header (fixed navigation)
 * 2. Hero Section (4/8 BALANCED LAYOUT with SmartIndicators)
 * 3. Perfect Light Section (lights demo with Control Center card)
 * 4. Perfect Privacy Section (curtains demo with Control Center card)
 * 5. Footer (with Works With badges)
 */

export default function Page() {
  return (
    <main>
      {/* Fixed header navigation */}
      <Header />
      
      {/* 
        ========== HERO SECTION (4/8 BALANCED LAYOUT) ==========
        
        Mobile spacing fix: md:min-h-screen instead of min-h-screen
        - Mobile: Content-driven height (no forced white space)
        - Desktop: Full-screen hero effect (dramatic impact)
      */}
      <section className="md:min-h-screen flex items-center py-20">
        <div className="mx-auto max-w-7xl px-4 w-full">
          {/* 
            Grid Container
            - 12-column grid system
            - Responsive gap (smaller on mobile, larger on desktop)
            - Items vertically centered
          */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* 
              ===== LEFT COLUMN: TEXT CONTENT (4 columns / 33%) =====
              
              Content Hierarchy:
              1. Headline - Large, attention-grabbing
              2. Subheading - Clear value proposition
              3. Description - Supporting details
              4. CTA - Single clear action
              
              Spacing:
              - Generous vertical spacing between elements
              - Comfortable line height for readability
              - Left-aligned for natural flow
            */}
            <motion.div 
              variants={fadeRise} 
              initial="hidden" 
              animate="show" 
              className="md:col-span-4 space-y-6"
            >
              {/* 
                Main Headline
                - Bold and prominent
                - Clean, no decorative elements
                - Responsive text sizing
                - Tight tracking for modern look
              */}
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-black leading-tight">
                Your home, perfectly in sync.
              </h1>
              
              {/* 
                Value Proposition / Subheading
                - Designed for Apple Home (premium positioning)
                - Seamless integration messaging
                - Acknowledges all major platforms (inclusive)
                - Good color contrast (gray-600)
              */}
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed">
                Designed for Apple Home. Seamless integration with every major platform.
              </p>
              
              {/* 
                Primary CTA Button
                - Single, focused call-to-action
                - Black background for strong contrast
                - Rounded-full for modern, friendly appearance
                - Smooth hover and active states
                - Links to feature demonstration section below
              */}
              <div className="pt-2">
                <a 
                  href="#perfect-light" 
                  className="inline-flex items-center rounded-full bg-black text-white 
                    px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium
                    hover:bg-gray-900 hover:scale-[1.02] hover:shadow-lg
                    active:scale-[0.98]
                    transition-all duration-200 ease-out
                    shadow-md"
                >
                  Explore Features
                </a>
              </div>
            </motion.div>

            {/* 
              ===== RIGHT COLUMN: PHOTO WITH SMART INDICATORS (8 columns / 67%) =====
              
              Photo Strategy:
              - Takes up 67% of horizontal space (vs 58% in original)
              - Contained within grid (no bleeding)
              - Clean rounded corners all around
              - Proper shadow for depth
              - SmartIndicators overlaid on unobstructed photo
              
              Why This Works:
              - Photo is clearly the visual focus
              - SmartIndicators have plenty of room
              - No text overlay competition
              - Clean, professional presentation
            */}
            <motion.div 
              className="md:col-span-8"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* 
                Photo Container
                - Relative positioning for SmartIndicators absolute overlay
                - Rounded-3xl for modern, premium feel
                - Overflow hidden to clip image to border radius
                - Shadow-2xl for depth and visual separation
                - Aspect ratio maintains proper proportions
              */}
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                {/* 
                  Room Background Image
                  - High-quality lifestyle photo showing the smart home
                  - Features: living room with furniture, lighting, curtains, HomePod
                  - Object-cover ensures image fills container without distortion
                  - Alt text for accessibility
                */}
                <img
                  src="/Curtains-Open-Lights-On-Homepod.png"
                  alt="Modern smart home living room featuring integrated lighting, automated curtains, and voice control"
                  className="w-full h-full object-cover"
                />
                
                {/* 
                  SmartIndicators Component Overlay
                  - Interactive hotspots positioned over photo features
                  - Shows: Lights, Curtains, Climate, Security, Voice Control
                  - Users can hover (desktop) or tap (mobile) to learn about each feature
                  - Positioned absolutely to overlay the photo
                  - Full inset (covers entire photo area)
                  - z-index allows interaction above photo
                  
                  Features:
                  - Pulsing animated dots
                  - Glass-morphic info popups on interaction
                  - Smooth animations
                  - Mobile-friendly tap-to-reveal mode
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
        Interactive lights demo with iOS Control Center-style card
        Shows room state changes with synchronized photo transitions
        Features:
        - Control Center card (compact on mobile, full size on desktop)
        - Smooth crossfade between lights on/off photos
        - Auto-trigger animation on scroll into view
      */}
      <PerfectLight />

      {/* 
        ========== PERFECT PRIVACY SECTION ==========
        Interactive curtains demo with video playback
        Shows curtains opening/closing with Control Center card
        Layout alternates: Video LEFT, Text RIGHT (opposite of PerfectLight)
        Auto-plays opening video once when section comes into view
      */}
      <PerfectPrivacy />
      
      {/* 
        ========== FOOTER ==========
        Site footer with multiple components:
        - Works With platform badges (HomeKit, Google, Alexa)
        - Navigation links
        - Legal links (Privacy, Terms, Cookies)
        - Copyright notice
      */}
      <Footer />
    </main>
  );
}
