'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

/**
 * PerfectClimate Section Component
 * 
 * Demonstrates smart climate control with animated temperature effects.
 * Features:
 * - Auto-triggers cooling animation when section enters viewport (26° → 22°)
 * - Control Center card with 3 modes (Cool/Comfort/Warm)
 * - Animated thermostat display on wall in photo
 * - Dynamic air flow effects and particles based on temperature mode
 * 
 * Layout:
 * - Left column (5/12): Heading, description, Control Center card
 * - Right column (7/12): Room photo with animated effects
 */
export default function PerfectClimate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [temperature, setTemperature] = useState(26);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  // Determine current mode based on temperature
  const getMode = () => {
    if (temperature <= 20) return 'cool';
    if (temperature >= 24) return 'warm';
    return 'comfort';
  };

  const mode = getMode();

  /**
   * Auto-trigger Effect using IntersectionObserver
   * When section enters viewport, animates from 26° down to 22° (comfort mode)
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoTriggered) {
            setTimeout(() => {
              animateToTemperature(22);
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
   * Animate temperature change with counting effect
   */
  const animateToTemperature = (targetTemp: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const current = temperature;
    const steps = Math.abs(targetTemp - current);
    const direction = targetTemp > current ? 1 : -1;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const newTemp = current + direction * step;
      setTemperature(newTemp);

      if (step >= steps) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 400);
  };

  /**
   * Handle mode button clicks
   */
  const handleModeChange = (targetMode: 'cool' | 'comfort' | 'warm') => {
    if (isAnimating) return;
    
    const targetTemp = targetMode === 'cool' ? 18 : targetMode === 'warm' ? 26 : 22;
    if (targetTemp !== temperature) {
      animateToTemperature(targetTemp);
    }
  };

  /**
   * Get colors for effects based on temperature
   */
  const getEffectColors = () => {
    if (temperature >= 24) {
      return {
        primary: 'rgba(255, 193, 7, 0.1)',
        secondary: 'rgba(255, 152, 0, 0.15)',
        particle: 'bg-orange-200',
      };
    } else if (temperature <= 20) {
      return {
        primary: 'rgba(59, 130, 246, 0.18)',
        secondary: 'rgba(96, 165, 250, 0.25)',
        particle: 'bg-blue-200',
      };
    } else {
      return {
        primary: 'rgba(156, 163, 175, 0.15)',
        secondary: 'rgba(209, 213, 219, 0.2)',
        particle: 'bg-gray-200',
      };
    }
  };

  const colors = getEffectColors();

  /**
   * Get status text for card
   */
  const getStatusText = () => {
    if (isAnimating) {
      if (mode === 'cool') return 'Cooling...';
      if (mode === 'warm') return 'Warming...';
      return 'Adjusting...';
    }
    if (mode === 'cool') return 'Cool Mode';
    if (mode === 'warm') return 'Warm Mode';
    return 'Comfort Mode';
  };

  return (
    <>
      {/* Keyframe animations for air flow and particles */}
      <style jsx global>{`
        @keyframes airFlow {
          0% {
            transform: translateX(-80px) translateY(5px) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(300px) translateY(-15px) scale(1.1);
            opacity: 0;
          }
        }
        @keyframes particleFloat {
          0% {
            transform: translateX(-20px) translateY(10px);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(200px) translateY(-20px);
            opacity: 0;
          }
        }
        @keyframes sunbeamSubtle {
          0% {
            opacity: 0;
            transform: rotate(-3deg) translateY(10px);
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: rotate(3deg) translateY(-10px);
          }
        }
      `}</style>

      <section 
        ref={containerRef} 
        id="perfect-climate" 
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
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                Perfect Climate
              </h2>
              
              <p className="text-gray-600 text-lg">
                The perfect temperature, automatically. Always comfortable, exactly as you want it.
              </p>
              
              {/* ===== CONTROL CENTER CARD ===== */}
              <div className="pt-4">
                <div
                  className={`
                    relative overflow-hidden
                    rounded-xl sm:rounded-2xl
                    w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px]
                    p-4 sm:p-5 md:p-6 lg:p-7
                    transition-all duration-500 ease-out
                    ${mode === 'cool'
                      ? 'bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 shadow-xl shadow-blue-500/20'
                      : mode === 'warm'
                      ? 'bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 shadow-xl shadow-orange-500/20'
                      : 'bg-gray-200 shadow-lg'
                    }
                  `}
                >
                  {/* Temperature Display */}
                  <div className="text-center mb-4 sm:mb-5 md:mb-6">
                    <motion.div 
                      key={temperature}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`text-5xl sm:text-6xl md:text-7xl font-bold transition-colors duration-300 ${
                        mode === 'cool' || mode === 'warm' ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {temperature}°
                    </motion.div>
                    <p className={`text-xs sm:text-sm mt-2 transition-colors duration-300 ${
                      mode === 'cool' || mode === 'warm' ? 'text-white/90' : 'text-gray-500'
                    }`}>
                      {getStatusText()}
                    </p>
                  </div>

                  {/* Mode Buttons */}
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleModeChange('cool')}
                      disabled={isAnimating}
                      className={`
                        px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                        transition-all duration-300
                        ${mode === 'cool'
                          ? 'bg-white/25 text-white backdrop-blur-sm'
                          : 'bg-white/10 text-white/70 hover:bg-white/15'
                        }
                        ${isAnimating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      `}
                    >
                      Cool
                    </button>
                    
                    <button
                      onClick={() => handleModeChange('comfort')}
                      disabled={isAnimating}
                      className={`
                        px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                        transition-all duration-300
                        ${mode === 'comfort'
                          ? mode === 'cool' || mode === 'warm'
                            ? 'bg-white/25 text-white backdrop-blur-sm'
                            : 'bg-white text-gray-700'
                          : mode === 'cool' || mode === 'warm'
                          ? 'bg-white/10 text-white/70 hover:bg-white/15'
                          : 'bg-white/60 text-gray-600 hover:bg-white/80'
                        }
                        ${isAnimating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      `}
                    >
                      Comfort
                    </button>
                    
                    <button
                      onClick={() => handleModeChange('warm')}
                      disabled={isAnimating}
                      className={`
                        px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                        transition-all duration-300
                        ${mode === 'warm'
                          ? 'bg-white/25 text-white backdrop-blur-sm'
                          : 'bg-white/10 text-white/70 hover:bg-white/15'
                        }
                        ${isAnimating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      `}
                    >
                      Warm
                    </button>
                  </div>

                  {/* Subtle inner glow effect */}
                  {(mode === 'cool' || mode === 'warm') && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              </div>
            </motion.div>

            {/* ===== RIGHT COLUMN: Room Photo with Effects ===== */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-7"
            >
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                {/* Room photo */}
                <img
                  src="/Curtains-Open-Lights-On-Homepod.png"
                  alt="Smart climate controlled room"
                  className="w-full h-full object-cover"
                />

                {/* Dynamic Effects Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* Air streams */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`airstream-${i}`}
                      className="absolute"
                      style={{
                        top: `${15 + i * 18}%`,
                        left: mode === 'cool' ? '-20%' : undefined,
                        right: mode === 'warm' ? '-20%' : undefined,
                        width: '300px',
                        height: '4px',
                        background: `linear-gradient(90deg,
                          transparent 0%,
                          ${colors.primary} 30%,
                          ${colors.secondary} 70%,
                          transparent 100%
                        )`,
                        animation: `${
                          mode === 'cool' ? 'airFlow' : 'sunbeamSubtle'
                        } ${8 + i * 0.8}s ease-in-out infinite ${i * 1.5}s`,
                        filter: 'blur(2px)',
                      }}
                    />
                  ))}

                  {/* Particles */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={`particle-${i}`}
                      className={`absolute w-1 h-1 ${colors.particle} rounded-full opacity-40`}
                      style={{
                        left: `${20 + (i % 3) * 25}%`,
                        top: `${25 + (i % 2) * 20}%`,
                        animation: `particleFloat ${4 + i * 0.4}s ease-in-out infinite ${i * 0.7}s`,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Wall-mounted thermostat display */}
                <div className="absolute top-[12%] left-[8%] z-30">
                  <div className="relative">
                    <div className="w-12 h-12 backdrop-blur-xl bg-white/20 rounded-full shadow-lg border border-white/30">
                      <div
                        className="absolute inset-0.5 rounded-full border transition-all duration-500"
                        style={{
                          borderColor:
                            mode === 'cool'
                              ? 'rgba(59, 130, 246, 0.6)'
                              : mode === 'warm'
                              ? 'rgba(245, 158, 11, 0.6)'
                              : 'rgba(107, 114, 128, 0.6)',
                          boxShadow:
                            mode === 'cool'
                              ? '0 0 8px rgba(59, 130, 246, 0.3)'
                              : mode === 'warm'
                              ? '0 0 8px rgba(245, 158, 11, 0.3)'
                              : '0 0 8px rgba(107, 114, 128, 0.2)',
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div 
                          key={temperature}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm font-medium text-white"
                        >
                          {temperature}°
                        </motion.div>
                      </div>
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
