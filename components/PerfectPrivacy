'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

/**
 * PerfectPrivacy Section Component
 * 
 * Demonstrates smart curtain control with an iOS Control Center-style card.
 * Features:
 * - Auto-triggers curtains opening when section enters viewport (once only)
 * - Video playback for opening/closing transitions
 * - Beautiful gradient animation on toggle (gray → teal when open)
 * - Synchronized video playback with card states
 * - Button ignores clicks during video playback (no visual disabled state)
 * 
 * Layout:
 * - Left column (7/12): Video/photo showing curtain states
 * - Right column (5/12): Heading, description, Control Center card
 * - ALTERNATES from PerfectLight section (which was text left, photo right)
 */
export default function PerfectPrivacy() {
  // Track whether curtains are currently open or closed
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  
  // Track if video is currently playing (used to ignore button clicks)
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Track if we've already auto-triggered the opening (prevent multiple triggers)
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  
  // Reference to the section for intersection observer
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Reference to the video element for playback control
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Auto-trigger Effect
   * Uses IntersectionObserver to detect when section enters viewport.
   * When 30% of section is visible, waits 800ms then plays opening video.
   * Only triggers once (controlled by hasAutoTriggered flag).
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [hasAutoTriggered]);

  /**
   * Play Video Function
   * Handles video playback for opening/closing curtains
   * 
   * @param action - 'opening' or 'closing'
   */
  const playVideo = (action: 'opening' | 'closing') => {
    if (!videoRef.current) return;
    
    setIsPlaying(true); // Mark video as playing (ignores button clicks)
    
    // Set video source based on action
    videoRef.current.src = action === 'opening' 
      ? '/video/curtains-opening.mp4'
      : '/video/curtains-closing.mp4';
    
    // Load and play the video
    videoRef.current.load();
    videoRef.current.play();
  };

  /**
   * Video End Handler
   * Called when video finishes playing
   * Updates state and re-enables button interaction
   */
  const handleVideoEnd = () => {
    setIsPlaying(false); // Video finished, button clicks work again
    
    // Update curtain state based on which video just played
    // If opening video ended → curtains are now open
    // If closing video ended → curtains are now closed
    if (videoRef.current?.src.includes('opening')) {
      setCurtainsOpen(true);
    } else {
      setCurtainsOpen(false);
    }
  };

  /**
   * Toggle Handler
   * Manually toggles curtains open/closed when user clicks the Control Center card
   * Ignores clicks during video playback (no visual feedback, just silently returns)
   */
  const handleToggle = () => {
    // Silently ignore clicks while video is playing
    if (isPlaying) return;
    
    // Play appropriate video based on current state
    if (curtainsOpen) {
      playVideo('closing');
    } else {
      playVideo('opening');
    }
  };

  /**
   * Get display text based on current state
   * Shows "Opening..." or "Closing..." during playback
   * Shows "Curtains Open" or "Curtains Closed" when idle
   */
  const getStatusText = () => {
    if (isPlaying) {
      return videoRef.current?.src.includes('opening') ? 'Opening...' : 'Closing...';
    }
    return curtainsOpen ? 'Curtains Open' : 'Curtains Closed';
  };

  return (
    <section 
      ref={sectionRef} 
      id="perfect-privacy" 
      className="py-20 md:py-28 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* 
          Two-column grid: Video on LEFT, Text + Control on RIGHT
          This ALTERNATES from PerfectLight section (which was text left, photo right)
          Creates visual rhythm following Apple's design pattern
        */}
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* ===== LEFT COLUMN: Video/Photo Display ===== */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7"
          >
            {/* 
              Video/Photo Container
              Shows video during transitions, displays last frame when idle
              Rounded corners and shadow for premium feel
            */}
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
              {/* 
                Video Element
                - Plays opening/closing videos
                - Shows last frame after playback ends (not poster, not static image)
                - No controls (user interacts via card button)
                - Preload metadata for smooth playback
              */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                onEnded={handleVideoEnd}
                playsInline
                preload="metadata"
              >
                <source src="/video/curtains-opening.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* 
                Fallback Image (shown before any video plays)
                Only visible initially, gets replaced by video last frame
              */}
              {!hasAutoTriggered && (
                <img
                  src="/Curtains-Closed-Lights-On.png"
                  alt="Room with curtains closed"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
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
                    ? 'bg-gradient-to-br from-teal-400 via-cyan-400 to-teal-500 shadow-xl shadow-teal-500/20'
                    : 'bg-gray-200 shadow-lg'
                  }
                `}
                aria-label={`Toggle curtains ${curtainsOpen ? 'closed' : 'open'}`}
              >
                {/* Top Row: Icon + Status Indicator */}
                <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                  {/* Curtain/Window icon with background circle */}
                  <div className={`
                    p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-300
                    ${curtainsOpen && !isPlaying
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-white/60'
                    }
                  `}>
                    {/* Window/Curtain icon - using a simple rectangular window shape */}
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
