'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

type SecurityState = 'clear' | 'motion' | 'visitor';

export default function PerfectSecurity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [securityState, setSecurityState] = useState<SecurityState>('clear');
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  // Auto-trigger effect using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoTriggered) {
            setTimeout(() => {
              // Trigger sequence: clear → motion → visitor → clear
              setSecurityState('motion');
              
              setTimeout(() => {
                setSecurityState('visitor');
                
                setTimeout(() => {
                  setSecurityState('clear');
                }, 2000);
              }, 2000);
              
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

  const handleCardClick = () => {
    // Cycle through states
    if (securityState === 'clear') {
      setSecurityState('motion');
    } else if (securityState === 'motion') {
      setSecurityState('visitor');
    } else {
      setSecurityState('clear');
    }
  };

  const getStatusText = () => {
    switch (securityState) {
      case 'motion': return 'Motion Detected';
      case 'visitor': return 'Visitor at Door';
      default: return 'All Clear';
    }
  };

  const getCardColors = () => {
    switch (securityState) {
      case 'motion':
        return 'bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 shadow-xl shadow-blue-500/20';
      case 'visitor':
        return 'bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 shadow-xl shadow-orange-500/20';
      default:
        return 'bg-gray-200 shadow-lg';
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="perfect-security" 
      className="pt-8 pb-20 md:py-28 bg-gray-50"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* ===== LEFT COLUMN: Room Photo with Camera Overlay ===== */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7 order-2 md:order-1"
          >
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/Curtains-Open-Lights-On-Homepod.png"
                alt="Smart home with security camera"
                className="w-full h-full object-cover"
              />

              {/* Doorbell Camera Icon */}
              <div className="absolute top-[15%] left-[5%] z-30">
                <motion.div
                  animate={{
                    scale: securityState === 'motion' || securityState === 'visitor' ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: securityState === 'motion' || securityState === 'visitor' ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className={`
                    w-10 h-10 backdrop-blur-xl rounded-lg shadow-lg border transition-all duration-500
                    ${securityState === 'motion' 
                      ? 'bg-blue-500/30 border-blue-400/50' 
                      : securityState === 'visitor'
                      ? 'bg-orange-500/30 border-orange-400/50'
                      : 'bg-white/20 border-white/30'
                    }
                  `}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg 
                      className={`w-5 h-5 transition-colors duration-500 ${
                        securityState === 'motion' || securityState === 'visitor' ? 'text-white' : 'text-gray-400'
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
                  {(securityState === 'motion' || securityState === 'visitor') && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                    />
                  )}
                </motion.div>
              </div>

              {/* Visitor Notification Overlay */}
              <AnimatePresence>
                {securityState === 'visitor' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-6 right-6 z-40"
                  >
                    <div className="backdrop-blur-xl bg-white/20 rounded-2xl p-4 border border-white/30 shadow-xl min-w-[200px]">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-500/30 border border-orange-400/50 flex items-center justify-center flex-shrink-0">
                          <svg 
                            className="w-5 h-5 text-white"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm">Front Door</p>
                          <p className="text-white/90 text-xs mt-0.5">Someone's at the door</p>
                        </div>
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
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
              Perfect Security
            </h2>
            
            <p className="text-gray-600 text-lg">
              Know who's at your door. Clear video. Instant alerts.
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
                  <div className={`
                    p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-300
                    ${securityState !== 'clear' ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/60'}
                  `}>
                    <svg 
                      className={`
                        w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 
                        transition-colors duration-300
                        ${securityState !== 'clear' ? 'text-white' : 'text-gray-500'}
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
                  
                  <div className={`
                    h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300
                    ${securityState !== 'clear'
                      ? 'bg-white shadow-lg shadow-white/50' 
                      : 'bg-gray-400'
                    }
                  `} />
                </div>
                
                {/* Bottom Row: Location + Status text */}
                <div className="text-left">
                  <p className={`
                    text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300
                    ${securityState !== 'clear' ? 'text-white' : 'text-gray-700'}
                  `}>
                    Front Door
                  </p>
                  
                  <p className={`
                    text-[10px] sm:text-xs md:text-sm mt-0.5 transition-colors duration-300
                    ${securityState !== 'clear' ? 'text-white/90' : 'text-gray-500'}
                  `}>
                    {getStatusText()}
                  </p>
                </div>
                
                {/* Subtle inner glow effect */}
                {securityState !== 'clear' && (
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
