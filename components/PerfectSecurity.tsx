'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

type SecurityState = 'clear' | 'alert' | 'notification';

/**
 * PerfectSecurity Section Component
 * 
 * Demonstrates instant security notifications with iOS-style rich notification.
 * Features:
 * - Multi-layered synchronized experience (camera pulse + card state + notification)
 * - Authentic doorbell camera thumbnail
 * - Spring physics animations (Apple-style bounce)
 * - Three interactive action buttons with staggered entrance
 * - Auto-triggers when section enters viewport
 * 
 * Layout:
 * - Left column (7/12): Room photo with camera indicator and notification overlay
 * - Right column (5/12): Heading, description, Control Center card
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
   * Simulates answering, unlocking, or dismissing the doorbell alert
   */
  const handleAnswer = () => {
    // In real app, would open video call
    setSecurityState('clear');
  };

  const handleUnlock = () => {
    // In real app, would unlock door
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
   */
  const getCardColors = () => {
    if (securityState === 'alert' || securityState === 'notification') {
      return 'bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 shadow-xl shadow-orange-500/20';
    }
    return 'bg-gray-200 shadow-lg';
  };

  return (
    <section 
      ref={containerRef} 
      id="perfect-security" 
      className="pt-8 pb-20 md:py-28 bg-gray-50"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* ===== LEFT COLUMN: Room Photo with Camera & Notification ===== */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7 order-2 md:order-1"
          >
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
              {/* Base room photo */}
              <img
                src="/Curtains-Open-Lights-On-Homepod.png"
                alt="Smart home with security camera"
                className="w-full h-full object-cover"
              />

              {/* Camera Indicator - positioned near door area */}
              <div className="absolute top-[15%] left-[5%] z-30">
                <motion.div
                  animate={{
                    scale: securityState === 'alert' || securityState === 'notification' ? [1, 1.15, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: securityState === 'alert' || securityState === 'notification' ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className={`
                    w-10 h-10 backdrop-blur-xl rounded-lg shadow-lg border transition-all duration-500
                    ${securityState === 'alert' || securityState === 'notification'
                      ? 'bg-orange-500/30 border-orange-400/50' 
                      : 'bg-white/20 border-white/30'
                    }
                  `}
                >
                  {/* Camera icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg 
                      className={`w-5 h-5 transition-colors duration-500 ${
                        securityState === 'alert' || securityState === 'notification' ? 'text-white' : 'text-gray-400'
                      }`}
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
                  
                  {/* Recording dot indicator */}
                  {(securityState === 'alert' || securityState === 'notification') && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-lg"
                    />
                  )}
                </motion.div>
              </div>

              {/* iOS-Style Rich Notification */}
              <AnimatePresence>
                {securityState === 'notification' && (
                  <motion.div
                    initial={{ opacity: 0, y: -100, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        mass: 0.8
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -80, 
                      scale: 0.95,
                      transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] }
                    }}
                    className="absolute top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[420px]"
                  >
                    {/* Notification Card - Frosted Glass */}
                    <div className="backdrop-blur-2xl bg-white/25 rounded-3xl p-5 border border-white/40 shadow-2xl">
                      
                      {/* Header: App Icon + Title */}
                      <div className="flex items-center gap-3 mb-4">
                        {/* Home App Icon (rounded square) */}
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        
                        {/* Title and timestamp */}
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm">Home</p>
                          <p className="text-white/70 text-xs">Just now</p>
                        </div>

                        {/* HomeKit Secure Video badge */}
                        <div className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                          <p className="text-white/90 text-[10px] font-medium">HomeKit Secure Video</p>
                        </div>
                      </div>

                      {/* Content: Thumbnail + Message */}
                      <div className="flex gap-4 mb-4">
                        {/* Doorbell Camera Thumbnail */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg border-2 border-white/30">
                            <img 
                              src="/doorbell-visitor.png" 
                              alt="Front door camera view"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Message text */}
                        <div className="flex-1 flex flex-col justify-center">
                          <p className="text-white font-semibold text-base leading-tight mb-1">
                            Front Door Camera
                          </p>
                          <p className="text-white/90 text-sm leading-snug">
                            Someone's at your front door
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons - Staggered entrance */}
                      <div className="flex gap-2">
                        {/* Answer Button (Green) */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 25 }}
                          onClick={handleAnswer}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-br from-green-500 to-green-600 
                            text-white font-semibold text-sm shadow-lg
                            hover:scale-[1.02] active:scale-[0.98]
                            transition-transform duration-150"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Answer
                          </div>
                        </motion.button>

                        {/* Unlock Button (Blue) */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.25, type: 'spring', stiffness: 400, damping: 25 }}
                          onClick={handleUnlock}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 
                            text-white font-semibold text-sm shadow-lg
                            hover:scale-[1.02] active:scale-[0.98]
                            transition-transform duration-150"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                            Unlock
                          </div>
                        </motion.button>

                        {/* Dismiss Button (Gray) */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, type: 'spring', stiffness: 400, damping: 25 }}
                          onClick={handleDismiss}
                          className="px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm
                            text-white font-medium text-sm
                            hover:bg-white/30 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-150"
                        >
                          Dismiss
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ===== RIGHT COLUMN: Text + Control Center Card ===== */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5 space-y-6 order-1 md:order-2"
          >
            {/* Section Heading */}
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
              Perfect Security
            </h2>
            
            {/* Description - emphasizing instant notifications */}
            <p className="text-gray-600 text-lg">
              Instant notifications when someone's at your door. Answer, unlock, or dismiss — 
              all from your phone.
            </p>
            
            {/* ===== CONTROL CENTER CARD ===== */}
            <div className="pt-4">
              <button
                onClick={handleCardClick}
                className={`
                  relative overflow-hidden rounded-xl sm:rounded-2xl
                  w-full max-w-[200px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[256px]
                  p-3 sm:p-4 md:p-5 lg:p-6
                  transition-all duration-500 ease-out
                  hover:scale-[1.02] active:scale-[0.98]
                  ${getCardColors()}
                `}
              >
                {/* Top Row: Icon + Status Indicator */}
                <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                  {/* Camera icon */}
                  <div className={`
                    p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-300
                    ${(securityState === 'alert' || securityState === 'notification') 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-white/60'}
                  `}>
                    <svg 
                      className={`
                        w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 
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
                    h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300
                    ${(securityState === 'alert' || securityState === 'notification')
                      ? 'bg-white shadow-lg shadow-white/50' 
                      : 'bg-gray-400'
                    }
                  `} />
                </div>
                
                {/* Bottom Row: Location + Status text */}
                <div className="text-left">
                  <p className={`
                    text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300
                    ${(securityState === 'alert' || securityState === 'notification') 
                      ? 'text-white' 
                      : 'text-gray-700'}
                  `}>
                    Front Door
                  </p>
                  
                  <p className={`
                    text-[10px] sm:text-xs md:text-sm mt-0.5 transition-colors duration-300
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
