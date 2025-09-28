'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Heroicons (swap with custom icons anytime)
import { LightBulbIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon, ViewColumnsIcon } from '@heroicons/react/24/solid';

const icons = [
  { id: 'lights', component: LightBulbIcon, label: 'Lights' },
  { id: 'curtains', component: ViewColumnsIcon, label: 'Curtains' }, // placeholder
  { id: 'climate', component: AdjustmentsHorizontalIcon, label: 'Climate' },
  { id: 'security', component: LockClosedIcon, label: 'Security' },
];

export default function RotatingIcons() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 3000); // 3s per icon
    return () => clearInterval(interval);
  }, []);

  const Icon = icons[index].component;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={icons[index].id}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center gap-2"
        >
          {/* Glass pill */}
          <div className="px-4 py-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg flex flex-col items-center">
            <Icon className="w-7 h-7 text-white/90" />
            <span className="text-xs text-white/80 mt-1">{icons[index].label}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
