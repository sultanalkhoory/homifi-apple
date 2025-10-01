'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the data for each smart feature indicator with refined positions
type SmartIndicator = {
  id: string;
  x: string;      // CSS position (percentage or px)
  y: string;      // CSS position (percentage or px)
  label: string;  // Feature name
  detail: string; // Brief description
  color: string;  // Indicator color (subtle variations)
  popupDirection: 'left' | 'right' | 'top' | 'bottom'; // Direction for popup to open
};

// Smart features mapped to precise positions in the room
const indicators: SmartIndicator[] = [
  {
    id: 'lights',
    x: '24%',   // Positioned near the visible lamp
    y: '38%',
    label: 'Smart Lighting',
    detail: 'Adapts to your activity and time of day',
    color: 'rgba(255, 214, 90, 0.85)',
    popupDirection: 'bottom'  // Changed from 'right' to 'bottom' as specified
  },
  {
    id: 'curtains',
    x: '78%',   // Keeping the curtain position as requested
    y: '40%',
    label: 'Privacy',
    detail: 'Automated shades with HomeKit',
    color: 'rgba(94, 234, 212, 0.85)',
    popupDirection: 'left'  // Changed to open inward
  },
  {
    id: 'climate',
    x: '19%',   // Positioned near ceiling AC grill
    y: '4%',
    label: 'Climate',
    detail: 'Maintains your ideal comfort zone',
    color: 'rgba(110, 190, 255, 0.85)',
    popupDirection: 'bottom'
  },
  {
    id: 'security',
    x: '2%',   // Positioned near left side (implied entrance)
    y: '50%',
    label: 'Security',
    detail: 'Always protected, never intrusive',
    color: 'rgba(120, 255, 170, 0.85)',
    popupDirection: 'right'
  },
  {
   id: 'voice',
   x: '55%',   // Center horizontally
   y: '74%',   // Bottom area where HomePod is
   label: 'Voice Control',
   detail: 'Just ask Siri',
   color: 'rgba(139, 146, 234, 0.85)',
   popupDirection: 'right'
  }
];

