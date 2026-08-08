/**
 * Sidebar Component (Pure JavaScript JSX)
 * Navigation drawer with warm linen background, smooth hover micro-transitions, and Chetan profile card.
 */

import React from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  TrendingUp, 
  CloudSun, 
  ShieldCheck, 
  Scan, 
  Bug, 
  Droplet, 
  BarChart3, 
  Landmark, 
  Bell, 
  User, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export const Sidebar = () => {
  const { activeTab, setActiveTab, isSidebarCollapsed, setSidebarCollapsed, notifications } = useApp();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const coreNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'crop-advisor', label: 'Crop Advisor', icon: Sprout },
    { id: 'market-intelligence', label: 'Market Intelligence', icon: TrendingUp, badge: 'Live' },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'farm-management', label: 'Farm Management', icon: ShieldCheck },
  ];

  const precisionLabsNav = [
    { id: 'disease-detection', label: 'Disease Detection', icon: Scan, badge: 'AI' },
    { id: 'pest-detection', label: 'Pest Detection', icon: Bug },
    { id: 'irrigation', label: 'Irrigation', icon: Droplet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'govt-schemes', label: 'Government Schemes', icon: Landmark },
  ];

  const systemNav = [
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifications > 0 ? `${unreadNotifications}` : undefined },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderNavGroup = (title, items) => (
    <div className="space-y-1 py-2">
      {!isSidebarCollapsed && (
        <div className="px-3 text-[11px] font-black text-black/50 dark:text-slate-400 uppercase tracking-widest mb-1.5">
          {title}
        </div>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={isSidebarCollapsed ? item.label : undefined}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-extrabold transition-all duration-150 ease-out group relative ${
              isActive
                ? 'bg-emerald-500/15 text-emerald-950 dark:text-emerald-300 font-black border-l-4 border-emerald-600 shadow-xs'
                : 'text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/[0.06] hover:translate-x-0.5'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <Icon className={`h-5 w-5 stroke-[2.25] shrink-0 transition-transform duration-150 group-hover:scale-110 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-black dark:text-white'}`} />
              {!isSidebarCollapsed && <span className="truncate text-black dark:text-white font-black">{item.label}</span>}
            </div>

            {!isSidebarCollapsed && item.badge && (
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full transition-transform duration-150 group-hover:scale-105 ${
                isActive ? 'bg-emerald-500/20 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-black/10 text-black dark:bg-white/10 dark:text-white'
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <aside
      className={`sticky top-0 z-30 h-screen bg-[var(--bg-sidebar)] border-r border-[var(--border-subtle)] transition-all duration-250 ease-out flex flex-col justify-between hidden md:flex ${
        isSidebarCollapsed ? 'w-16 px-2' : 'w-64 px-4'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between py-5 px-1 border-b border-[var(--border-subtle)] mb-3">
          {!isSidebarCollapsed && (
            <button 
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white font-black shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-150">
                <Sprout className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-base font-black text-black dark:text-white tracking-tight flex items-center gap-1.5">
                  KrishiPulse
                </div>
              </div>
            </button>
          )}

          {isSidebarCollapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white mx-auto shadow-md">
              <Sprout className="h-5 w-5 stroke-[2.5]" />
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg text-black dark:text-white hover:bg-black/5 dark:hover:bg-slate-800 transition-colors ml-auto"
            title="Toggle Sidebar"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4 stroke-[2.5]" /> : <ChevronLeft className="h-4 w-4 stroke-[2.5]" />}
          </button>
        </div>

        {/* Navigation Item Groups */}
        <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-190px)] pr-0.5">
          {renderNavGroup('Core Modules', coreNav)}
          <div className="h-px bg-[var(--border-subtle)] my-2" />
          {renderNavGroup('Precision Labs', precisionLabsNav)}
          <div className="h-px bg-[var(--border-subtle)] my-2" />
          {renderNavGroup('System', systemNav)}
        </div>
      </div>

      {/* User Profile & Theme Switcher Footer */}
      <div className="py-4 border-t border-[var(--border-subtle)] space-y-2">
        
        {/* Dark/Light Quick Toggle */}
        {!isSidebarCollapsed && (
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-black text-black dark:text-white shadow-xs hover:border-emerald-500/40 transition-all duration-150"
          >
            <span className="flex items-center gap-2">
              {isDark ? <Moon className="h-3.5 w-3.5 text-emerald-400" /> : <Sun className="h-3.5 w-3.5 text-amber-500" />}
              <span>{isDark ? 'Dark Mode' : 'Paper White'}</span>
            </span>
            <span className="text-[10px] font-mono text-black/50 dark:text-slate-400">⌘T</span>
          </button>
        )}

        {/* Chetan Profile Card - Luxurious Emerald-Gold Pill */}
        {user && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-emerald-500/10 border border-emerald-500/30 shadow-xs hover:border-emerald-500/50 transition-all duration-150">
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2.5 text-left min-w-0 flex-1"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover shrink-0 border-2 border-emerald-600 dark:border-emerald-400"
              />
              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <div className="text-xs font-black text-black dark:text-white truncate uppercase tracking-wide">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-emerald-800 dark:text-emerald-400 font-extrabold truncate">{user.phone}</div>
                </div>
              )}
            </button>

            {!isSidebarCollapsed && (
              <button
                onClick={logout}
                className="p-1 text-black dark:text-slate-400 hover:text-red-600 transition-colors"
                title="Reset Profile"
              >
                <LogOut className="h-4 w-4 stroke-[2]" />
              </button>
            )}
          </div>
        )}
      </div>

    </aside>
  );
};
