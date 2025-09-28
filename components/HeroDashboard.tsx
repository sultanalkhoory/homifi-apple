'use client';

import { LightBulbIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon, PlayIcon, DeviceTabletIcon } from '@heroicons/react/24/solid';

export default function HeroDashboard() {
  return (
    <div className="absolute inset-0 bg-black/40 backdrop-blur-lg border border-white/10 rounded-[32px] px-4 pt-[56px] pb-6 flex flex-col gap-6">
      
      {/* === Top Grid (Quick Status) === */}
      <div className="grid grid-cols-3 gap-3">
        <Tile icon={<AdjustmentsHorizontalIcon className="w-5 h-5" />} label="Climate" value="22° Comfort" />
        <Tile icon={<LightBulbIcon className="w-5 h-5" />} label="Lights" value="2 On" />
        <Tile icon={<LockClosedIcon className="w-5 h-5" />} label="Security" value="Disarmed" />
      </div>

      {/* === Scenes === */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs text-white/60 px-1">Scenes</h4>
        <div className="grid grid-cols-2 gap-3">
          <WideTile icon={<PlayIcon className="w-5 h-5" />} label="Movie Night" />
          <WideTile icon={<PlayIcon className="w-5 h-5" />} label="Dinner" />
        </div>
      </div>

      {/* === Favorites === */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs text-white/60 px-1">Favorites</h4>
        <div className="grid grid-cols-2 gap-3">
          <WideTile icon={<DeviceTabletIcon className="w-5 h-5" />} label="Garage Gate" />
          <WideTile icon={<LightBulbIcon className="w-5 h-5" />} label="Bedroom Lamps" />
          <WideTile icon={<LockClosedIcon className="w-5 h-5" />} label="Front Door" />
          <WideTile icon={<LightBulbIcon className="w-5 h-5" />} label="Hall Lights" />
        </div>
      </div>
    </div>
  );
}

/* === Subcomponents (Apple-style tiles) === */

function Tile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col justify-between rounded-xl p-3 backdrop-blur-md bg-white/10 border border-white/10 text-white shadow-sm h-24">
      <div>{icon}</div>
      <div>
        <div className="text-[11px] font-medium">{label}</div>
        <div className="text-[10px] text-white/70">{value}</div>
      </div>
    </div>
  );
}

function WideTile({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl px-3 py-4 backdrop-blur-md bg-white/10 border border-white/10 text-white shadow-sm">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
