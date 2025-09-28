'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

export default function IPhoneFrame({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      className="relative inline-block w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] max-w-[300px]"
    >
      <div className="relative aspect-[9/19.5] rounded-[40px] overflow-visible drop-shadow-[0_14px_40px_rgba(0,0,0,0.35)]">

        {/* Bezel */}
        <div className="pointer-events-none absolute inset-0 rounded-[40px] ring-[8px] ring-inset ring-black shadow-[inset_0_0_10px_rgba(0,0,0,0.65)]" />

        {/* Screen window */}
        <div className="absolute left-[8px] right-[8px] top-[8px] bottom-[8px] rounded-[32px] overflow-hidden">

          {/* --- DISPLAY LAYERS --- */}
          {/* Uniform OLED-like tint (touch darker; even everywhere) */}
          <div className="absolute inset-0 z-0 bg-black/20" />
          {/* Gentle, even reflection (no heavy fog at top) */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,transparent_22%,rgba(0,0,0,0.10)_100%)]" />

          {/* Content (showcase etc.) */}
          <div className="absolute inset-0 z-10 grid place-items-center">
            {children}
          </div>

          {/* Status bar (time biased toward Island, right cluster clear of it) */}
          <div className="absolute z-20 top-[16px] left-0 right-0 flex items-center justify-between text-white text-[13px] tracking-tight">
            <span className="ml-[28px] font-semibold">9:41</span>
            <div className="mr-[24px] flex items-center gap-2">
              {/* Cellular  */}
              <div className="flex gap-[1px] opacity-90">
                {[4,6,8,10].map((h, i) => (
                  <div key={i} style={{height: h}} className="w-[2px] bg-white rounded-sm" />
                ))}
              </div>
              {/* Wi-Fi */}
              <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-white opacity-90">
                <path d="M10 16.5a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 10 16.5Z" />
                <path d="M5.3 13.8a6.65 6.65 0 0 1 9.4 0l1.2-1.2a8.35 8.35 0 0 0-11.8 0l1.2 1.2Z" />
                <path d="M2.6 11.1a10.9 10.9 0 0 1 14.8 0l1.2-1.2a12.6 12.6 0 0 0-17.2 0l1.2 1.2Z" />
              </svg>
              {/* Battery */}
              <div className="flex items-center">
                <div className="w-5 h-2.5 border border-white rounded-[3px] relative">
                  <div className="absolute left-[1px] top-[1px] bottom-[1px] right-[2px] bg-white rounded-[2px]" />
                </div>
                <div className="w-[2px] h-2 bg-white ml-[2px] rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute z-30 left-1/2 -translate-x-1/2 top-[10px] w-[86px] h-[26px] rounded-full bg-black" />
        </div>
      </div>
    </motion.div>
  );
}
