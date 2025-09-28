'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

/**
 * iPhone Frame Component - Complete CSS Implementation
 * 
 * Features:
 * - Accurate iPhone 15/16 Pro proportions (9:19.5 aspect ratio)
 * - Black bezel with proper thickness
 * - Dynamic Island cutout at top
 * - Status bar with time, signal, wifi, battery icons
 * - Truly transparent screen area showing parent content
 * - Responsive sizing (180px - 300px max)
 * 
 * Usage:
 * Place optional glass UI controls (toggles, labels) as children
 */

export default function IPhoneFrame({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      /**
       * Responsive sizing
       * Mobile: 180px → Desktop: 280px (max 300px)
       * Ensures iPhone never overwhelms the layout
       */
      className="relative inline-block w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] max-w-[300px]"
    >
      {/* 
        Main iPhone Body
        - aspect-[9/19.5] = real iPhone proportions
        - bg-black = solid black body
        - rounded-[40px] = iPhone corner radius
        - drop-shadow = depth and separation
      */}
      <div className="relative aspect-[9/19.5] rounded-[40px] bg-black overflow-visible
                      drop-shadow-[0_14px_40px_rgba(0,0,0,0.35)]">

        {/* 
          ========== SCREEN AREA (TRANSPARENT) ==========
          This is the cutout that shows the parent photo through
          8px inset creates the bezel thickness
        */}
        <div className="absolute inset-[8px] rounded-[32px] overflow-hidden">

          {/* 
            ========== STATUS BAR ==========
            Positioned at very top of screen
            Contains time (left) and system icons (right)
            White text/icons with drop shadow for legibility
          */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 pt-3 pb-2">
            {/* Time (left side) */}
            <span className="text-white text-[13px] font-semibold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              9:41
            </span>
            
            {/* System icons (right side) */}
            <div className="flex items-center gap-1.5">
              {/* Cellular signal bars */}
              <div className="flex gap-[1px] opacity-90">
                {[4, 6, 8, 10].map((height, i) => (
                  <div 
                    key={i} 
                    style={{ height: `${height}px` }} 
                    className="w-[2px] bg-white rounded-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                ))}
              </div>
              
              {/* WiFi icon */}
              <svg 
                viewBox="0 0 20 20" 
                className="w-[15px] h-[15px] fill-white opacity-90"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
              >
                <path d="M10 16.5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 10 16.5Z" />
                <path d="M5.3 13.8a6.65 6.65 0 0 1 9.4 0l1.2-1.2a8.35 8.35 0 0 0-11.8 0l1.2 1.2Z" />
                <path d="M2.6 11.1a10.9 10.9 0 0 1 14.8 0l1.2-1.2a12.6 12.6 0 0 0-17.2 0l1.2 1.2Z" />
              </svg>
              
              {/* Battery icon */}
              <div className="flex items-center" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
                {/* Battery body */}
                <div className="w-5 h-2.5 border border-white rounded-[3px] relative opacity-90">
                  {/* Battery fill (full charge) */}
                  <div className="absolute left-[1px] top-[1px] bottom-[1px] right-[2px] bg-white rounded-[2px]" />
                </div>
                {/* Battery tip */}
                <div className="w-[2px] h-2 bg-white ml-[1px] rounded-[1px] opacity-90" />
              </div>
            </div>
          </div>

          {/* 
            ========== DYNAMIC ISLAND ==========
            Black pill-shaped cutout at top center
            Positioned below status bar
          */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[6px] z-30
                          w-[80px] h-[24px] rounded-full bg-black" />

          {/* 
            ========== TRANSPARENT CONTENT AREA ==========
            This is where the parent photo shows through
            Children (glass UI controls) render here on top of transparency
            
            Important: NO background color or layers here
            The room photo behind the iPhone shows through naturally
          */}
          <div className="absolute inset-0 z-10">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
