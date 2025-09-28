'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LightBulbIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import {
  AdjustmentsHorizontalIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/solid';

type Item = {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // ✅ FIXED
  label: string;
  status: string;
  glow: string; // tailwind radial bg class
};

const ITEMS: Item[] = [
  {
    id: 'lights',
    icon: LightBulbIcon,
    label: 'Lights',
    status: '2 On',
    glow: 'bg-[radial-gradient(60%_60%_at_50%_40%,rgba(255,214,90,0.25),transparent_60%)]',
  },
  {
    id: 'curtains',
    icon: ViewColumnsIcon, // placeholder curtain icon
    label: 'Curtains',
    status: 'Closed',
    glow: 'bg-[radial-gradient(60%_60%_at_50%_40%,rgba(180,200,255,0.25),transparent_60%)]',
  },
  {
    id: 'climate',
    icon: AdjustmentsHorizontalIcon,
    label: 'Climate',
    status: '22° Comfort',
    glow: 'bg-[radial-gradient(60%_60%_at_50%_40%,rgba(110,190,255,0.22),transparent_60%)]',
  },
  {
    id: 'security',
    icon: LockClosedIcon,
    label: 'Security',
    status: 'Disarmed',
    glow: 'bg-[radial-gradient(60%_60%_at_50%_40%,rgba(120,255,170,0.22),transparent_60%)]',
  },
];

export default function RotatingShowcase() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % ITEMS.length), 3000);
    return () => clearInterval(t);
  }, []);

  const It = ITEMS[idx];
  const Icon = It.icon;

  return (
    <div className="relative w-full h-full grid place-items-center">
      {/* Ambient glow */}
      <div
        className={`absolute -z-10 w-[75%] max-w-[260px] aspect-square rounded-full blur-2xl ${It.glow}`}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={It.id}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-[70%] max-w-[260px]"
          aria-live="polite"
        >
          <div className="rounded-3xl px-6 py-7 backdrop-blur-md bg-white/14 border border-white/25 shadow-[0_10px_35px_rgba(0,0,0,0.25)] text-white/95 flex flex-col items-center">
            <Icon className="w-10 h-10 mb-3" />
            <div className="text-lg font-semibold">{It.label}</div>
            <div className="text-sm text-white/80 mt-1">{It.status}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
