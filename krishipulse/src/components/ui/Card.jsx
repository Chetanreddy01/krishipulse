/**
 * Card UI Primitive (Pure JavaScript JSX)
 * Apple / Stripe style card container with smooth cubic-bezier hover transition & subtle shadow.
 */
import React from 'react';

export function Card({ children, className = '', hoverable = false, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-xs transition-all duration-200 ease-out ${
        hoverable ? 'hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-500/40' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
