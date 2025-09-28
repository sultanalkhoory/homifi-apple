'use client';

import { useState } from 'react';
import { motion, AnimatePresence, MotionValue, useSpring, useTransform } from 'framer-motion';
import { useMousePosition } from './useMousePosition'; // We'll create this hook next

// Feature data
type VisionFeature = {
  id: string;
  label: string;
  description: string;
  x: string;
  y: string;
  color: string;
};

const features: VisionFeature[] = [
  {
    id: 'lighting',
    label: 'Lighting',
    description: 'Automatically adjusts based on time and activity',
    x: '35%',
    y: '30%',
    color: 'rgba(255, 220, 125, 0.9)'
  },
  {
    id: 'privacy',
    label: 'Privacy',
    description: 'Smart curtains and privacy glass',
    x: '75%',
    y: '40%',
    color: 'rgba(200, 210, 255, 0.9)'
  },
  {
    id: 'climate',
    label: 'Climate',
    description: 'Comfort profile for each person',
    x: '20%',
    y: '65%',
    color: 'rgba(125, 210, 255, 0.9)'
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Always aware, never intrusive',
    x: '70%',
    y: '70%',
    color: 'rgba(150, 255, 180, 0.9)'
  }
];

export default function VisionInspiredUI() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const mousePosition = useMousePosition();
  
  // Create a parallax effect for feature elements based on mouse position
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const mouseXSpring = useSpring(mousePosition.x, springConfig);
  const mouseYSpring = useSpring(mousePosition.y, springConfig);

  return (
    <div className="absolute inset-0">
      {/* Subtle depth-enhancing gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/5 pointer-events-none" />

      {/* Vision Pro-style floating UI elements */}
      {features.map((feature) => {
        // Calculate parallax offsets for this feature - different for each position
        const xMovement = useTransform(
          mouseXSpring, 
          [0, window.innerWidth], 
          [8, -8]
        );
        
        const yMovement = useTransform(
          mouseYSpring, 
          [0, window.innerHeight], 
          [5, -5]
        );

        return (
          <motion.div
            key={feature.id}
            className="absolute cursor-pointer"
            style={{ 
              left: feature.x, 
              top: feature.y,
              x: xMovement,
              y: yMovement,
              transformOrigin: 'center center'
            }}
            onMouseEnter={() => setActiveId(feature.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            {/* Glass orb indicator */}
            <motion.div 
              className="relative w-10 h-10 rounded-full backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
              }}
            >
              {/* Color accent at center */}
              <motion.div 
                className="absolute inset-0 m-auto w-3 h-3 rounded-full"
                style={{ backgroundColor: feature.color }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.2
                }}
              />
            </motion.div>

            {/* Expanded feature info on hover - Vision Pro style */}
            <AnimatePresence>
              {activeId === feature.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute top-12 left-1/2 -translate-x-1/2 min-w-[180px] z-10"
                >
                  <div className="rounded-xl py-3 px-4 backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
                    <div className="font-medium text-white text-base mb-0.5">{feature.label}</div>
                    <div className="text-white/80 text-sm">{feature.description}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