export default function SmartIndicators() {
  // Track which indicator is active (hovered/tapped)
  const [activeId, setActiveId] = useState<string | null>(null);
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  // Mobile-specific: track if user has tapped anywhere to reveal indicators
  const [indicatorsRevealed, setIndicatorsRevealed] = useState(false);
  
  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto-pulse animation on page load to draw attention
    const revealTimer = setTimeout(() => {
      setIndicatorsRevealed(true);
      
      // Auto-hide after a delay on desktop only
      if (!isMobile) {
        const hideTimer = setTimeout(() => {
          setIndicatorsRevealed(false);
        }, 2500);
        return () => clearTimeout(hideTimer);
      }
    }, 1800); // Slightly longer initial delay for better page load experience
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(revealTimer);
    };
  }, [isMobile]);

  // Handle room image click for mobile "tap to reveal" functionality
  const handleRoomClick = () => {
    if (isMobile) {
      // If an indicator is active, deactivate it
      if (activeId) {
        setActiveId(null);
      } else {
        // Otherwise toggle the revealed state
        setIndicatorsRevealed(!indicatorsRevealed);
      }
    }
  };
  
  // Get popup position based on direction and device type
  const getPopupPosition = (direction: string, indicatorId: string) => {
    // Special case for climate indicator on mobile - custom bottom-right position
    if (isMobile && indicatorId === 'climate') {
      // Custom position for bottom-right placement
      return { 
        top: '100%', 
        left: '0%', 
        translateX: '0px', 
        translateY: '8px'
      };
    }
    
    // Bottom-right treatment for lights indicator on both mobile and desktop
    if (indicatorId === 'lights') {
      // Custom position for bottom-right placement
      return { 
        top: '100%', 
        left: '0%', 
        translateX: '0px', 
        translateY: '8px'
      };
    }
    
    // Standard positions for all other cases
    switch (direction) {
      case 'left': return { right: '100%', top: '50%', translateX: '-8px', translateY: '-50%' };
      case 'right': return { left: '100%', top: '50%', translateX: '8px', translateY: '-50%' };
      case 'top': return { bottom: '100%', left: '50%', translateX: '-50%', translateY: '-8px' };
      case 'bottom': default: return { top: '100%', left: '50%', translateX: '-50%', translateY: '8px' };
    }
  };
  
  return (
    <>
      {/* Invisible overlay for mobile "tap to reveal" */}
      <div 
        className="absolute inset-0 z-10" 
        onClick={handleRoomClick}
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 pointer-events-none">
        {/* Map through and create each indicator */}
        {indicators.map((indicator) => {
          // Get position with responsive direction handling
          const popupPosition = getPopupPosition(indicator.popupDirection, indicator.id);
          
          // Determine the actual popup direction for animation transforms
          // Keep within the allowed types: 'left', 'right', 'top', 'bottom'
          const effectiveDirection = isMobile && indicator.id === 'climate' ? 'bottom' : indicator.popupDirection;
          
          // Special flag for bottom-right popup positioning
          const isBottomRightPopup = (isMobile && indicator.id === 'climate') || indicator.id === 'lights';
          
          return (
            <div
              key={indicator.id}
              className="absolute pointer-events-auto"
              style={{ 
                left: indicator.x, 
                top: indicator.y, 
                transform: 'translate(-50%, -50%)',
                zIndex: activeId === indicator.id ? 30 : 20
              }}
            >
              {/* Large invisible touch target */}
              <button
                className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full z-20"
                style={{
                  touchAction: 'manipulation' // Improves touch response
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent room click handler
                  setActiveId(activeId === indicator.id ? null : indicator.id);
                }}
                onMouseEnter={() => !isMobile && setActiveId(indicator.id)}
                onMouseLeave={() => !isMobile && setActiveId(null)}
                aria-label={`${indicator.label} control`}
              />
              
              {/* Visible indicator dot with refined animations */}
              <motion.div 
                className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: indicator.color }}
                animate={{ 
                  scale: indicatorsRevealed || activeId === indicator.id ? 1.35 : 1,
                  boxShadow: (indicatorsRevealed || activeId === indicator.id)
                    ? `0 0 10px ${indicator.color}`
                    : `0 0 0 transparent`,
                }}
                transition={{
                  duration: indicatorsRevealed ? 0.7 : 0.35,
                  ease: [0.19, 1, 0.22, 1], // Apple's cubic-bezier easing
                  delay: indicatorsRevealed && !activeId ? 0.1 * parseInt(indicator.id.length.toString()) : 0 // Stagger reveal
                }}
              >
                {/* Pulsing animation - more subtle and elegant */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: indicator.color }}
                  animate={{ 
                    scale: [1, 1.8, 1],
                    opacity: [0.7, 0.1, 0.7]
                  }}
                  transition={{
                    duration: 4,  // Slower, more gentle pulse
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
              </motion.div>

              {/* Apple-style glass popup on hover/tap */}
              <AnimatePresence mode="popLayout">
                {activeId === indicator.id && (
                  <motion.div
                    className="absolute z-30 whitespace-nowrap"
                    style={{ 
                      ...popupPosition,
                      transform: `translate(${popupPosition.translateX || 0}, ${popupPosition.translateY || 0})`,
                      transformOrigin: effectiveDirection === 'left' ? 'right center' : 
                                       effectiveDirection === 'right' ? 'left center' :
                                       effectiveDirection === 'top' ? 'center bottom' : 
                                       isBottomRightPopup ? 'left top' : 'center top' // Special origin for bottom-right popups
                    }}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.94, 
                      filter: 'blur(2px)',
                      // For climate on mobile, add a slight horizontal movement too
                      y: effectiveDirection === 'bottom' ? -5 : 
                         effectiveDirection === 'top' ? 5 : 0,
                      x: effectiveDirection === 'right' ? -5 : 
                         effectiveDirection === 'left' ? 5 : 
                         isBottomRightPopup ? -3 : 0, // Slight x movement for bottom-right popups
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      filter: 'blur(0px)',
                      y: 0,
                      x: 0
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.97,
                      transition: { duration: 0.15, ease: [0.32, 0.72, 0, 1] } 
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 350,  // More gentle spring 
                      damping: 25,     // Slight bounciness
                      mass: 0.5,       // Lighter feel
                      restDelta: 0.001 // Higher precision for smoother end
                    }}
                  >
                    {/* Apple-style glass card with staged animations */}
                    <motion.div 
                      className="rounded-xl px-3.5 py-2.5 backdrop-blur-xl shadow-lg text-white overflow-hidden"
                      initial={{ 
                        background: 'linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0))',
                        boxShadow: '0 0 0 rgba(0,0,0,0)'
                      }}
                      animate={{ 
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)',
                        boxShadow: '0 10px 25px -3px rgba(0,0,0,0.15), 0 4px 6px -2px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.15)'
                      }}
                      transition={{ 
                        delay: 0.05,  // Slight delay for staged effect
                        duration: 0.25,
                        ease: [0.22, 1, 0.36, 1]  // Apple-like custom easing
                      }}
                      style={{
                        borderTop: '0.5px solid rgba(255,255,255,0.5)',
                        borderLeft: '0.5px solid rgba(255,255,255,0.3)',
                        borderRight: '0.5px solid rgba(255,255,255,0.2)',
                        borderBottom: '0.5px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {/* Content with staggered fade-in */}
                      <motion.div
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.2 }}
                      >
                        <p className="text-[13px] font-medium tracking-tight mb-0.5 text-white">{indicator.label}</p>
                        <motion.p 
                          className="text-[11px] font-normal text-white/90 tracking-tight"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15, duration: 0.25 }}
                        >
                          {indicator.detail}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
}
