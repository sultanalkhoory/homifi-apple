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
      {/* Device outer frame */}
      <div className="relative aspect-[9/19.5] rounded-[42px] bg-black shadow-iphone border-[6px] border-black overflow-hidden">
        {/* Inner screen */}
        <div className="absolute inset-0 rounded-[36px] bg-black">
          {/* Notch / Dynamic Island */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[110px] h-[32px] rounded-full bg-black" />

          {/* Screen content */}
          <div className="absolute top-[46px] bottom-[18px] left-[8px] right-[8px] rounded-[30px] overflow-hidden bg-black">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
