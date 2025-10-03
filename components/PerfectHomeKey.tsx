'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeRise } from '@/lib/animations';

type LockState = 'locked' | 'unlocking' | 'unlocked';

/**
 * PerfectHomeKey Section Component - Authentic Apple HomeKey Experience
 * 
 * Showcases Apple HomeKey unlock animation exactly as it appears on iPhone.
 * Features:
 * - Large centered iPhone displaying authentic HomeKey card
 * - Beige/cream card with layered house icon (matches Apple Wallet design)
 * - White pulsing rings during NFC unlock
 * - Green checkmark on success
 * - Screen dims to black when card appears
 * - Synchronized Control Center card below
 * - Auto-triggers when section enters viewport
 * 
 * Layout:
 * - Centered hero layout (like Security section)
 * - Heading and description centered above
 * - Large iPhone (70% width) as focal point
 * - Control Center card centered below
 */
export default function PerfectHomeKey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lockState, setLockState] = useState<LockState>('locked');
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  /**
   * Auto-trigger Effect
   * Unlocks the door when section enters viewport (demo)
   * Only runs once per page load
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
   * Locked → Unlocking (1.2s) → Unlocked (1.5s) → back to Locked
   */
  const triggerUnlock = () => {
    if (lockState !== 'locked') return;
    
    setLockState('unlocking');
    
    // Stay in unlocking state for 1.2 seconds (NFC + rings animation)
    setTimeout(() => {
      setLockState('unlocked');
      
      // Stay unlocked for 1.5 seconds, then relock
      setTimeout(() => {
        setLockState('locked');
      }, 1500);
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
   * Get Control Center card gradient colors based on lock state
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
            Perfect Entry
          </h2>
          
          {/* Description - emphasizing Apple HomeKey and keyless entry */}
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Unlock your home with just your iPhone or Apple Watch. No keys, no codes, 
            no hassle — just tap and you're in.
          </p>
        </motion.div>

        {/* Large Centered iPhone Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {/* iPhone Container - 70% width, centered */}
          <div className="mx-auto w-[85%] md:w-[75%] lg:w-[70%] max-w-[500px]">
            
            {/* iPhone Frame */}
            <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
              
              {/* iPhone Screen */}
              <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-blue-400 via-blue-300 to-orange-200">
                
                {/* Lock Screen Wallpaper (when not unlocking) */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  lockState !== 'locked' ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-orange-200" />
                  
                  {/* Time display */}
                  <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center">
                    <p className="text-white text-7xl font-light tracking-tight">10:05</p>
                    <p className="text-white/80 text-sm mt-2">Tuesday, Jan 17</p>
                  </div>

                  {/* Lock icons at bottom */}
                  <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 flex gap-8">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Black dimmed overlay when HomeKey card appears */}
                <AnimatePresence>
                  {lockState !== 'locked' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-black z-10"
                    />
                  )}
                </AnimatePresence>

                {/* HomeKey Card - Authentic Apple Design */}
                <AnimatePresence>
                  {lockState !== 'locked' && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ 
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[85%]"
                    >
                      {/* Beige/Cream Card - Credit card style */}
                      <div className="relative bg-[#E8E3D8] rounded-2xl aspect-[1.6/1] shadow-2xl p-6 flex flex-col">
                        
                        {/* HomiFi text top-right */}
                        <div className="absolute top-4 right-5">
                          <p className="text-gray-500 text-sm font-medium">HomiFi</p>
                        </div>

                        {/* Layered House Icon - Center */}
                        <div className="flex-1 flex items-center justify-center relative">
                          {/* House icon with concentric layers */}
                          <div className="relative">
                            {/* Outer house layer */}
                            <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>

                            {/* Middle house layer */}
                            <svg className="absolute inset-0 w-24 h-24 text-gray-500" style={{ transform: 'scale(0.75)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>

                            {/* Inner house layer */}
                            <svg className="absolute inset-0 w-24 h-24 text-gray-600" style={{ transform: 'scale(0.5)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>

                            {/* White pulsing rings during unlock (NFC effect) */}
                            {lockState === 'unlocking' && (
                              <>
                                {[...Array(4)].map((_, i) => (
                                  <motion.div
                                    key={`ring-${i}`}
                                    initial={{ scale: 1, opacity: 0 }}
                                    animate={{ 
                                      scale: [1, 2.5],
                                      opacity: [0, 0.8, 0]
                                    }}
                                    transition={{
                                      duration: 1.2,
                                      delay: i * 0.2,
                                      ease: 'easeOut'
                                    }}
                                    className="absolute inset-0 w-24 h-24 rounded-full border-2 border-white"
                                  />
                                ))}
                              </>
                            )}

                            {/* Green checkmark on success */}
                            <AnimatePresence>
                              {lockState === 'unlocked' && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ 
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 20
                                  }}
                                  className="absolute inset-0 flex items-center justify-center"
                                >
                                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subtle screen glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 pointer-events-none" />
              </div>

              {/* iPhone notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-30" />
            </div>
          </div>
        </motion.div>

        {/* Control Center Card - Centered Below iPhone */}
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
            {/* Top Row: Icon + Status Indicator */}
            <div className="flex items-start justify-between mb-3 md:mb-4">
              {/* Lock icon */}
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
                    // Unlocked icon
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M8 11V7a4 4 0 014-4 4 4 0 014 4m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" 
                    />
                  ) : (
                    // Locked icon
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                    />
                  )}
                </svg>
              </div>
              
              {/* Status indicator dot */}
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
            
            {/* Bottom Row: Location + Status text */}
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
            
            {/* Subtle inner glow effect when active */}
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

        {/* Additional info - Apple Wallet integration mention */}
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
