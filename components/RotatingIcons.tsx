'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LightBulbIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon, ViewColumnsIcon } from '@heroicons/react/24/solid';

const icons = [
  { id: 'lights', component: LightBulbIcon, label: 'Lights' },
  { id: 'curtains', component: ViewColumnsIcon, label: 'Curtains' },     // placeholder
  { id: 'climate', component: AdjustmentsHorizontalIcon, label: 'Climate' },
  { id: 'security', component: LockClosedIcon, label: 'Security' },
];

export default function RotatingIcons() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % icons.length), 3000);
    return () => clearInterval(t);
  }, []);

  const Icon = icons[i].component;

  return (
    <div className="w-full h-full grid place-items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={icons[i].id}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-[70%] max-w-[180px] flex justify-center"
        >
          <div className="w-full px-5 py-3 rounded-2xl backdrop-blur-md bg-white/12 border border-white/25 shadow-[0_6px_20px_rgba(0,0,0,0.25)] flex flex-col items-center">
            <Icon className="w-7 h-7 text-white/90" />
            <span className="text-[11px] text-white/80 mt-1">{icons[i].label}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
