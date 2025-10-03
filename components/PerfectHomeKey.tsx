'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeRise } from '@/lib/animations';

type LockState = 'locked' | 'unlocking' | 'unlocked';

/**
 * PerfectHomeKey Section Component - Cinematic Approach Scene
 * 
 * Shows iPhone 17 Pro approaching a smart lock with Dynamic Island unlock animation.
 * Features:
 * - Partial door edge with modern circular smart lock
 * - iPhone 17 Pro with Dynamic Island pill at top
 * - iPhone moves closer to lock when unlocking
 * - Dynamic Island expands showing house icon + "Front Door Unlocked"
 * - White checkmark on success
 * - Synchronized Control Center card below
 * - Auto-triggers when section enters viewport
 * 
 * Layout:
 * - Centered hero layout
 * - Heading and description centered above
 * - Large scene (door + iPhone) as focal point
 * - Control Center card centered below
 */
export default function PerfectHomeKey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lockState, setLockState] = useState<LockState>('locked');
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  /**
   * Auto-trigger Effect
   * Unlocks when section enters viewport
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoTriggered) {
            setTimeout(() => {
              triggerUnlock();
              setHasAutoTriggered(true);
            }, 800);
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
   * Trigger unlock sequence
   */
  const triggerUnlock = () => {
    if (lockState !== 'locked') return;
    
    setLockState('unlocking');
    
    setTimeout(() => {
      setLockState('unlocked');
      
      setTimeout(() => {
        setLockState('locked');
      }, 1800);
    }, 1200);
  };

  /**
   * Handle Control Center card click
   */
  const handleCardClick = () => {
    if (lockState === 'locked') {
      triggerUnlock();
    }
  };

  /**
   * Get status text for Control Center card
   */
  const getStatusText = () => {
    if (lockState === 'unlocking') return 'Unlocking...';
    if (lockState === 'unlocked') return 'Unlocked';
    return 'Locked';
  };

  /**
   * Get Control Center card colors
   */
  const getCardColors = () => {
    if (lockState === 'unlocking') {
      return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-xl shadow-blue-500/15';
    }
    if (lockState === 'unlocked') {
      return 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 shadow-xl shadow-green-500/15';
    }
    return 'bg-gray-200 shadow-lg';
  };

  return (
    <section 
      ref={containerRef} 
      id="perfect-homekey" 
      className="pt-8 pb-20 md:py-28 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Centered Header */}
        <motion.div
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-black mb-6">
            Perfect Entry
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Unlock your home with just a tap. Your iPhone or Apple Watch becomes your key—
            stored securely in Apple Wallet.
          </p>
        </motion.div>

        {/* Main Scene: Door + Lock + iPhone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="mx-auto w-full max-w-4xl">
            
            {/* Scene Container */}
            <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Door Edge (left 35%) */}
              <div className="absolute left-0 top-0 bottom-0 w-[35%] bg-gradient-to-r from-gray-100 to-gray-50 border-r-2 border-gray-200">
                {/* Door texture/grain subtle effect */}
                <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
              </div>

              {/* Smart Lock (circular, modern, Level Lock style) */}
              <div className="absolute left-[28%] top-1/2 -translate-y-1/2 z-20">
                <div className={`
                  w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-500
                  ${lockState === 'unlocking'
                    ? 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-xl shadow-blue-500/40'
                    : lockState === 'unlocked'
                    ? 'bg-gradient-to-br from-green-400 to-green-500 shadow-xl shadow-green-500/40'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 shadow-xl'
                  }
                `}>
                  {/* Lock center indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`
                      w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-500
                      ${lockState === 'unlocking'
                        ? 'bg-blue-600'
                        : lockState === 'unlocked'
                        ? 'bg-green-600'
                        : 'bg-gray-900'
                      }
                    `}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg 
                          className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-500"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          style={{
                            transform: lockState === 'unlocked' ? 'rotate(90deg)' : 'rotate(0deg)'
                          }}
                        >
                          {lockState === 'unlocked' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 014-4 4 4 0 014 4m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          )}
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Subtle glow ring when unlocking/unlocked */}
                  {lockState !== 'locked' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: [0, 0.5, 0], scale: [0.9, 1.3, 1.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`absolute inset-0 rounded-full ${
                        lockState === 'unlocking' ? 'bg-blue-400' : 'bg-green-400'
                      }`}
                      style={{ filter: 'blur(8px)' }}
                    />
                  )}
                </div>
              </div>

              {/* iPhone 17 Pro - Approaching from right */}
              <motion.div
                animate={{
                  x: lockState === 'locked' ? 0 : lockState === 'unlocking' ? -60 : -60,
                  rotate: lockState === 'locked' ? -5 : 0
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-[10%] top-1/2 -translate-y-1/2 z-30"
              >
                {/* iPhone 17 Pro Frame */}
                <div className="relative w-32 md:w-40 lg:w-44">
                  {/* Titanium frame */}
                  <div className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-[2.5rem] md:rounded-[3rem] p-1.5 shadow-2xl">
                    
                    {/* Screen */}
                    <div className="relative aspect-[9/19.5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black">
                      
                      {/* Lock screen wallpaper */}
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-300">
                        {/* Status bar */}
                        <div className="absolute top-12 left-0 right-0 flex justify-between px-6 text-white text-xs font-semibold">
                          <span>9:41</span>
                          <div className="flex gap-1 items-center">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>

                        {/* Time - larger and centered */}
                        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 text-center">
                          <p className="text-white text-5xl md:text-6xl font-light tracking-tight mb-1">10:05</p>
                          <p className="text-white/90 text-sm font-medium">Tuesday, January 17</p>
                        </div>

                        {/* Bottom actions */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-16">
                          {/* Flashlight */}
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          
                          {/* Camera */}
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        </div>

                        {/* Swipe up indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                          <div className="w-32 h-1 bg-white/60 rounded-full" />
                        </div>
                      </div>

                      {/* Dynamic Island at top - MUCH SMALLER */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40">
                        <motion.div
                          animate={{
                            width: lockState === 'locked' ? '50px' : '120px',
                            height: lockState === 'locked' ? '18px' : '36px'
                          }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="bg-black rounded-full flex items-center justify-center overflow-hidden relative"
                        >
                          {/* Idle state - just pill */}
                          {lockState === 'locked' && (
                            <div className="w-full h-full" />
                          )}

                          {/* Expanded state - show unlock notification */}
                          <AnimatePresence>
                            {lockState !== 'locked' && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-1.5 px-2"
                              >
                                {/* House icon or checkmark */}
                                {lockState === 'unlocking' ? (
                                  <svg className="w-3 h-3 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                  </svg>
                                ) : (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                  >
                                    <svg className="w-3 h-3 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </motion.div>
                                )}

                                {/* Text */}
                                <motion.span
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="text-white text-[9px] md:text-[10px] font-medium whitespace-nowrap"
                                >
                                  {lockState === 'unlocking' ? 'Unlocking...' : 'Unlocked'}
                                </motion.span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>

                      {/* Screen glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* Control Center Card Below */}
        <motion.div
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center"
        >
          <button
            onClick={handleCardClick}
            disabled={lockState !== 'locked'}
            className={`
              relative overflow-hidden rounded-xl sm:rounded-2xl
              w-full max-w-[200px] sm:max-w-[220px] md:max-w-[260px]
              p-4 sm:p-5 md:p-6
              transition-all duration-500 ease-out
              ${lockState === 'locked' ? 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer' : 'cursor-default'}
              ${getCardColors()}
            `}
          >
            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div className={`
                p-2 md:p-3 rounded-full transition-all duration-300
                ${lockState !== 'locked' ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/60'}
              `}>
                <svg 
                  className={`
                    w-6 h-6 md:w-7 md:h-7 
                    transition-colors duration-300
                    ${lockState !== 'locked' ? 'text-white' : 'text-gray-500'}
                  `}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  {lockState === 'unlocked' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 014-4 4 4 0 014 4m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  )}
                </svg>
              </div>
              
              <div className={`
                h-2 w-2 rounded-full transition-all duration-300
                ${lockState === 'unlocked' 
                  ? 'bg-white shadow-lg shadow-white/50' 
                  : lockState === 'unlocking'
                  ? 'bg-white shadow-lg shadow-white/50 animate-pulse'
                  : 'bg-gray-400'
                }
              `} />
            </div>
            
            <div className="text-left">
              <p className={`
                text-sm md:text-base font-semibold transition-colors duration-300
                ${lockState !== 'locked' ? 'text-white' : 'text-gray-700'}
              `}>
                Front Door
              </p>
              
              <p className={`
                text-xs md:text-sm mt-0.5 transition-colors duration-300
                ${lockState !== 'locked' ? 'text-white/90' : 'text-gray-500'}
              `}>
                {getStatusText()}
              </p>
            </div>
            
            {lockState !== 'locked' && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </button>
        </motion.div>

        {/* Apple Wallet Badge */}
        <motion.div
          variants={fadeRise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Stored securely in Apple Wallet</span>
        </motion.div>
      </div>
    </section>
  );
}
