'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

/**
 * iPhone Frame Component - Properly Sized
 * 
 * Features:
 * - Correct proportions (9:19.5 aspect ratio)
 * - Much smaller sizing (120px-200px) to fit properly in photo
 * - Thin bezel (3px border, not thick ring)
 * - Status bar with time and icons
 * - Transparent screen showing parent photo
 * - NO rotation - straight vertical
 */

export default function IPhoneFrame({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      // MUCH smaller sizes - 120px mobile to 200px desktop max
      className="relative inline-block w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px]"
    >
      {/* iPhone body - transparent with thin border bezel */}
      <div className="relative aspect-[9/19.5] rounded-[32px] overflow-hidden
                      border-[3px] border-black
                      drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]">

        {/* Screen area - fully transparent, shows photo behind */}
        <div className="absolute inset-0 bg-transparent">

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-2">
            {/* Time */}
            <span className="text-white text-[11px] font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              9:41
            </span>
            
            {/* System icons */}
            <div className="flex items-center gap-1">
              {/* Cellular */}
              <div className="flex gap-[0.5px]">
                {[3, 5, 7, 9].map((h, i) => (
                  <div 
                    key={i} 
                    style={{ height: `${h}px` }} 
                    className="w-[1.5px] bg-white rounded-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                  />
                ))}
              </div>
              
              {/* WiFi */}
              <svg 
                viewBox="0 0 20 20" 
                className="w-3 h-3 fill-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              >
                <path d="M10 16.5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 10 16.5Z" />
                <path d="M5.3 13.8a6.65 6.65 0 0 1 9.4 0l1.2-1.2a8.35 8.35 0 0 0-11.8 0l1.2 1.2Z" />
              </svg>
              
              {/* Battery */}
              <div className="flex items-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                <div className="w-4 h-2 border border-white rounded-[2px] relative">
                  <div className="absolute left-[1px] top-[1px] bottom-[1px] right-[1px] bg-white rounded-[1px]" />
                </div>
                <div className="w-[1.5px] h-1.5 bg-white ml-[1px] rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[4px] z-30
                          w-[60px] h-[20px] rounded-full bg-black" />

          {/* Content area for glass UI controls */}
          <div className="absolute inset-0 z-10">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
