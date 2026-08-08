import React from 'react';
import { Sprout, ArrowRight, TrendingUp, ShieldCheck, CloudSun } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';

export const LandingPage = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-black dark:text-white space-y-16 py-12 px-6 sm:px-12 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-12 max-w-3xl mx-auto">
        <Badge variant="emerald" size="md">KARNATAKA APMC INTELLIGENCE SAAS</Badge>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-black dark:text-white">
          Smart Agriculture & Mandi Price Telemetry Platform
        </h1>

        <p className="text-base sm:text-lg font-extrabold text-black dark:text-slate-300">
          Next-generation precision farming engine for Chetan — delivering real-time Karnataka APMC mandi prices, soil-to-crop suitability diagnostics, and traditional organic farming wisdom.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button onClick={() => setActiveTab('dashboard')} variant="primary" size="lg">
            <span>Launch Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button onClick={() => setActiveTab('market-intelligence')} variant="secondary" size="lg">
            <span>View APMC Rates</span>
          </Button>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverable className="space-y-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-900 dark:text-emerald-300">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h3 className="card-title font-black text-black dark:text-white">Mandi Telemetry</h3>
          <p className="text-xs font-extrabold text-black dark:text-slate-300">Live prices across Mandya, Kolar, Belagavi yards with arbitrage gain alerts.</p>
        </Card>

        <Card hoverable className="space-y-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-900 dark:text-emerald-300">
            <Sprout className="h-5 w-5" />
          </div>
          <h3 className="card-title font-black text-black dark:text-white">Crop Advisor AI</h3>
          <p className="text-xs font-extrabold text-black dark:text-slate-300">Soil N-P-K diagnostics combined with ancient Vedic organic formulation recipes.</p>
        </Card>

        <Card hoverable className="space-y-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-900 dark:text-emerald-300">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="card-title font-black text-black dark:text-white">Farm Management</h3>
          <p className="text-xs font-extrabold text-black dark:text-slate-300">Stripe-style land plot records, cost ledgers, and task schedules.</p>
        </Card>
      </div>

    </div>
  );
};
