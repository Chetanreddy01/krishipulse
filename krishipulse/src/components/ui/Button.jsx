/**
 * Button UI Primitive (Pure JavaScript JSX)
 * Linear / Stripe style tactile button with smooth active press animations & subtle glows.
 */
import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-black rounded-xl transition-all duration-150 ease-out active:scale-[0.97] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs cursor-pointer';

  const variantStyles = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30',
    secondary: 'bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-emerald-500/40',
    ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[var(--text-primary)] border-transparent shadow-none hover:translate-y-0',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs gap-2',
    lg: 'px-5 py-2.5 text-sm gap-2.5'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
