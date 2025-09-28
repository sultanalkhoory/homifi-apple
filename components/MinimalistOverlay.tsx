'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the data for each smart area
type SmartArea = {
  id: string;
  left: string;
  top: string;
  width: string;
  height: string;
  label: string;
};

// Smart areas mapped to positions in the room
const smartAreas: SmartArea[] = [
  {
    id: 'lighting',
    left: '30%',
    top: '20%',
    width: '20%',
    height: '25%',
    label: 'Adaptive Lighting'
  },
  {
    id: 'windows',
    left: '65%',
    top: '25%',
    width: '25%',
    height: '50%',
    label: 'Smart Privacy'
  },
  {
    id: 'seating',
    left: '15%',
    top: '55%',
    width: '40%',
    height: '35%',
    label: 'Comfort Zone'
  },
  {
    id: 'ambience',
    left: '60%',
    top: '60%',
    width: '20%',
    height: '30%',
    label: 'Scene Control'
  }
];

export default function MinimalistOverlay() {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  return (
    <div className="absolute inset-0">
      {/* Subtle overall gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />
      
      {/* Map through and create each interactive area */}
      {smartAreas.map((area) => (
        <div
          key={area.id}
          className="absolute cursor-pointer"
          style={{ 
            left: area.left, 
            top: area.top, 
            width: area.width,
            height: area.height
          }}
          onMouseEnter={() => setActiveId(area.id)}
          onMouseLeave={() => setActiveId(null)}
        >
          {/* Subtle hover effect area */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{ 
              backgroundColor: activeId === area.id 
                ? 'rgba(255, 255, 255, 0.15)' 
                : 'rgba(255, 255, 255, 0)'
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Tooltip that appears on hover */}
          <AnimatePresence>
            {activeId === area.id && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-[105%] left-0 whitespace-nowrap"
              >
                <div className="rounded-full bg-white/90 backdrop-blur-md shadow-md px-4 py-1.5 text-sm font-medium text-black">
                  {area.label}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
