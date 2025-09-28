'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

/**
 * iPhone Frame Component - PNG Version
 * 
 * Uses iphone-17pro.png with transparent screen cutout
 * Much more realistic appearance than CSS version
 * Responsive sizing to fit properly in photo containers
 */

export default function IPhoneFrame({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      // Smaller sizes to fit properly - 100px to 160px max
      className="relative inline-block w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px]"
    >
      {/* PNG iPhone frame with transparent screen */}
      <img 
        src="/iphone-17pro.png" 
        alt="iPhone 17 Pro" 
        className="w-full h-auto relative z-20"
      />
      
      {/* Content area - positioned to align with transparent screen area */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </motion.div>
  );
}
