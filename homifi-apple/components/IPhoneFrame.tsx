'use client';
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";

export default function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={scaleIn} initial="hidden" animate="show" className="relative inline-block" style={{ width: 320 }}>
      {/* Screen area: adjust paddings to align with your bezel asset */}
      <div className="absolute" style={{ left: 20, right: 20, top: 24, bottom: 24, borderRadius: 24, overflow: 'hidden' }}>
        {children}
      </div>
      {/* Bezel image (you will add /public/iphone-17pro.png) */}
      <img src="/iphone-17pro.png" alt="iPhone 17 Pro" className="block w-full h-auto drop-shadow-2xl shadow-iphone select-none pointer-events-none" />
    </motion.div>
  );
}