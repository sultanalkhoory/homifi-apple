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

          {/* Screen Window */}
          <div className="pointer-events-auto absolute left-[8px] right-[8px] top-[8px] bottom-[8px]
                          rounded-[32px] overflow-hidden relative">

            {/* Full-screen tint + reflection */}
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/3 via-transparent to-black/15" />

            {/* Status Bar */}
            <div className="absolute top-2 left-0 right-0 flex items-center justify-between px-4 text-white text-[13px] font-semibold z-20">
              {/* Time */}
              <span>9:41</span>

              {/* Status icons */}
              <div className="flex items-center gap-2">
                {/* Cellular bars (tallest on right) */}
                <div className="flex gap-[1px]">
                  <div className="w-[2px] h-[6px] bg-white rounded-sm"></div>
                  <div className="w-[2px] h-[8px] bg-white rounded-sm"></div>
                  <div className="w-[2px] h-[10px] bg-white rounded-sm"></div>
                  <div className="w-[2px] h-[12px] bg-white rounded-sm"></div>
                </div>
                {/* Wi-Fi */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 8.5c6-6 14-6 20 0M6 12c4-4 8-4 12 0M10 15.5c2-2 4-2 6 0M12 18.5h0" />
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
