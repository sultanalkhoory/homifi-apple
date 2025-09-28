'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the data for each smart feature indicator
type SmartIndicator = {
  id: string;
  x: string;      // CSS position (percentage or px)
  y: string;      // CSS position (percentage or px)
  label: string;  // Feature name
  detail: string; // Brief description
  color: string;  // Indicator color (subtle variations)
};

// Smart features mapped to positions in the room
const indicators: SmartIndicator[] = [
  {
    id: 'lights',
    x: '35%',
    y: '30%',
    label: 'Smart Lighting',
    detail: 'Adjusts automatically',
    color: 'rgba(255, 214, 90, 0.85)'
  },
  {
    id: 'curtains',
    x: '78%',
    y: '40%',
    label: 'Privacy Controls',
    detail: 'Voice or app controlled',
    color: 'rgba(180, 200, 255, 0.85)'
  },
  {
    id: 'climate',
    x: '12%',
    y: '65%',
    label: 'Climate',
    detail: 'Optimal comfort',
    color: 'rgba(110, 190, 255, 0.85)'
  },
  {
    id: 'security',
    x: '65%',
    y: '75%',
    label: 'Security',
    detail: 'Always protected',
    color: 'rgba(120, 255, 170, 0.85)'
  }
];

export default function SmartIndicators() {
  // Track which indicator is active (hovered)
  const [activeId, setActiveId] = useState<string | null>(null);
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Map through and create each indicator */}
      {indicators.map((indicator) => (
        <div
          key={indicator.id}
          className="absolute pointer-events-auto"
          style={{ 
            left: indicator.x, 
            top: indicator.y, 
            transform: 'translate(-50%, -50%)' 
          }}
          onMouseEnter={() => setActiveId(indicator.id)}
          onMouseLeave={() => setActiveId(null)}
        >
          {/* Pulsing dot */}
          <motion.div 
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: indicator.color }}
            animate={{ 
              boxShadow: activeId === indicator.id 
                ? `0 0 0 12px rgba(255,255,255,0.1), 0 0 12px ${indicator.color}` 
                : `0 0 0 0px rgba(255,255,255,0), 0 0 6px ${indicator.color}`
            }}
            transition={{
              boxShadow: { duration: 0.35, ease: 'easeOut' }
            }}
          >
            {/* Inner pulsing animation */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: indicator.color }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 0.3, 0.7]
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
          </motion.div>

          {/* Label that appears on hover */}
          <AnimatePresence>
            {activeId === indicator.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-5 left-0 whitespace-nowrap rounded-md px-3 py-1.5 bg-white/90 backdrop-blur-md shadow-lg"
                style={{ 
                  transformOrigin: 'left top'
                }}
              >
                <p className="text-sm font-medium text-gray-900">{indicator.label}</p>
                <p className="text-xs text-gray-600">{indicator.detail}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
