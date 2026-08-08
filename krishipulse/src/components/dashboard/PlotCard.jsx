import React from 'react';
import { Badge } from '../common/Badge.jsx';
import { ProgressBar } from '../common/ProgressBar.jsx';

export function PlotCard({ plot }) {
  return (
    <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 hover:border-emerald-500/40 transition-all duration-150">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-black dark:text-white">{plot.plotName}</span>
        <Badge variant="emerald">{plot.growthStage}</Badge>
      </div>
      <div className="flex items-center justify-between text-xs text-black/80 dark:text-slate-200 font-extrabold">
        <span>{plot.currentCrop} ({plot.areaAcres} Acres)</span>
        <span className="text-emerald-900 dark:text-emerald-400 font-black">{plot.healthScorePct}% Health</span>
      </div>
      <ProgressBar value={plot.healthScorePct} color="emerald" height="h-1.5" />
    </div>
  );
}
