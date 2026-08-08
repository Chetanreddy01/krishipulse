import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export const ToastContainer = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-6 z-50 space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          onClick={() => dismissToast(toast.id)}
          className="pointer-events-auto p-3.5 rounded-2xl border border-[#C4C4BE] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl flex items-start justify-between gap-3 text-xs font-black text-black dark:text-white animate-in slide-in-from-bottom-5 duration-200"
        >
          <div>
            <div className="font-black text-emerald-800 dark:text-emerald-400">{toast.title}</div>
            <div className="text-black dark:text-slate-200 font-bold mt-0.5">{toast.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
