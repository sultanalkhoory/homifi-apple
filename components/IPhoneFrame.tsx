'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

export default function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      className="relative inline-block w-[240px] sm:w-[280px] md:w-[320px] lg:w-[380px] xl:w-[420px]"
    >
      {/* Outer device frame */}
      <div className="relative aspect-[9/19.5] rounded-[42px] bg-black shadow-iphone overflow-hidden">

        {/* Metallic rim highlight */}
        <div className="absolute inset-0 rounded-[42px] border-[2px] border-gray-700/60 shadow-[inset_0_0_4px_rgba(255,255,255,0.15)]" />

        {/* Inner bezel */}
        <div className="absolute inset-[6px] rounded-[36px] bg-black shadow-[inset_0_0_6px_rgba(0,0,0,0.6)]">

          {/* Dynamic Island / notch */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[110px] h-[32px] rounded-full bg-black shadow-[inset_0_-1px_2px_rgba(255,255,255,0.12)]" />

          {/* Screen with gloss overlay */}
          <div className="absolute top-[46px] bottom-[18px] left-[8px] right-[8px] rounded-[30px] overflow-hidden bg-black">
            <div className="relative w-full h-full">
              {/* Screen content */}
              {children}

              {/* Subtle glossy reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
