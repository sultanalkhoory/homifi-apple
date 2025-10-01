'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

/**
 * PerfectPrivacy Section Component
 * 
 * Simplified curtain control with video-only approach.
 * Uses dual video elements for smooth transitions without black flash.
 * 
 * Features:
 * - Auto-plays opening video when section enters viewport (once only)
 * - Smooth video transitions with no black flash
 * - Control Center card with muted teal gradient
 * - Button ignores clicks during video playback (silently)
 * 
 * Layout:
 * - Left column (7/12): Video showing curtain states
 * - Right column (5/12): Heading, description, Control Center card
 * - ALTERNATES from PerfectLight section (video left, text right)
 */
export default function PerfectPrivacy() {
  // Track whether curtains are currently open or closed
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  
  // Track if video is currently playing (used to ignore button clicks)
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Track if we've already auto-triggered the opening (prevent multiple triggers)
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  
  // Track which video is currently visible (for smooth crossfade)
  const [activeVideo, setActiveVideo] = useState<'opening' | 'closing' | null>(null);
  
  // Reference to the section for intersection observer
  const containerRef = useRef<HTMLDivElement>(null);
  
  // References to both video elements for seamless switching
  const openingVideoRef = useRef<HTMLVideoElement>(null);
  const closingVideoRef = useRef<HTMLVideoElement>(null);

  /**
   * Auto-trigger Effect using IntersectionObserver
   * When section enters viewport, wait 800ms then play opening video
   * Only triggers once (controlled by hasAutoTriggered flag)
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger if section is visible AND we haven't triggered before
          if (entry.isIntersecting && !hasAutoTriggered) {
            // Delay the curtains opening for dramatic effect
            setTimeout(() => {
              playVideo('opening');
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [hasAutoTriggered]); // Only re-run if hasAutoTriggered changes

  /**
   * Play Video Function
   * Plays the specified video (opening or closing) smoothly
   * 
   * @param action - 'opening' or 'closing'
   */
  const playVideo = (action: 'opening' | 'closing') => {
    const video = action === 'opening' ? openingVideoRef.current : closingVideoRef.current;
    if (!video) return;
    
    setIsPlaying(true);
    setActiveVideo(action);
    
    // Reset video to start and play
    video.currentTime = 0;
    video.play().catch((error) => {
      console.error('Video play failed:', error);
      setIsPlaying(false);
    });
  };

  /**
   * Video End Handler
   * Called when video finishes playing
   * Updates state
   */
  const handleVideoEnd = (action: 'opening' | 'closing') => {
    setIsPlaying(false);
    
    // Update curtain state based on which video just played
    if (action === 'opening') {
      setCurtainsOpen(true);
    } else {
      setCurtainsOpen(false);
    }
  };

  /**
   * Toggle Handler
   * User clicks Control Center card to open/close curtains
   * Silently ignores clicks during video playback (no visual feedback)
   */
  const handleToggle = () => {
    // Silently ignore clicks while video is playing
    if (isPlaying) return;
    
    // Play appropriate video based on current state
    playVideo(curtainsOpen ? 'closing' : 'opening');
  };

  /**
   * Get Status Text for Card
   * Shows current state or animating state
   */
  const getStatusText = () => {
    if (isPlaying) {
      return curtainsOpen ? 'Closing...' : 'Opening...';
    }
    return curtainsOpen ? 'Curtains Open' : 'Curtains Closed';
  };

  return (
    <section 
      ref={containerRef} 
      id="perfect-privacy" 
      className="py-20 md:py-28 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Two-column grid: Video LEFT, Text + Control RIGHT */}
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* ===== LEFT COLUMN: Video Display ===== */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7"
          >
            {/* 
              Video Container
              Contains both videos, switches visibility smoothly
            */}
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-gray-800">
              {/* Opening video */}
              <video
                ref={openingVideoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  activeVideo === 'opening' ? 'opacity-100' : 'opacity-0'
                }`}
                onEnded={() => handleVideoEnd('opening')}
                muted
                playsInline
                preload="auto"
                src="/video/curtains-opening.mp4"
              />
              
              {/* Closing video */}
              <video
                ref={closingVideoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  activeVideo === 'closing' ? 'opacity-100' : 'opacity-0'
                }`}
                onEnded={() => handleVideoEnd('closing')}
                muted
                playsInline
                preload="auto"
                src="/video/curtains-closing.mp4"
              />
            </div>
          </motion.div>

          {/* ===== RIGHT COLUMN: Text + Control Center Card ===== */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5 space-y-6"
          >
            {/* Section Heading */}
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
              Perfect Privacy
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-lg">
              Smart curtains that adapt to your day. Open for morning light, close for movie nights.
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
                  ${curtainsOpen && !isPlaying
                    ? 'bg-gradient-to-br from-cyan-600 via-teal-600 to-cyan-700 shadow-xl shadow-teal-500/20'
                    : 'bg-gray-200 shadow-lg'
                  }
                `}
                aria-label={`Toggle curtains ${curtainsOpen ? 'closed' : 'open'}`}
              >
                {/* Top Row: Icon + Status Indicator */}
                <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                  {/* Window icon with background circle */}
                  <div className={`
                    p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-300
                    ${curtainsOpen && !isPlaying
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-white/60'
                    }
                  `}>
                    <svg 
                      className={`
                        w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 
                        transition-colors duration-300
                        ${curtainsOpen && !isPlaying ? 'text-white' : 'text-gray-500'}
                      `}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 6h16M4 12h16M4 18h16" 
                      />
                    </svg>
                  </div>
                  
                  {/* Status indicator dot (top-right corner) */}
                  <div className={`
                    h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300
                    ${curtainsOpen && !isPlaying
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
                    ${curtainsOpen && !isPlaying ? 'text-white' : 'text-gray-700'}
                  `}>
                    Living Room
                  </p>
                  
                  {/* Status text (Open/Closed/Opening.../Closing...) */}
                  <p className={`
                    text-[10px] sm:text-xs md:text-sm mt-0.5 transition-colors duration-300
                    ${curtainsOpen && !isPlaying ? 'text-white/90' : 'text-gray-500'}
                  `}>
                    {getStatusText()}
                  </p>
                </div>
                
                {/* Subtle inner glow effect when curtains are open */}
                {curtainsOpen && !isPlaying && (
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
        </div>
      </div>
    </section>
  );
}
