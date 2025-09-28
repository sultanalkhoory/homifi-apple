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
    x: '28%',   // Positioned near the visible lamp
    y: '38%',
    label: 'Smart Lighting',
    detail: 'Adapts to your activity and time of day',
    color: 'rgba(255, 214, 90, 0.85)',
    popupDirection: 'right'
  },
  {
    id: 'curtains',
    x: '78%',   // Keeping the curtain position as requested
    y: '40%',
    label: 'Privacy',
    detail: 'Automated shades with HomeKit',
    color: 'rgba(180, 200, 255, 0.85)',
    popupDirection: 'left'  // Changed to open inward
  },
  {
    id: 'climate',
    x: '50%',   // Positioned near ceiling AC grill
    y: '15%',
    label: 'Climate',
    detail: 'Maintains your ideal comfort zone',
    color: 'rgba(110, 190, 255, 0.85)',
    popupDirection: 'bottom'
  },
  {
    id: 'security',
    x: '15%',   // Positioned near left side (implied entrance)
    y: '65%',
    label: 'Security',
    detail: 'Always protected, never intrusive',
    color: 'rgba(120, 255, 170, 0.85)',
    popupDirection: 'right'
  }
];

export default function RefinedSmartIndicators() {
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
    setTimeout(() => {
      setIndicatorsRevealed(true);
      // Auto-hide after 2.5 seconds on desktop
      if (!isMobile) {
        setTimeout(() => setIndicatorsRevealed(false), 2500);
      }
    }, 1500);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  
  // Get popup position based on direction
  const getPopupPosition = (direction: string) => {
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
          const popupPosition = getPopupPosition(indicator.popupDirection);
          
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
              
              {/* Visible indicator dot */}
              <motion.div 
                className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: indicator.color }}
                animate={{ 
                  scale: indicatorsRevealed || activeId === indicator.id ? 1.5 : 1,
                  boxShadow: (indicatorsRevealed || activeId === indicator.id)
                    ? `0 0 8px ${indicator.color}`
                    : `0 0 0 transparent`,
                }}
                transition={{
                  duration: 0.35,
                  ease: 'easeOut'
                }}
              >
                {/* Pulsing animation */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: indicator.color }}
                  animate={{ 
                    scale: [1, 2, 1],
                    opacity: [0.7, 0, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              </motion.div>

              {/* Apple-style glass popup on hover/tap */}
              <AnimatePresence>
                {activeId === indicator.id && (
                  <motion.div
                    className="absolute z-30 whitespace-nowrap"
                    style={{ 
                      ...popupPosition,
                      transform: `translate(${popupPosition.translateX || 0}, ${popupPosition.translateY || 0})`,
                      transformOrigin: indicator.popupDirection === 'left' ? 'right center' : 
                                       indicator.popupDirection === 'right' ? 'left center' :
                                       indicator.popupDirection === 'top' ? 'center bottom' : 
                                       'center top'
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 500, 
                      damping: 30,
                      mass: 1
                    }}
                  >
                    {/* Apple-style glass card */}
                    <div className="rounded-xl px-3.5 py-2.5 backdrop-blur-md shadow-lg text-white"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 100%)',
                        borderTop: '0.5px solid rgba(255,255,255,0.3)',
                        borderLeft: '0.5px solid rgba(255,255,255,0.2)',
                        borderRight: '0.5px solid rgba(255,255,255,0.1)',
                        borderBottom: '0.5px solid rgba(255,255,255,0.05)',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.1)',
                      }}>
                      <p className="text-[13px] font-medium tracking-tight mb-0.5">{indicator.label}</p>
                      <p className="text-[11px] font-normal text-white/75 tracking-tight">{indicator.detail}</p>
                    </div>
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
