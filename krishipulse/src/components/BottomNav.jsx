import React from 'react';
import { LayoutDashboard, Sprout, TrendingUp, CloudSun, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useApp();

  const navs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'crop-advisor', label: 'Advisor', icon: Sprout },
    { id: 'market-intelligence', label: 'Markets', icon: TrendingUp },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'farm-management', label: 'Parcels', icon: ShieldCheck },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6] dark:bg-slate-950 border-t border-[#C4C4BE] dark:border-slate-800 px-4 py-2 flex items-center justify-around">
      {navs.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 text-[10px] font-black transition-colors ${
              isActive ? 'text-emerald-800 dark:text-emerald-400' : 'text-black dark:text-slate-300'
            }`}
          >
            <Icon className="h-5 w-5 stroke-[2.25]" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
