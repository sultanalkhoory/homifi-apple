'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeRise } from '@/lib/animations';

type SecurityState = 'clear' | 'alert' | 'notification';

/**
 * PerfectSecurity Section Component - Hero TV Edition
 * 
 * Cinematic centered layout showcasing instant security notifications on Apple TV.
 * Features:
 * - Large floating TV with ultra-thin sharp bezels
 * - Apple TV UI displayed on screen
 * - Compact notification (40% TV width, 60% mobile) slides from top-right
 * - Two action buttons: Unlock and Dismiss (no Answer on Apple TV)
 * - Liquid glass appearance from start (no transparency fade)
 * - Smooth exit animations with consistent easing
 * - Muted Apple-style blue for alert state
 * - Responsive sizing optimized for mobile (98% width for grand feel)
 * - Synchronized Control Center card below
 * - Auto-triggers when section enters viewport
 * 
 * Layout:
 * - Centered hero layout
 * - Heading and description centered above
 * - Large TV (98% mobile, 85% tablet, 75% desktop) as focal point
 * - Control Center card centered below
 */
export default function PerfectSecurity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [securityState, setSecurityState] = useState<SecurityState>('clear');
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  /**
   * Auto-trigger Effect
   * Detects when section enters viewport and triggers security alert sequence
   * Only runs once per page load
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoTriggered) {
            setTimeout(() => {
              // Start alert sequence: clear → alert → notification
              setSecurityState('alert');
              
              // Show notification 600ms after alert starts
              setTimeout(() => {
                setSecurityState('notification');
              }, 600);
              
              setHasAutoTriggered(true);
            }, 800); // Initial delay for dramatic effect
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoTriggered]);

  /**
   * Handle Control Center card click
   * Manual trigger for security alert sequence
   */
  const handleCardClick = () => {
    if (securityState === 'clear') {
      setSecurityState('alert');
      setTimeout(() => {
        setSecurityState('notification');
      }, 600);
    } else if (securityState === 'notification') {
      // Clicking during notification dismisses it
      handleDismiss();
    }
  };

  /**
   * Handle notification action buttons
   * Apple TV only supports Unlock and Dismiss (no video call/Answer button)
   */
  const handleUnlock = () => {
    // In real app, would unlock door via HomeKit
    setSecurityState('clear');
  };

  const handleDismiss = () => {
    setSecurityState('clear');
  };

  /**
   * Get status text for Control Center card
   */
  const getStatusText = () => {
    if (securityState === 'alert' || securityState === 'notification') {
      return 'Visitor Detected';
    }
    return 'All Clear';
  };

  /**
   * Get Control Center card gradient colors based on state
   * Muted Apple-style blue for alert state
   */
  const getCardColors = () => {
    if (securityState === 'alert' || securityState === 'notification') {
      return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-xl shadow-blue-500/15';
    }
    return 'bg-gray-200 shadow-lg';
  };

  return (
    <section 
      ref={containerRef} 
      id="perfect-security" 
      className="pt-8 pb-20 md:py-28 bg-gray-50"
    >
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Centered Header Section */}
        <motion.div
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          {/* Section Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-black mb-6">
            Perfect Security
          </h2>
          
          {/* Description - emphasizing instant notifications */}
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Instant notifications when someone's at your door. Unlock remotely or dismiss — 
            all from your Apple TV, iPhone, or iPad.
          </p>
        </motion.div>

        {/* Large Centered TV Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {/* TV Container - 98% mobile (grand), 85% tablet, 75% desktop */}
          <div className="mx-auto w-[98%] md:w-[85%] lg:w-[75%]">
            
            {/* TV Frame with ultra-thin sharp bezels (no rounding) */}
            <div className="relative bg-black rounded-none p-[3px] md:p-1 shadow-2xl">
              
              {/* TV Screen - sharp corners */}
              <div className="relative aspect-[16/9] rounded-none overflow-hidden bg-black">
                
                {/* Apple TV UI Background */}
                <img
                  src="/apple-tv-ui.png"
                  alt="Apple TV Home Screen"
                  className="w-full h-full object-cover"
                />

                {/* Subtle screen glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 pointer-events-none" />

                {/* Compact Notification - Liquid glass from start, slides from top-right */}
                <AnimatePresence>
                  {securityState === 'notification' && (
                    <motion.div
                      // Fast, smooth entrance and exit with consistent easing (no springs)
                      initial={{ y: -100, x: 20 }}
                      animate={{ 
                        y: 0, 
                        x: 0,
                        transition: {
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1] // Apple's ease-out
                        }
                      }}
                      exit={{ 
                        y: -100, 
                        x: 20,
                        transition: { 
                          duration: 0.2, 
                          ease: [0.4, 0, 1, 1] // Fast ease-in for snappy exit
                        }
                      }}
                      className="absolute top-3 right-3 md:top-6 md:right-6 z-40 w-[40%]"
                    >
                      {/* Notification Card - Full liquid glass from start, compact on mobile */}
                      <div className="backdrop-blur-2xl bg-white/30 rounded-2xl p-2.5 md:p-4 border border-white/50 shadow-2xl">
                        
                        {/* Header: App Icon + Title (smaller text on mobile) */}
                        <div className="flex items-center gap-2 mb-2.5 md:mb-3">
                          {/* Home App Icon (smaller on mobile) */}
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md flex-shrink-0">
                            <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          
                          {/* Title and timestamp (smaller on mobile) */}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-[10px] md:text-sm truncate">Home</p>
                            <p className="text-white/80 text-[9px] md:text-xs">Just now</p>
                          </div>
                        </div>

                        {/* Content: Thumbnail + Message (text hidden on mobile, smaller thumbnail) */}
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-2.5 md:mb-3">
                          {/* Doorbell Camera Thumbnail - Smaller on mobile */}
                          <div className="flex-shrink-0 mx-auto sm:mx-0">
                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-lg border-2 border-white/40">
                              <img 
                                src="/doorbell-visitor.png" 
                                alt="Front door camera view"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Message text - Hidden on mobile, visible on sm+ */}
                          <div className="hidden sm:flex flex-1 flex-col justify-center text-left">
                            <p className="text-white font-semibold text-sm md:text-base leading-tight mb-1">
                              Front Door
                            </p>
                            <p className="text-white/95 text-xs md:text-sm leading-snug">
                              Someone's at your door
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons - Icon-only horizontal on mobile, full buttons on desktop */}
                        <div className="flex gap-2">
                          {/* Unlock Button - Icon only on mobile, full on desktop */}
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15, type: 'spring', stiffness: 380, damping: 25 }}
                            onClick={handleUnlock}
                            className="flex-1 py-2 md:py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 
                              text-white font-semibold text-sm md:text-base shadow-lg
                              hover:scale-[1.02] active:scale-[0.98]
                              transition-transform duration-150"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                              </svg>
                              <span className="hidden sm:inline">Unlock Door</span>
                            </div>
                          </motion.button>

                          {/* Dismiss Button - Icon only on mobile, full on desktop */}
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 380, damping: 25 }}
                            onClick={handleDismiss}
                            className="flex-1 sm:flex-shrink-0 py-2 md:py-3 sm:px-5 rounded-xl bg-white/25 backdrop-blur-sm
                              text-white font-semibold text-sm md:text-base
                              hover:bg-white/35 hover:scale-[1.02] active:scale-[0.98]
                              transition-all duration-150"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span className="hidden sm:inline">Dismiss</span>
                            </div>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Control Center Card - Centered Below TV */}
        <motion.div
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center"
        >
          <button
            onClick={handleCardClick}
            className={`
              relative overflow-hidden rounded-xl sm:rounded-2xl
              w-full max-w-[200px] sm:max-w-[220px] md:max-w-[260px]
              p-4 sm:p-5 md:p-6
              transition-all duration-500 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              ${getCardColors()}
            `}
          >
            {/* Top Row: Icon + Status Indicator */}
            <div className="flex items-start justify-between mb-3 md:mb-4">
              {/* Camera icon */}
              <div className={`
                p-2 md:p-3 rounded-full transition-all duration-300
                ${(securityState === 'alert' || securityState === 'notification') 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'bg-white/60'}
              `}>
                <svg 
                  className={`
                    w-6 h-6 md:w-7 md:h-7
                    transition-colors duration-300
                    ${(securityState === 'alert' || securityState === 'notification') 
                      ? 'text-white' 
                      : 'text-gray-500'}
                  `}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              
              {/* Status indicator dot */}
              <div className={`
                h-2 w-2 rounded-full transition-all duration-300
                ${(securityState === 'alert' || securityState === 'notification')
                  ? 'bg-white shadow-lg shadow-white/50' 
                  : 'bg-gray-400'
                }
              `} />
            </div>
            
            {/* Bottom Row: Location + Status text */}
            <div className="text-left">
              <p className={`
                text-sm md:text-base font-semibold transition-colors duration-300
                ${(securityState === 'alert' || securityState === 'notification') 
                  ? 'text-white' 
                  : 'text-gray-700'}
              `}>
                Front Door
              </p>
              
              <p className={`
                text-xs md:text-sm mt-0.5 transition-colors duration-300
                ${(securityState === 'alert' || securityState === 'notification') 
                  ? 'text-white/90' 
                  : 'text-gray-500'}
              `}>
                {getStatusText()}
              </p>
            </div>
            
            {/* Subtle inner glow effect when active */}
            {(securityState === 'alert' || securityState === 'notification') && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
