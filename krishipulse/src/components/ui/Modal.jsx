/**
 * Modal UI Primitive (Pure JavaScript JSX)
 * Centered modal dialog with backdrop blur and smooth motion transitions.
 */
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 dark:bg-slate-950/80 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className={`relative z-10 w-full ${maxWidth} overflow-hidden rounded-2xl border border-[#C4C4BE] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-150 p-6 space-y-4`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-3">
          <h3 className="text-lg font-black text-black dark:text-white tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-black dark:text-slate-300 hover:bg-black/10 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
