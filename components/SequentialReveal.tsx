'use client';

import { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

// Define the data for each feature label
type FeatureLabel = {
  id: string;
  x: string;
  y: string;
  label: string;
  delay: number;
};

// Feature labels with positions and reveal timing
const featureLabels: FeatureLabel[] = [
  {
    id: 'voice',
    x: '25%',
    y: '20%',
    label: 'Voice Control',
    delay: 0.5
  },
  {
    id: 'lighting',
    x: '70%',
    y: '30%',
    label: 'Smart Lighting',
    delay: 1.2
  },
  {
    id: 'privacy',
    x: '80%',
    y: '60%',
    label: 'Privacy Controls',
    delay: 1.9
  },
  {
    id: 'security',
    x: '20%',
    y: '70%',
    label: 'Security',
    delay: 2.6
  }
];

// Animation variants
const labelVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const lineVariants: Variants = {
  hidden: { width: 0 },
  visible: { width: '100%', transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 } }
};

export default function SequentialReveal() {
  const controls = useAnimation();

  // Start the sequence when component mounts
  useEffect(() => {
    // Give time for the hero image to load first
    const timer = setTimeout(() => {
      controls.start('visible');
    }, 800);
    
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Subtle gradient overlay for better label visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent" />
      
      {/* Map through and create each feature label with sequential animation */}
      {featureLabels.map((feature) => (
        <motion.div
          key={feature.id}
          className="absolute"
          style={{ 
            left: feature.x, 
            top: feature.y,
            transformOrigin: 'left center'
          }}
          initial="hidden"
          animate={controls}
          custom={feature.delay}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: feature.delay } }
          }}
        >
          {/* The feature label */}
          <div className="flex items-center gap-2">
            <motion.div
              className="h-px bg-white/70"
              variants={lineVariants}
              style={{ width: '24px' }}
            />
            <motion.div
              className="rounded-full bg-white/90 backdrop-blur px-3 py-0.5 text-xs font-medium text-black shadow-sm"
              variants={labelVariants}
            >
              {feature.label}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
