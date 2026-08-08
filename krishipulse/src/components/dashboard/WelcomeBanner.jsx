import React from 'react';
import { Sun, Sprout, TrendingUp } from 'lucide-react';
import { Card } from '../common/Card.jsx';
import { Button } from '../common/Button.jsx';

export function WelcomeBanner({ userName, selectedDistrict, weather, onNavigate }) {
  return (
    <Card className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
      <div>
        <h1 className="text-[28px] font-black text-black dark:text-white tracking-tight flex items-center gap-2 flex-wrap">
          Good Evening, <span className="bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 text-black dark:text-white px-3.5 py-1 rounded-xl border border-amber-500/40 font-black shadow-xs backdrop-blur-sm">{userName}</span> <span className="text-2xl">👋</span>
        </h1>
        <p className="text-[14px] text-black/70 dark:text-slate-300 font-extrabold mt-1">
          Here's your farm overview for <span className="text-emerald-800 dark:text-emerald-400 font-black">{selectedDistrict} Region</span> today.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs">
          <Sun className="h-5 w-5 text-amber-500 shrink-0" />
          <div>
            <div className="text-xs font-black text-black dark:text-white">{weather.currentTempC}°C · {weather.condition}</div>
            <div className="text-[11px] text-black/70 dark:text-slate-300 font-black">Spraying Index: <strong className="text-emerald-800 dark:text-emerald-400 font-black">{weather.sprayingAdvisory.status}</strong></div>
          </div>
        </div>

        <Button onClick={() => onNavigate('crop-advisor')} variant="primary" size="md">
          <Sprout className="h-4 w-4" />
          <span>Run Crop Advisor</span>
        </Button>

        <Button onClick={() => onNavigate('market-intelligence')} variant="secondary" size="md">
          <TrendingUp className="h-4 w-4 text-emerald-800 dark:text-emerald-400" />
          <span>Market Feeds</span>
        </Button>
      </div>
    </Card>
  );
}
