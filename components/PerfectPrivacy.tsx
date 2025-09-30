'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

/**
 * PerfectPrivacy Section Component
 * 
 * Simplified curtain control with video-only approach.
 * No static images, no canvas - just clean video playback.
 * 
 * Features:
 * - Auto-plays opening video when section enters viewport (once only)
 * - Video pauses on last frame after playback
 * - Control Center card that matches PerfectLight styling
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
  
  // Reference to the section for intersection observer
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reference to the video element for playback control
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track when section comes into view (once only, 30% threshold)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  /**
   * Auto-trigger Effect
   * When section enters viewport, wait 800ms then play opening video
   * Only triggers once (controlled by hasAutoTriggered flag)
   */
  useEffect(() => {
    if (isInView && !hasAutoTriggered) {
      setTimeout(() => {
        playVideo('opening');
        setHasAutoTriggered(true);
      }, 800);
    }
  }, [isInView, hasAutoTriggered]);

  /**
   * Play Video Function
   * Loads and plays the specified video (opening or closing)
   * 
   * @param action - 'opening' or 'closing'
   */
  const playVideo = (action: 'opening' | 'closing') => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    setIsPlaying(true);
    
    // Set video source
    video.src = action === 'opening' 
      ? '/video/curtains-opening.mp4'
      : '/video/curtains-closing.mp4';
    
    // Load and play
    video.load();
    video.play().catch((error) => {
      console.error('Video play failed:', error);
      setIsPlaying(false);
    });
  };

  /**
   * Video End Handler
   * Called when video finishes playing
   * Updates state and pauses on last frame
   */
  const handleVideoEnd = () => {
    if (!videoRef.current) return;
    
    setIsPlaying(false);
    
    // Update curtain state based on which video just played
    const videoSrc = videoRef.current.src;
    if (videoSrc.includes('opening')) {
      setCurtainsOpen(true);
    } else {
      setCurtainsOpen(false);
    }
    
    // Video naturally pauses on last frame
    // No need to manually set currentTime
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
              Simple container with video element
              Starts with gray background, video appears when loaded
            */}
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-gray-800">
              {/* 
                Video Element
                - Plays opening/closing videos
                - Pauses on last frame after playback
                - No controls (user interacts via card button)
                - Muted for autoplay compatibility
              */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                onEnded={handleVideoEnd}
                muted
                playsInline
                preload="auto"
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
                    ? 'bg-gradient-to-br from-teal-400 via-cyan-400 to-teal-500 shadow-xl shadow-teal-500/20'
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
