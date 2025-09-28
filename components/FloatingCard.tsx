'use client';

import { motion } from 'framer-motion';

type FloatingCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string; // position classes
};

export default function FloatingCard({ icon, title, subtitle, className }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`absolute rounded-2xl px-4 py-3 bg-white/80 backdrop-blur-md shadow-lg flex items-center gap-3 ${className}`}
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <span className="text-xs text-gray-600">{subtitle}</span>
      </div>
    </motion.div>
  );
}
