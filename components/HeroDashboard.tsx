'use client';

import { LightBulbIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon, PlayIcon, DeviceTabletIcon } from '@heroicons/react/24/solid';

export default function HeroDashboard() {
  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-md border border-white/10 rounded-[32px] overflow-y-auto px-4 py-6 flex flex-col gap-6">
      
      {/* === Top Status Pills === */}
      <div className="grid grid-cols-3 gap-3">
        <StatusPill icon={<AdjustmentsHorizontalIcon className="w-4 h-4" />} label="Climate" value="21°–25°" />
        <StatusPill icon={<LightBulbIcon className="w-4 h-4" />} label="Lights" value="2 On" />
        <StatusPill icon={<LockClosedIcon className="w-4 h-4" />} label="Security" value="Disarmed" />
      </div>

      {/* === Scenes === */}
      <div>
        <h4 className="text-xs text-white/60 mb-2">Scenes</h4>
        <div className="flex flex-col gap-2">
          <WidePill icon={<PlayIcon className="w-4 h-4" />} label="Movie Night" />
          <WidePill icon={<PlayIcon className="w-4 h-4" />} label="Dinner" />
        </div>
      </div>

      {/* === Favorites === */}
      <div>
        <h4 className="text-xs text-white/60 mb-2">Favorites</h4>
        <div className="grid grid-cols-2 gap-2">
          <WidePill icon={<DeviceTabletIcon className="w-4 h-4" />} label="Garage Gate" />
          <WidePill icon={<LightBulbIcon className="w-4 h-4" />} label="Bedroom Lamps" />
          <WidePill icon={<LockClosedIcon className="w-4 h-4" />} label="Front Door" />
          <WidePill icon={<LightBulbIcon className="w-4 h-4" />} label="Hall Lights" />
        </div>
      </div>
    </div>
  );
}

/* === Reusable Subcomponents === */

function StatusPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl px-2 py-3 backdrop-blur-sm bg-white/10 border border-white/10 text-white shadow-sm">
      <div className="mb-1">{icon}</div>
      <span className="text-[11px] font-medium">{label}</span>
      <span className="text-[10px] text-white/70">{value}</span>
    </div>
  );
}

function WidePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl px-3 py-2 backdrop-blur-sm bg-white/10 border border-white/10 text-white shadow-sm">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
