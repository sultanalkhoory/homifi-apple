'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

export default function IPhoneFrame({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      /* Hard cap so it never looks huge on desktop */
      className="relative inline-block w-[220px] sm:w-[260px] md:w-[300px] lg:w-[320px] xl:w-[340px] max-w-[360px]"
    >
      {/* Body */}
      <div className="relative aspect-[9/19.5] rounded-[40px] bg-black overflow-visible
                      drop-shadow-[0_14px_40px_rgba(0,0,0,0.35)]">

        {/* Subtle metal rim */}
        <div className="pointer-events-none absolute inset-0 rounded-[40px]
                        ring-1 ring-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.10)]" />

        {/* === Side buttons (percentage-based so they scale) === */}
        {/* Mute */}
        <div className="absolute -left-[3px] top-[12%] w-[4px] h-[7%] rounded-l-[4px]
                        bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-md" />
        {/* Volume up */}
        <div className="absolute -left-[3px] top-[22%] w-[4px] h-[9%] rounded-l-[4px]
                        bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-md" />
        {/* Volume down */}
        <div className="absolute -left-[3px] top-[33%] w-[4px] h-[9%] rounded-l-[4px]
                        bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-md" />
        {/* Power */}
        <div className="absolute -right-[3px] top-[24%] w-[4px] h-[16%] rounded-r-[4px]
                        bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-md" />

        {/* Inner bezel (thin black border around the screen) */}
        <div className="absolute inset-[6px] rounded-[34px] bg-black
                        shadow-[inset_0_0_10px_rgba(0,0,0,0.65)]">

          {/* Dynamic Island (accurate size/placement) */}
          <div className="absolute left-1/2 -translate-x-1/2
                          top-[12px]
                          w-[100px] sm:w-[104px] md:w-[110px] lg:w-[118px]
                          h-[30px] sm:h-[30px] md:h-[32px] lg:h-[34px]
                          rounded-full bg-black
                          shadow-[inset_0_-1px_2px_rgba(255,255,255,0.12)]" />

          {/* SCREEN WINDOW — TRUE TRANSPARENCY */}
          <div
            className="
              absolute left-[9px] right-[9px]
              top-[50px] sm:top-[52px] md:top-[56px] lg:top-[62px]
              bottom-[16px] sm:bottom-[16px] md:bottom-[18px]
              rounded-[28px] overflow-hidden
              /* IMPORTANT: no bg, no ring, no gloss — so the photo behind shows through */
            "
          >
            {/* Optional: UI inside the phone */}
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
