'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';
import { LightBulbIcon } from '@heroicons/react/24/outline';

/**
 * PerfectLight Section Component
 * 
 * Demonstrates smart lighting control with an iOS Control Center-style card.
 * Features:
 * - Auto-triggers lights on when section enters viewport (once only)
 * - Beautiful gradient animation on toggle (gray → vibrant amber/orange)
 * - Synchronized room photo changes (lights on/off)
 * - Smooth 750ms transitions for professional feel
 * 
 * Layout:
 * - Left column (5/12): Heading, description, Control Center card
 * - Right column (7/12): Room photo that changes based on light state
 */
export default function PerfectLight() {
  // Track whether lights are currently on or off
  const [lightsOn, setLightsOn] = useState(false);
  
  // Track if we've already auto-triggered lights (prevent multiple triggers)
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  
  // Reference to the section for intersection observer
  const sectionRef = useRef(null);

  /**
   * Auto-trigger Effect
   * Uses IntersectionObserver to detect when section enters viewport.
   * When 30% of section is visible, waits 800ms then turns lights on.
   * Only triggers once (controlled by hasAutoTriggered flag).
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger if section is visible AND we haven't triggered before
          if (entry.isIntersecting && !hasAutoTriggered) {
            // Delay the lights turning on for dramatic effect
            setTimeout(() => {
              setLightsOn(true);
              setHasAutoTriggered(true); // Prevent future auto-triggers
            }, 800); // 800ms delay after section enters view
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px 0px -100px 0px' // Start slightly before fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [hasAutoTriggered]); // Only re-run if hasAutoTriggered changes

  /**
   * Toggle Handler
   * Manually toggles lights on/off when user clicks the Control Center card
   */
  const handleToggle = () => {
    setLightsOn(!lightsOn);
  };

  return (
    <section 
      ref={sectionRef} 
      id="perfect-light" 
      className="pt-8 pb-20 md:py-28 bg-gray-50"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Two-column grid: Text + Control on left, Photo on right */}
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* ===== LEFT COLUMN: Text + Control Center Card ===== */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5 space-y-6"
          >
            {/* Section Heading */}
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
              Perfect Light
            </h2>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Every room, every moment.<br />
              Exactly as you want it.
            </p>
            
            {/* Description */}
            <p className="text-gray-600 text-lg">
              Control your lighting with intuitive controls and automation. 
              Set the perfect ambiance for any moment.
            </p>
            
            {/* ===== CONTROL CENTER CARD ===== */}
            <div className="pt-4">
              <button
                onClick={handleToggle}
                className={`
                  group relative overflow-hidden
                  rounded-xl sm:rounded-2xl
                  w-full max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[256px]
                  p-3 sm:p-4 md:p-5 lg:p-6
                  transition-all duration-500 ease-out
                  hover:scale-[1.02] active:scale-[0.98]
                  ${lightsOn
                    ? 'bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500 shadow-xl shadow-amber-500/20'
                    : 'bg-gray-200 shadow-lg'
                  }
                `}
                aria-label={`Toggle lights ${lightsOn ? 'off' : 'on'}`}
              >
                {/* Top Row: Icon + Status Indicator */}
                <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                  {/* Light bulb icon with background circle */}
                  <div className={`
                    p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-300
                    ${lightsOn 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-white/60'
                    }
                  `}>
                    <LightBulbIcon className={`
                      w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 
                      transition-colors duration-300
                      ${lightsOn ? 'text-white' : 'text-gray-500'}
                    `} />
                  </div>
                  
                  {/* Status indicator dot (top-right corner) */}
                  <div className={`
                    h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300
                    ${lightsOn 
                      ? 'bg-white shadow-lg shadow-white/50' 
                      : 'bg-gray-400'
                    }
                  `} />
                </div>
                
                {/* Bottom Row: Room name + Status text */}
                <div className="text-left">
                  {/* Room name */}
                  <p className={`
                    text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300
                    ${lightsOn ? 'text-white' : 'text-gray-700'}
                  `}>
                    Living Room
                  </p>
                  
                  {/* Status text (On/Off) */}
                  <p className={`
                    text-[10px] sm:text-xs md:text-sm mt-0.5 transition-colors duration-300
                    ${lightsOn ? 'text-white/90' : 'text-gray-500'}
                  `}>
                    {lightsOn ? 'Lights On' : 'Lights Off'}
                  </p>
                </div>
                
                {/* Subtle inner glow effect when lights are on */}
                {lightsOn && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </button>
            </div>
          </motion.div>

          {/* ===== RIGHT COLUMN: Room Photo ===== */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7"
          >
            {/* 
              Photo Container
              Contains two images that crossfade based on lightsOn state.
              Both images are positioned absolutely to enable smooth opacity transitions.
            */}
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden">
              
              {/* Lights ON image - visible when lightsOn === true */}
              <img
                src="/Curtains-Closed-Lights-On.png"
                alt="Room with lights on"
                className={`
                  absolute inset-0 w-full h-full object-cover 
                  transition-opacity duration-[750ms] ease-out 
                  ${lightsOn ? 'opacity-100' : 'opacity-0'}
                `}
              />
              
              {/* Lights OFF image - visible when lightsOn === false */}
              <img
                src="/Curtains-Closed-Lights-Off.png"
                alt="Room with lights off"
                className={`
                  absolute inset-0 w-full h-full object-cover 
                  transition-opacity duration-[750ms] ease-out 
                  ${lightsOn ? 'opacity-0' : 'opacity-100'}
                `}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
