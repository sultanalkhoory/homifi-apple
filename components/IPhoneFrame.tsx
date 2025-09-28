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
        <div className="pointer-events-none absolute inset-0 rounded-[40px]
                        ring-[8px] ring-inset ring-black shadow-[inset_0_0_10px_rgba(0,0,0,0.65)]">

          {/* Screen */}
          <div className="pointer-events-auto absolute left-[8px] right-[8px] top-[8px] bottom-[8px]
                          rounded-[32px] overflow-hidden relative bg-black/10">

            {/* Subtle reflection gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20 pointer-events-none" />

            {/* Status Bar */}
            <div className="absolute top-[14px] left-0 right-0 flex items-center justify-between px-4 text-white text-[13px] font-medium tracking-tight z-20">
              {/* Time */}
              <span className="font-semibold">9:41</span>

              {/* Status icons */}
              <div className="flex items-center gap-2">
                {/* Cellular bars (short → tall, left → right) */}
                <div className="flex gap-[1px]">
                  <div className="w-[2px] h-[4px] bg-white rounded-sm"></div>
                  <div className="w-[2px] h-[6px] bg-white rounded-sm"></div>
                  <div className="w-[2px] h-[8px] bg-white rounded-sm"></div>
                  <div className="w-[2px] h-[10px] bg-white rounded-sm"></div>
                </div>
                {/* Wi-Fi (simple arc) */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="white" className="w-4 h-4">
                  <path d="M10 14a2 2 0 100 4 2 2 0 000-4zm-6.364-3.636a9 9 0 0112.728 0l-1.414 1.414a7 7 0 00-9.9 0L3.636 10.364zM1.514 8.242a12 12 0 0116.972 0l-1.414 1.414a10 10 0 00-14.144 0L1.514 8.242z" />
                </svg>
                {/* Battery */}
                <div className="flex items-center">
                  <div className="w-5 h-2.5 border border-white rounded-sm relative">
                    <div className="absolute left-[1px] top-[1px] right-[1px] bottom-[1px] bg-white rounded-sm"></div>
                  </div>
                  <div className="w-0.5 h-1.5 bg-white ml-[2px] rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[6px] z-10
                            w-[80px] h-[24px] rounded-full bg-black" />

            {/* Children (rotating icons etc.) */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
