import React from 'react';
import { Sun, ShieldAlert, Droplets, Wind, CloudRain } from 'lucide-react';
import { Card } from '../common/Card.jsx';
import { Badge } from '../common/Badge.jsx';

export function WeatherCard({ weather }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <h3 className="card-title text-base font-black text-black dark:text-white flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
          <span>Micro-Climate Telemetry</span>
        </h3>
        <Badge variant="emerald">{weather.sprayingAdvisory.status}</Badge>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-black text-black dark:text-white">{weather.currentTempC}°C</div>
          <div className="text-xs font-black text-emerald-800 dark:text-emerald-400 mt-0.5">{weather.condition}</div>
        </div>
        <Sun className="h-12 w-12 text-amber-500" />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center pt-2">
        <div className="p-2 rounded-xl bg-[var(--bg-sidebar)] border border-[var(--border-subtle)]">
          <div className="text-[10px] text-black/60 dark:text-slate-400 font-bold">Humidity</div>
          <div className="text-xs font-black text-black dark:text-white mt-0.5">{weather.humidityPct}%</div>
        </div>

        <div className="p-2 rounded-xl bg-[var(--bg-sidebar)] border border-[var(--border-subtle)]">
          <div className="text-[10px] text-black/60 dark:text-slate-400 font-bold">Wind</div>
          <div className="text-xs font-black text-black dark:text-white mt-0.5">{weather.windSpeedKmh} km/h</div>
        </div>

        <div className="p-2 rounded-xl bg-[var(--bg-sidebar)] border border-[var(--border-subtle)]">
          <div className="text-[10px] text-black/60 dark:text-slate-400 font-bold">Rain 24h</div>
          <div className="text-xs font-black text-black dark:text-white mt-0.5">{weather.rainfall24hMm} mm</div>
        </div>
      </div>
    </Card>
  );
}
