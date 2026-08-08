/**
 * Progress UI Primitive (Pure JavaScript JSX)
 * Custom smooth progress bar element.
 */
import React from 'react';

export function Progress({ value = 0, max = 100, color = 'emerald', height = 'h-2', className = '' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorStyles = {
    emerald: 'bg-emerald-600',
    sky: 'bg-sky-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500'
  };

  return (
    <div className={`w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-slate-800 ${height} ${className}`}>
      <div
        className={`${height} ${colorStyles[color] || colorStyles.emerald} transition-all duration-300 ease-out rounded-full`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
