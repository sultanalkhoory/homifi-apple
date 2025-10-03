'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

type LockState = 'locked' | 'unlocking' | 'unlocked';

/**
 * PerfectHomeKey Section Component
 * 
 * Showcases Apple HomeKey integration for keyless entry.
 * Features:
 * - Visual demonstration of iPhone NFC unlock
 * - Animated smart lock with bolt sliding mechanism
 * - NFC rings expanding from iPhone during unlock
 * - Synchronized Control Center card showing lock status
 * - Three states: Locked (gray), Unlocking (blue), Unlocked (green)
 * - Auto-triggers when section enters viewport
 * 
 * Layout:
 * - Left column (5/12): Heading, description, Control Center card
 * - Right column (7/12): Door lock visual with iPhone and NFC animation
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
   * Locked → Unlocking (1s) → Unlocked (2s) → back to Locked
   */
  const triggerUnlock = () => {
    if (lockState !== 'locked') return;
    
    setLockState('unlocking');
    
    // Stay in unlocking state for 1 second (NFC animation time)
    setTimeout(() => {
      setLockState('unlocked');
      
      // Stay unlocked for 2 seconds, then relock
      setTimeout(() => {
        setLockState('locked');
      }, 2000);
    }, 1000);
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

  /**
   * Get lock icon color based on state
   */
  const getLockIconColor = () => {
    if (lockState === 'unlocking') return 'text-blue-500';
    if (lockState === 'unlocked') return 'text-green-500';
    return 'text-gray-600';
  };

  return (
    <>
      {/* Global keyframe animations for NFC rings */}
      <style jsx global>{`
        @keyframes nfcRing {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>

      <section 
        ref={containerRef} 
        id="perfect-homekey" 
        className="pt-8 pb-20 md:py-28 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4">
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
                Perfect Entry
              </h2>
              
              {/* Description - emphasizing Apple HomeKey and keyless entry */}
              <p className="text-gray-600 text-lg">
                Unlock your home with just your iPhone or Apple Watch. No keys, no codes, 
                no hassle — just tap and you're in.
              </p>
              
              {/* ===== CONTROL CENTER CARD ===== */}
              <div className="pt-4">
                <button
                  onClick={handleCardClick}
                  disabled={lockState !== 'locked'}
                  className={`
                    relative overflow-hidden rounded-xl sm:rounded-2xl
                    w-full max-w-[200px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[256px]
                    p-3 sm:p-4 md:p-5 lg:p-6
                    transition-all duration-500 ease-out
                    ${lockState === 'locked' ? 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer' : 'cursor-default'}
                    ${getCardColors()}
                  `}
                >
                  {/* Top Row: Icon + Status Indicator */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                    {/* Lock icon */}
                    <div className={`
                      p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-300
                      ${lockState !== 'locked' ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/60'}
                    `}>
                      <svg 
                        className={`
                          w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 
                          transition-colors duration-300
                          ${lockState !== 'locked' ? 'text-white' : 'text-gray-500'}
                        `}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        {lockState === 'unlocked' ? (
                          // Unlocked icon (open lock)
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M8 11V7a4 4 0 014-4 4 4 0 014 4m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" 
                          />
                        ) : (
                          // Locked icon (closed lock)
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
                      h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300
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
                      text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300
                      ${lockState !== 'locked' ? 'text-white' : 'text-gray-700'}
                    `}>
                      Front Door
                    </p>
                    
                    <p className={`
                      text-[10px] sm:text-xs md:text-sm mt-0.5 transition-colors duration-300
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
              </div>

              {/* Additional info - Apple Wallet integration mention */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Stored securely in Apple Wallet</span>
              </div>
            </motion.div>

            {/* ===== RIGHT COLUMN: Door Lock Visual with iPhone ===== */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-7"
            >
              <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                
                {/* Smart Lock Illustration */}
                <div className="relative">
                  {/* Lock body (cylindrical deadbolt style) */}
                  <div className={`
                    relative w-32 h-48 rounded-2xl transition-all duration-500
                    ${lockState === 'unlocking' 
                      ? 'bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl shadow-blue-500/20' 
                      : lockState === 'unlocked'
                      ? 'bg-gradient-to-br from-green-100 to-green-200 shadow-xl shadow-green-500/20'
                      : 'bg-gradient-to-br from-gray-200 to-gray-300 shadow-xl'
                    }
                  `}>
                    {/* Lock keyhole/display area */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
                        ${lockState === 'unlocking'
                          ? 'bg-blue-500'
                          : lockState === 'unlocked'
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                        }
                      `}>
                        <svg 
                          className="w-8 h-8 text-white transition-transform duration-500" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          strokeWidth={2}
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

                    {/* Lock bolt - slides in/out */}
                    <motion.div
                      animate={{
                        x: lockState === 'unlocked' ? -20 : 0
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                    >
                      <div className={`
                        w-12 h-4 rounded-r-lg transition-colors duration-500
                        ${lockState === 'unlocking'
                          ? 'bg-blue-600'
                          : lockState === 'unlocked'
                          ? 'bg-green-600'
                          : 'bg-gray-500'
                        }
                      `} />
                    </motion.div>
                  </div>

                  {/* Status text below lock */}
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <motion.p
                      key={lockState}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`
                        text-sm font-semibold transition-colors duration-300
                        ${lockState === 'unlocking'
                          ? 'text-blue-600'
                          : lockState === 'unlocked'
                          ? 'text-green-600'
                          : 'text-gray-600'
                        }
                      `}
                    >
                      {getStatusText()}
                    </motion.p>
                  </div>
                </div>

                {/* iPhone positioned near lock */}
                <motion.div
                  animate={{
                    x: lockState === 'unlocking' ? -10 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute -right-12 top-1/2 -translate-y-1/2"
                >
                  {/* iPhone frame */}
                  <div className="relative w-28 h-56 bg-black rounded-[2.5rem] p-2 shadow-2xl">
                    {/* iPhone screen */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[2rem] flex items-center justify-center overflow-hidden">
                      {/* Wallet app icon or HomeKey indicator */}
                      <div className="text-white/80 text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <p className="text-xs font-medium">Home</p>
                      </div>

                      {/* NFC animation rings - only during unlocking */}
                      <AnimatePresence>
                        {lockState === 'unlocking' && (
                          <>
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={`nfc-ring-${i}`}
                                initial={{ scale: 1, opacity: 0 }}
                                animate={{ scale: 2.5, opacity: [0, 0.8, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  duration: 1,
                                  delay: i * 0.2,
                                  ease: 'easeOut'
                                }}
                                className="absolute inset-0 rounded-[2rem] border-4 border-blue-400"
                                style={{
                                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                                }}
                              />
                            ))}
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* iPhone notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-black rounded-b-2xl" />
                  </div>
                </motion.div>

                {/* Success checkmark when unlocked */}
                <AnimatePresence>
                  {lockState === 'unlocked' && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="absolute top-8 left-1/2 -translate-x-1/2"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-xl shadow-green-500/30">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
