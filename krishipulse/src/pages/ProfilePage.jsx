/**
 * Profile Page Module (Pure JavaScript JSX)
 * Displays Chetan's verified enterprise account details.
 */

import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Sprout, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useApp } from '../context/AppContext.jsx';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { setActiveTab } = useApp();

  if (!user) return null;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <Card className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-2xl sm:text-3xl font-black text-black dark:text-white">Enterprise Account Profile</h1>
          <p className="body-text text-xs mt-1 text-black dark:text-slate-300 font-extrabold">
            Verified Karnataka Agricultural Enterprise Owner & Field Operations Manager.
          </p>
        </div>

        <Badge variant="emerald" size="md">VERIFIED OWNER</Badge>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile Details Card */}
        <Card className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-4 border-b border-[#C4C4BE] dark:border-slate-800 pb-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-2xl object-cover shrink-0 border-2 border-emerald-600 shadow-md"
            />
            <div>
              <h3 className="card-title text-2xl font-black text-black dark:text-white">{user.name}</h3>
              <div className="text-xs text-emerald-800 dark:text-emerald-400 font-black capitalize mt-0.5">
                Lead Farmer & Agronomist
              </div>
              <div className="text-xs text-black dark:text-slate-300 font-extrabold mt-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>{user.district} APMC Hub, Karnataka</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-black dark:text-white">
            <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-black dark:text-slate-300 font-bold flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-700 dark:text-emerald-400" /> Mobile Number
              </span>
              <span className="font-mono font-black text-emerald-900 dark:text-emerald-300">{user.phone}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-black dark:text-slate-300 font-bold flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-700 dark:text-emerald-400" /> Primary Email
              </span>
              <span className="font-mono font-black text-black dark:text-white">{user.email}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-black dark:text-slate-300 font-bold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" /> Managed Land Area
              </span>
              <span className="font-mono font-black text-emerald-900 dark:text-emerald-300">{user.farmSizeAcres} Acres</span>
            </div>
          </div>
        </Card>

        {/* Preferred Crops & Enterprise Stats */}
        <Card className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-4 mb-4">
              <h3 className="card-title text-lg font-black text-black dark:text-white flex items-center gap-2">
                <Sprout className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                <span>Primary Managed Commodities & Crops</span>
              </h3>
              <Badge variant="emerald">4 Active Crops</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {user.preferredCrops.map((crop, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 space-y-1">
                  <div className="text-xs font-black text-black dark:text-white flex items-center justify-between">
                    <span>{crop}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div className="text-[11px] font-bold text-black dark:text-slate-300">APMC Mandya Tracked</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#C4C4BE] dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-black dark:text-slate-300">KrishiPulse AI Enterprise Subscription</span>
            <Button onClick={() => setActiveTab('farm-management')} variant="primary" size="sm">
              <span>Go to Farm Operations</span>
            </Button>
          </div>
        </Card>

      </div>

    </div>
  );
};
