/**
 * Badge UI Primitive (Pure JavaScript JSX)
 * Refined glassmorphism status indicator pills with smooth border transitions.
 */
import React from 'react';

export function Badge({ children, variant = 'emerald', size = 'sm', className = '' }) {
  const variantStyles = {
    emerald: 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 border-emerald-500/30',
    sky: 'bg-sky-500/10 text-sky-900 dark:text-sky-300 border-sky-500/30',
    amber: 'bg-amber-500/10 text-amber-900 dark:text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/10 text-rose-900 dark:text-rose-300 border-rose-500/30',
    slate: 'bg-zinc-500/10 text-zinc-900 dark:text-slate-200 border-zinc-500/20'
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs'
  };

  return (
    <span
      className={`inline-flex items-center font-black rounded-full border shadow-2xs transition-transform duration-150 hover:scale-105 ${variantStyles[variant] || variantStyles.emerald} ${sizeStyles[size] || sizeStyles.sm} ${className}`}
    >
      {children}
    </span>
  );
}
