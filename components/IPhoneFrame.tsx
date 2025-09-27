'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

/**
 * Apple-accurate CSS iPhone frame
 * - Proper bezel thickness & radii
 * - Correct Dynamic Island size/position
 * - Side buttons (volume, mute, power)
 * - Screen content is clipped to inner rounded rectangle
 * - Responsive widths (mobile → desktop)
 */
export default function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      className="relative inline-block
                 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[380px] xl:w-[420px]"
    >
      {/* Device body */}
      <div className="relative aspect-[9/19.5] rounded-[40px] bg-black shadow-iphone overflow-hidden">

        {/* Subtle metallic rim/highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-[40px]
                        ring-1 ring-white/10 shadow-[inset_0_0_6px_rgba(255,255,255,0.12)]" />

        {/* === Side Buttons === */}

        {/* Left side - Volume Up */}
        <div className="absolute -left-[3px] top-[80px] w-[4px] h-[40px] rounded-l-md bg-neutral-800 shadow-md" />
        {/* Left side - Volume Down */}
        <div className="absolute -left-[3px] top-[140px] w-[4px] h-[40px] rounded-l-md bg-neutral-800 shadow-md" />
        {/* Left side - Mute switch */}
        <div className="absolute -left-[3px] top-[40px] w-[4px] h-[28px] rounded-l-md bg-neutral-700 shadow-sm" />

        {/* Right side - Power button */}
        <div className="absolute -right-[3px] top-[100px] w-[4px] h-[70px] rounded-r-md bg-neutral-800 shadow-md" />

        {/* Inner bezel (thin black border around screen) */}
        <div className="absolute inset-[6px] rounded-[34px] bg-black
                        shadow-[inset_0_0_10px_rgba(0,0,0,0.6)]">

          {/* Dynamic Island */}
          <div className="absolute left-1/2 -translate-x-1/2
                          top-[10px] sm:top-[10px] md:top-[12px]
                          w-[92px] sm:w-[100px] md:w-[108px] lg:w-[118px]
                          h-[26px] sm:h-[28px] md:h-[30px] lg:h-[32px]
                          rounded-full bg-black
                          shadow-[inset_0_-1px_2px_rgba(255,255,255,0.12)]" />

          {/* Screen (clipped area) */}
          <div
            className="
              absolute
              left-[8px] right-[8px]
              top-[40px] sm:top-[42px] md:top-[46px] lg:top-[52px]
              bottom-[14px] sm:bottom-[16px] md:bottom-[18px]
              rounded-[28px]
              overflow-hidden bg-black
              ring-1 ring-white/5
            "
          >
            <div className="relative w-full h-full">
              {/* Your UI / room image */}
              {children}

              {/* Very subtle screen gloss */}
              <div className="pointer-events-none absolute inset-0
                              bg-gradient-to-b from-white/8 via-transparent to-black/10" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
