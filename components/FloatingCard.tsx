'use client';

import { motion } from 'framer-motion';

type FloatingCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string; // position classes
  delay?: number;     // stagger timing
};

export default function FloatingCard({ icon, title, subtitle, className, delay = 0 }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      className={`absolute rounded-2xl px-4 py-3 bg-white/80 backdrop-blur-md shadow-md flex items-center gap-3 ${className}`}
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <span className="text-xs text-gray-600">{subtitle}</span>
      </div>
    </motion.div>
  );
}
