'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

export default function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      className="relative inline-block"
      style={{ width: 320 }}
    >
      {/* Outer device frame */}
      <div className="relative aspect-[9/19.5] rounded-[42px] bg-black shadow-iphone">
        {/* Bezel thickness */}
        <div className="absolute inset-[10px] rounded-[36px] bg-black">
          {/* Screen (content goes here) */}
          <div className="absolute inset-[6px] rounded-[30px] overflow-hidden bg-black">
            {/* Your room image / UI */}
            <div className="w-full h-full">{children}</div>
          </div>

          {/* Dynamic Island / notch */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[112px] h-[32px] rounded-full bg-black shadow-[inset_0_-1px_0_rgba(255,255,255,0.12)]" />
        </div>
      </div>
    </motion.div>
  );
}
