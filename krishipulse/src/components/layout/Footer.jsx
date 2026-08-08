import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-[#E2DFD7] dark:border-slate-800 py-6 px-6 sm:px-8 mt-auto text-xs text-black dark:text-slate-300 font-extrabold flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        KrishiPulse — Built for Chetan (7338025342 • chetanreddy445@gmail.com)
      </div>
      <div className="flex items-center gap-4">
        <span>Mandya APMC Hub</span>
        <span>•</span>
        <span>Karnataka Agriculture SaaS</span>
      </div>
    </footer>
  );
}
