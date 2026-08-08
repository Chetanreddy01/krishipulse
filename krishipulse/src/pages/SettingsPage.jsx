import React from 'react';
import { Settings, Moon, Sun, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useApp } from '../context/AppContext.jsx';

export const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useApp();

  return (
    <div className="space-y-6 pb-16">
      <Card className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-2xl sm:text-3xl font-black text-black dark:text-white">Workspace Settings</h1>
          <p className="body-text text-xs text-black dark:text-slate-300 font-extrabold mt-1">
            Configure application theme, APMC mandi telemetry defaults, and preferences.
          </p>
        </div>
      </Card>

      <Card className="space-y-4">
        <h3 className="card-title text-base font-black text-black dark:text-white">Appearance & Theme Preferences</h3>
        
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800">
          <div>
            <div className="text-sm font-black text-black dark:text-white">Theme Mode ({isDark ? 'Linear Midnight Dark' : 'Paper White Light'})</div>
            <div className="text-xs text-black dark:text-slate-300 font-bold mt-0.5">Toggle between Paper White and Dark mode</div>
          </div>

          <Button onClick={toggleTheme} variant="secondary" size="md">
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-emerald-700" />}
            <span>Switch to {isDark ? 'Paper White' : 'Dark Mode'}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
