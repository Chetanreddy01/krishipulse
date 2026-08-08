/**
 * Navbar Component (Pure JavaScript JSX)
 * Header breadcrumbs, Mandi Region Selector, Command Palette (⌘K) search engine, Theme Toggle, and Chetan Badge.
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  Search, 
  Bell, 
  Menu, 
  X, 
  Moon,
  Sun,
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
  Settings,
  ArrowRight,
  LogIn
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { karnatakaDistricts } from '../data/mockApmcData.js';
import { Button } from './ui/Button.jsx';

export const Navbar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    selectedDistrict, 
    setSelectedDistrict, 
    notifications, 
    showToast,
    apmcPrices,
    plots
  } = useApp();
  const { user, isAuthenticated, setAuthModalOpen } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const pageTitleMap = {
    landing: 'Home',
    dashboard: 'Dashboard Overview',
    'crop-advisor': 'Crop Advisor & Agronomy Engine',
    'market-intelligence': 'Karnataka APMC Mandi Intelligence',
    weather: 'Micro-Climate Weather Dashboard',
    'farm-management': 'Farm Management & Operations Ledger',
    'disease-detection': 'AI Plant Disease Detection',
    'pest-detection': 'Pest Diagnostics & Organics',
    irrigation: 'Smart Irrigation & Telemetry',
    analytics: 'Financial Analytics & Yield Benchmarks',
    'govt-schemes': 'Karnataka Govt Schemes & Subsidies',
    notifications: 'System Alert Feeds',
    profile: 'User Profile & Preferences',
    settings: 'Workspace Settings'
  };

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'crop-advisor', label: 'Crop Advisor AI', icon: Sprout },
    { id: 'market-intelligence', label: 'APMC Market Intelligence', icon: TrendingUp },
    { id: 'weather', label: 'Weather Forecast', icon: CloudSun },
    { id: 'farm-management', label: 'Farm Management', icon: ShieldCheck },
    { id: 'disease-detection', label: 'Disease AI', icon: Scan },
    { id: 'pest-detection', label: 'Pest AI', icon: Bug },
    { id: 'irrigation', label: 'Smart Irrigation', icon: Droplet },
    { id: 'analytics', label: 'Financial Analytics', icon: BarChart3 },
    { id: 'govt-schemes', label: 'Govt Subsidies', icon: Landmark },
    { id: 'notifications', label: 'Alert Feeds', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // ⌘K Keyboard Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // Search Results Filtering
  const filteredPages = navLinks.filter(l => 
    l.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPrices = apmcPrices.filter(p => 
    p.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.mandiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlots = plots.filter(pl =>
    pl.plotName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pl.currentCrop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--header-bg)] backdrop-blur-md transition-all duration-200">
        <div className="flex h-16 items-center justify-between px-6 sm:px-8">
          
          {/* Left: Breadcrumb & Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-black text-black dark:text-slate-200">
              <span className="text-black/50 dark:text-slate-400 hidden sm:inline font-bold">Workspace</span>
              <span className="text-black/40 dark:text-slate-600 hidden sm:inline">/</span>
              <span className="text-black dark:text-white font-black text-sm tracking-tight">{pageTitleMap[activeTab]}</span>
            </div>

            {/* District Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setDistrictDropdownOpen(!districtDropdownOpen)}
                className="flex items-center gap-1.5 rounded-xl bg-[var(--bg-card)] px-3 py-1.5 text-xs font-black text-black dark:text-white border border-[var(--border-subtle)] hover:border-emerald-500/40 transition-all duration-150 shadow-xs"
              >
                <MapPin className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>{selectedDistrict}</span>
                <ChevronDown className="h-3.5 w-3.5 text-black dark:text-slate-300" />
              </button>

              {districtDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2 shadow-xl backdrop-blur-xl z-50">
                  <div className="px-2.5 py-1 text-[11px] font-black text-black/50 dark:text-slate-400 uppercase tracking-wider">
                    Karnataka Mandi Region
                  </div>
                  <div className="max-h-56 overflow-y-auto space-y-0.5">
                    {karnatakaDistricts.map(d => (
                      <button
                        key={d}
                        onClick={() => {
                          setSelectedDistrict(d);
                          setDistrictDropdownOpen(false);
                          showToast('info', 'Mandi Region Switch', `Active region set to ${d}`);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-colors flex items-center justify-between ${
                          selectedDistrict === d ? 'bg-emerald-500/15 text-emerald-950 dark:text-emerald-300 font-black' : 'text-black dark:text-white hover:bg-[var(--bg-hover)]'
                        }`}
                      >
                        <span>{d}</span>
                        {selectedDistrict === d && <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Interactive Search Input, Theme Toggle, Notifications & Profile/Login */}
          <div className="flex items-center gap-3">
            
            {/* Interactive Search Bar Trigger */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] px-3.5 py-1.5 text-xs font-black text-black dark:text-white hover:border-emerald-500/40 transition-all duration-150 shadow-xs"
              >
                <Search className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <span className="font-extrabold text-black dark:text-white">Search crops, mandis, plots...</span>
                <kbd className="rounded bg-black/10 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-black dark:text-slate-200 border border-black/10">⌘K</kbd>
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-black dark:text-white"
              >
                <Search className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              </button>
            </div>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] px-2.5 py-1.5 text-xs text-black dark:text-white hover:border-emerald-500/40 transition-all duration-150 shadow-xs"
              title="Toggle Light / Dark Mode"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-emerald-700" />}
              <span className="hidden sm:inline text-xs font-black text-black dark:text-white">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            {/* Notifications */}
            <button 
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-black dark:text-white hover:text-black transition-all shadow-xs"
            >
              <Bell className="h-4 w-4 stroke-[2]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Chetan Profile Badge / Login Button */}
            {isAuthenticated && user ? (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-emerald-500/10 px-3 py-1 border border-emerald-500/30 shadow-xs hover:scale-105 transition-transform duration-150 backdrop-blur-sm"
                title="Click to Switch or Verify Login"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-6 w-6 rounded-full object-cover shrink-0 border border-emerald-600 dark:border-emerald-400"
                />
                <span className="text-xs font-black text-black dark:text-white uppercase tracking-wider">{user.name}</span>
              </button>
            ) : (
              <Button onClick={() => setAuthModalOpen(true)} variant="primary" size="sm">
                <LogIn className="h-3.5 w-3.5" />
                <span>Log In</span>
              </Button>
            )}

            {/* Mobile Drawer Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-black dark:text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-main)] px-6 py-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-black transition-colors ${
                      activeTab === link.id
                        ? 'bg-emerald-500/20 text-emerald-950 dark:text-emerald-300 border border-emerald-500/30'
                        : 'bg-[var(--bg-card)] text-black dark:text-white border border-[var(--border-subtle)]'
                    }`}
                  >
                    <Icon className="h-4 w-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Interactive Global Search Modal (Command Palette) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          {/* Backdrop */}
          <div 
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-black/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity" 
          />

          {/* Search Card Container */}
          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            
            {/* Input Box */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <Search className="h-5 w-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops (Ragi, Tomato), mandis (Mandya), plots, or pages..."
                className="w-full bg-transparent text-sm font-black text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-slate-400 outline-none"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-black dark:text-white hover:bg-black/10 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
              
              {/* Category 1: Navigation Pages */}
              {filteredPages.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[11px] font-black uppercase tracking-wider text-black/50 dark:text-slate-400">
                    Application Modules ({filteredPages.length})
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {filteredPages.map(page => {
                      const Icon = page.icon;
                      return (
                        <button
                          key={page.id}
                          onClick={() => {
                            setActiveTab(page.id);
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-black text-black dark:text-white hover:bg-emerald-500/15 text-emerald-950 dark:hover:text-emerald-300 flex items-center justify-between transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                            <span>{page.label}</span>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-black/40 dark:text-slate-400 group-hover:text-emerald-700" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Category 2: APMC Mandi Rates */}
              {filteredPrices.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[11px] font-black uppercase tracking-wider text-black/50 dark:text-slate-400 border-t border-[var(--border-subtle)] pt-3">
                    Karnataka APMC Commodities ({filteredPrices.length})
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {filteredPrices.slice(0, 5).map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab('market-intelligence');
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-black dark:text-white hover:bg-black/5 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-black text-black dark:text-white">{item.cropName}</div>
                          <div className="text-[11px] font-bold text-black/60 dark:text-slate-400">{item.mandiName} • {item.district}</div>
                        </div>
                        <div className="text-right font-mono font-black text-emerald-800 dark:text-emerald-400">
                          ₹{item.modalPrice.toLocaleString('en-IN')}/Q
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 3: Land Plots */}
              {filteredPlots.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[11px] font-black uppercase tracking-wider text-black/50 dark:text-slate-400 border-t border-[var(--border-subtle)] pt-3">
                    Field Land Parcels ({filteredPlots.length})
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {filteredPlots.map(plot => (
                      <button
                        key={plot.id}
                        onClick={() => {
                          setActiveTab('farm-management');
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-black dark:text-white hover:bg-black/5 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-black text-black dark:text-white">{plot.plotName}</div>
                          <div className="text-[11px] font-bold text-black/60 dark:text-slate-400">{plot.currentCrop} • {plot.areaAcres} Acres</div>
                        </div>
                        <span className="text-[10px] font-black text-emerald-950 dark:text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                          {plot.healthScorePct}% Health
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty Search Result Fallback */}
              {filteredPages.length === 0 && filteredPrices.length === 0 && filteredPlots.length === 0 && (
                <div className="py-8 text-center text-xs font-bold text-black/60 dark:text-slate-400">
                  No matching crops, mandis, or pages found for "<strong className="text-black dark:text-white font-black">{searchQuery}</strong>".
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2 bg-black/5 dark:bg-slate-900 border-t border-[var(--border-subtle)] text-[11px] font-black text-black/60 dark:text-slate-400 flex items-center justify-between">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-slate-800 border font-mono text-black dark:text-white">ESC</kbd> to close</span>
              <span>KrishiPulse Search Engine</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
