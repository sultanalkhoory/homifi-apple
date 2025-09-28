'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

/**
 * iPhone Frame Component
 * - 9:19.5 aspect ratio
 * - Responsive sizing
 * - Transparent screen with subtle tint
 * - Status bar (time, signal, wifi, battery)
 */

export default function IPhoneFrame({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      className="relative inline-block w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] max-w-[300px]"
    >
      {/* Body */}
      <div className="relative aspect-[9/19.5] rounded-[40px] overflow-visible drop-shadow-[0_14px_40px_rgba(0,0,0,0.35)]">

        {/* Black bezel */}
        <div className="pointer-events-none absolute inset-0 rounded-[40px]
                        ring-[8px] ring-inset ring-black shadow-[inset_0_0_10px_rgba(0,0,0,0.65)]">

          {/* Screen */}
          <div
            className="pointer-events-auto absolute left-[8px] right-[8px] top-[8px] bottom-[8px]
                       rounded-[32px] overflow-hidden relative"
          >
            {/* Screen tint (subtle, not opaque) */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Reflection gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10" />

            {/* Status bar */}
            <div className="absolute top-2 left-0 right-0 flex items-center justify-between px-3 text-white text-[11px] font-medium z-20">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                {/* Cellular bars */}
                <div className="flex gap-[1px]">
                  <div className="w-[2px] h-[6px] bg-white rounded-sm"></div>
                  <div className="w-[2px] h-[8px] bg-white rounded-sm"></div>
                  <div className="w-[2px] h-[10px] bg-white rounded-sm"></div>
                  <div className="w-[2px] h-[12px] bg-white rounded-sm"></div>
                </div>
                {/* Wi-Fi */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={2} stroke="white" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25c6.627-6.627 17.373-6.627 24 0M6.75 12c4.686-4.686 12.314-4.686 17 0M10.5 15.75a6.75 6.75 0 019 0" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 21h.01" />
                </svg>
                {/* Battery */}
                <div className="flex items-center">
                  <div className="w-5 h-2.5 border border-white rounded-sm relative">
                    <div className="absolute inset-[1px] bg-white rounded-sm"></div>
                  </div>
                  <div className="w-0.5 h-1.5 bg-white ml-[1px]"></div>
                </div>
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 mt-2 z-10
                            w-[80px] h-[24px] rounded-full bg-black" />

            {/* Children (UI overlays) */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
