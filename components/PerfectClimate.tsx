'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

/**
 * PerfectClimate Section Component
 * 
 * Interactive climate control demonstration with animated airflow effects.
 * Features:
 * - Three climate modes: Cool (18°C), Comfort (22°C), Warm (26°C)
 * - Animated temperature transitions with "warming/cooling" status
 * - Realistic airflow animations concentrated in upper 45% of image (near AC vents)
 * - Visual particles and streams that change color based on temperature mode
 * - Auto-triggers to Comfort mode (22°C) when section enters viewport
 * 
 * Layout:
 * - Left column (5/12): Heading, description, Control Center card with mode buttons
 * - Right column (7/12): Room photo with animated climate effects overlay
 */
export default function PerfectClimate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Temperature state (18°C - 26°C range)
  const [temperature, setTemperature] = useState(26);
  
  // Animation state tracking
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingDirection, setAnimatingDirection] = useState<'warming' | 'cooling' | null>(null);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  /**
   * Determine climate mode based on current temperature
   * Cool: ≤20°C, Comfort: 21-23°C, Warm: ≥24°C
   */
  const getMode = () => {
    if (temperature <= 20) return 'cool';
    if (temperature >= 24) return 'warm';
    return 'comfort';
  };

  const mode = getMode();

  /**
   * Auto-trigger Effect
   * Uses IntersectionObserver to animate to Comfort mode when section enters viewport
   * Only triggers once per page load
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoTriggered) {
            setTimeout(() => {
              animateToTemperature(22); // Auto-transition to Comfort mode
              setHasAutoTriggered(true);
            }, 800); // 800ms delay for dramatic effect
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% visible
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoTriggered]);

  /**
   * Animate temperature change with step-by-step progression
   * Creates smooth counting animation from current temp to target temp
   * Updates every 400ms for visible number changes
   */
  const animateToTemperature = (targetTemp: number) => {
    // Clear any existing animation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (isAnimating) {
      setIsAnimating(false);
    }
    
    setIsAnimating(true);

    const current = temperature;
    const steps = Math.abs(targetTemp - current);
    const direction = targetTemp > current ? 1 : -1;
    
    // Set status text based on direction
    setAnimatingDirection(direction > 0 ? 'warming' : 'cooling');

    let step = 0;
    intervalRef.current = setInterval(() => {
      step++;
      const newTemp = current + direction * step;
      setTemperature(newTemp);

      // Stop when target reached
      if (step >= steps) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsAnimating(false);
        setAnimatingDirection(null);
      }
    }, 400); // 400ms per degree change
  };

  /**
   * Handle mode button clicks
   * Triggers temperature animation to target mode's temperature
   */
  const handleModeChange = (targetMode: 'cool' | 'comfort' | 'warm') => {
    const targetTemp = targetMode === 'cool' ? 18 : targetMode === 'warm' ? 26 : 22;
    if (targetTemp !== temperature) {
      animateToTemperature(targetTemp);
    }
  };

  /**
   * Get visual effect colors based on current temperature/mode
   * Returns colors for airflow streams and particles
   */
  /**
   * Get visual effect colors based on current temperature/mode
   * Colors are muted and Apple-like, with smooth transitions between modes
   */
  const getEffectColors = () => {
    if (temperature >= 24) {
      // Warm mode: Subtle orange/amber tones
      return {
        primary: 'rgba(255, 193, 7, 0.1)',
        secondary: 'rgba(255, 152, 0, 0.15)',
        particle: 'bg-orange-200',
      };
    } else if (temperature <= 20) {
      // Cool mode: Very muted blue tones (Apple-style subtle)
      return {
        primary: 'rgba(59, 130, 246, 0.08)',
        secondary: 'rgba(96, 165, 250, 0.12)',
        particle: 'bg-blue-200',
      };
    } else {
      // Comfort mode: Very muted teal/green tones (Apple-style subtle)
      return {
        primary: 'rgba(20, 184, 166, 0.08)',
        secondary: 'rgba(16, 185, 129, 0.12)',
        particle: 'bg-teal-200',
      };
    }
  };

  const colors = getEffectColors();

  /**
   * Get status text for Control Center card
   */
  const getStatusText = () => {
    if (isAnimating && animatingDirection) {
      return animatingDirection === 'warming' ? 'Warming...' : 'Cooling...';
    }
    if (mode === 'cool') return 'Cool Mode';
    if (mode === 'warm') return 'Warm Mode';
    return 'Comfort Mode';
  };

  return (
    <>
      {/* Global keyframe animations for airflow effects */}
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
              {/* Section Heading */}
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                Perfect Climate
              </h2>
              
              {/* Description */}
              <p className="text-gray-600 text-lg">
                The perfect temperature, automatically. Always comfortable, exactly as you want it.
              </p>
              
              {/* ===== CONTROL CENTER CARD ===== */}
              <div className="pt-4">
                <div
                  className={`
                    relative overflow-hidden rounded-xl sm:rounded-2xl
                    w-full max-w-[200px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[256px]
                    p-3 sm:p-4 md:p-5 lg:p-6
                    transition-all duration-500 ease-out
                    ${mode === 'cool'
                      ? 'bg-gradient-to-br from-slate-400 via-cyan-500 to-slate-500 shadow-xl shadow-slate-500/20'
                      : mode === 'warm'
                      ? 'bg-gradient-to-br from-amber-400 via-orange-300 to-amber-500 shadow-xl shadow-amber-500/20'
                      : 'bg-gradient-to-br from-teal-500 via-emerald-500 to-teal-600 shadow-xl shadow-teal-500/20'
                    }
                  `}
                >
                  {/* Top Row: Icon + Status Indicator */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                    {/* Thermometer icon */}
                    <div className="p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full bg-white/20 backdrop-blur-sm">
                      <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <circle cx="12" cy="16" r="2" fill="currentColor" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v8" strokeWidth={2.5} />
                      </svg>
                    </div>
                    
                    {/* Status indicator dot */}
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white shadow-lg shadow-white/50" />
                  </div>
                  
                  {/* Room name + Status text */}
                  <div className="text-left mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-white">
                      Living Room
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm mt-0.5 text-white/90">
                      {getStatusText()}
                    </p>
                  </div>

                  {/* Mode Selection Buttons */}
                  <div className="flex gap-1.5 sm:gap-2">
                    <button
                      onClick={() => handleModeChange('cool')}
                      className={`
                        flex-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium
                        transition-all duration-200 cursor-pointer
                        ${mode === 'cool'
                          ? 'bg-white/30 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }
                      `}
                    >
                      Cool
                    </button>
                    
                    <button
                      onClick={() => handleModeChange('comfort')}
                      className={`
                        flex-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium
                        transition-all duration-300 cursor-pointer
                        ${mode === 'comfort'
                          ? 'bg-white/30 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }
                      `}
                    >
                      Comfort
                    </button>
                    
                    <button
                      onClick={() => handleModeChange('warm')}
                      className={`
                        flex-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium
                        transition-all duration-300 cursor-pointer
                        ${mode === 'warm'
                          ? 'bg-white/30 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }
                      `}
                    >
                      Warm
                    </button>
                  </div>

                  {/* Subtle inner glow overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* ===== RIGHT COLUMN: Room Photo with Climate Effects ===== */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-7"
            >
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                {/* Base room photo */}
                <img
                  src="/Curtains-Open-Lights-On-Homepod.png"
                  alt="Smart climate controlled room"
                  className="w-full h-full object-cover"
                />

                {/* Animated airflow effects overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* Airflow streams - concentrated in upper 45% (realistic AC vent position) */}
                  {/* All modes use same animation (airFlow) with staggered delays for smooth appearance */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`airstream-${i}`}
                      className="absolute"
                      style={{
                        top: `${10 + i * 11.67}%`, // Results in: 10%, 21.67%, 33.34%, 45%
                        left: '-20%', // All modes flow from left (same direction)
                        width: '300px',
                        height: '4px',
                        background: `linear-gradient(90deg,
                          transparent 0%,
                          ${colors.primary} 30%,
                          ${colors.secondary} 70%,
                          transparent 100%
                        )`,
                        animation: `airFlow ${8 + i * 0.8}s ease-in-out infinite ${i * 2.8}s`, // Increased stagger delay
                        filter: 'blur(2px)',
                        transition: 'background 0.8s ease-out', // Smooth color transitions between modes
                      }}
                    />
                  ))}

                  {/* Floating particles with smooth color transitions */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={`particle-${i}`}
                      className={`absolute w-1 h-1 ${colors.particle} rounded-full opacity-40 transition-colors duration-700 ease-out`}
                      style={{
                        left: `${20 + (i % 3) * 25}%`,
                        top: `${25 + (i % 2) * 20}%`,
                        animation: `particleFloat ${4 + i * 0.4}s ease-in-out infinite ${i * 0.7}s`,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Temperature indicator bubble - positioned near AC grill in photo */}
                <div className="absolute top-[42%] left-[37%] z-30">
                  <div className="relative">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 backdrop-blur-xl bg-white/20 rounded-full shadow-lg border border-white/30">
                      {/* Colored border ring that changes with mode */}
                      <div
                        className="absolute inset-0.5 rounded-full border transition-all duration-500"
                        style={{
                          borderColor:
                            mode === 'cool'
                              ? 'rgba(59, 130, 246, 0.6)'
                              : mode === 'warm'
                              ? 'rgba(245, 158, 11, 0.6)'
                              : 'rgba(16, 185, 129, 0.6)',
                          boxShadow:
                            mode === 'cool'
                              ? '0 0 8px rgba(59, 130, 246, 0.3)'
                              : mode === 'warm'
                              ? '0 0 8px rgba(245, 158, 11, 0.3)'
                              : '0 0 8px rgba(16, 185, 129, 0.3)',
                        }}
                      />
                      
                      {/* Temperature display with animated count */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div 
                          key={temperature} // Re-animates on temperature change
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-[7px] sm:text-[10px] font-medium text-white leading-none flex items-center justify-center"
                        >
                          {temperature}°
                        </motion.div>
                      </div>
                      
                      {/* Glass reflection effect */}
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
