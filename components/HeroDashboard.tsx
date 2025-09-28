'use client';

import { LightBulbIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon, PlayIcon, DeviceTabletIcon } from '@heroicons/react/24/solid';

export default function HeroDashboard() {
  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-md border border-white/10 rounded-[32px] px-3 pt-4 pb-5 flex flex-col gap-4">
      
      {/* === Top Status Pills === */}
      <div className="grid grid-cols-3 gap-2">
        <StatusPill icon={<AdjustmentsHorizontalIcon className="w-3.5 h-3.5" />} label="Climate" value="21°–25°" />
        <StatusPill icon={<LightBulbIcon className="w-3.5 h-3.5" />} label="Lights" value="2 On" />
        <StatusPill icon={<LockClosedIcon className="w-3.5 h-3.5" />} label="Security" value="Disarmed" />
      </div>

      {/* === Scenes === */}
      <div className="space-y-1.5">
        <h4 className="text-[10px] text-white/60">Scenes</h4>
        <div className="flex flex-col gap-1.5">
          <WidePill icon={<PlayIcon className="w-3.5 h-3.5" />} label="Movie Night" />
          <WidePill icon={<PlayIcon className="w-3.5 h-3.5" />} label="Dinner" />
        </div>
      </div>

      {/* === Favorites === */}
      <div className="space-y-1.5">
        <h4 className="text-[10px] text-white/60">Favorites</h4>
        <div className="grid grid-cols-2 gap-1.5">
          <WidePill icon={<DeviceTabletIcon className="w-3.5 h-3.5" />} label="Garage Gate" />
          <WidePill icon={<LightBulbIcon className="w-3.5 h-3.5" />} label="Bedroom Lamps" />
          <WidePill icon={<LockClosedIcon className="w-3.5 h-3.5" />} label="Front Door" />
          <WidePill icon={<LightBulbIcon className="w-3.5 h-3.5" />} label="Hall Lights" />
        </div>
      </div>
    </div>
  );
}

/* === Reusable Subcomponents === */

function StatusPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl px-1.5 py-2 backdrop-blur-sm bg-white/10 border border-white/10 text-white shadow-sm">
      <div className="mb-0.5">{icon}</div>
      <span className="text-[9px] font-medium">{label}</span>
      <span className="text-[8px] text-white/70">{value}</span>
    </div>
  );
}

function WidePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 backdrop-blur-sm bg-white/10 border border-white/10 text-white shadow-sm">
      {icon}
      <span className="text-[11px] font-medium">{label}</span>
    </div>
  );
}
