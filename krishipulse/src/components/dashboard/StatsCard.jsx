import React from 'react';
import { Card } from '../common/Card.jsx';
import { Badge } from '../common/Badge.jsx';
import { ProgressBar } from '../common/ProgressBar.jsx';

export function StatsCard({ title, icon: Icon, value, unit, subtitle, badgeText, badgeVariant = 'emerald', progressValue }) {
  return (
    <Card hoverable className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="caption-text font-black text-black/60 dark:text-slate-400">{title}</span>
        <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-800 dark:text-emerald-400 border border-emerald-500/20">
          <Icon className="h-4 w-4 stroke-[2]" />
        </div>
      </div>
      <div className="text-[28px] font-black text-black dark:text-white tracking-tight">
        {value} {unit && <span className="text-sm font-bold text-black/60 dark:text-slate-400">{unit}</span>}
      </div>
      {progressValue !== undefined ? (
        <div className="space-y-1">
          <ProgressBar value={progressValue} color="emerald" height="h-1.5" />
          <span className="text-[11px] text-black/60 dark:text-slate-400 font-black block text-right">{subtitle}</span>
        </div>
      ) : (
        <div className="flex items-center justify-between text-[13px] font-black">
          <span className="text-black/70 dark:text-slate-300">{subtitle}</span>
          {badgeText && <Badge variant={badgeVariant}>{badgeText}</Badge>}
        </div>
      )}
    </Card>
  );
}
