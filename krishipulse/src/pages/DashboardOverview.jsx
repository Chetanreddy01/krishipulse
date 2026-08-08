/**
 * Dashboard Overview Module (Pure JavaScript JSX)
 * Author: Chetan (Mandya Region)
 * 
 * Features:
 * - Chetan Name Highlight Pill Badge
 * - Weather Summary Widget
 * - 4 Stripe-style KPI cards
 * - Recharts APMC 30-Day Commodity Price Trend
 * - Active Land Plots overview
 * - Today's Field Agenda task list
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sprout, 
  ShieldCheck, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sun
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../context/AppContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { mockPriceTrendChartData } from '../data/mockApmcData.js';
import { mockWeatherDataByDistrict } from '../data/mockWeatherData.js';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Progress } from '../components/ui/Progress.jsx';

export const DashboardOverview = () => {
  const { setActiveTab, selectedDistrict, plots, tasks, toggleTaskStatus } = useApp();
  const { user } = useAuth();
  const [agendaFilter, setAgendaFilter] = useState('All');

  const weather = mockWeatherDataByDistrict[selectedDistrict] || mockWeatherDataByDistrict['Mandya'];
  const userName = user ? user.name : 'Chetan';

  const totalFarmArea = plots.reduce((acc, p) => acc + p.areaAcres, 0);
  const totalExpectedRevenue = plots.reduce((acc, p) => acc + p.expectedRevenueRs, 0);
  const pendingTasks = tasks.filter(t => t.status !== 'Completed').length;
  const avgHealthScore = Math.round(plots.reduce((acc, p) => acc + p.healthScorePct, 0) / (plots.length || 1));

  const filteredTasks = tasks.filter(t => {
    if (agendaFilter === 'All') return true;
    return t.category.toLowerCase().includes(agendaFilter.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12 animate-page-entry">
      
      {/* Handcrafted Header: Welcome Greeting + Integrated Weather Summary */}
      <Card className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-black text-black dark:text-white tracking-tight flex items-center gap-2 flex-wrap">
            Good Evening, <span className="bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 text-black dark:text-white px-3.5 py-1 rounded-xl border border-amber-500/40 font-black shadow-xs backdrop-blur-sm">{userName}</span> <span className="text-2xl">👋</span>
          </h1>
          <p className="text-[14px] text-black/70 dark:text-slate-300 font-extrabold mt-1">
            Here's your farm overview for <span className="text-emerald-800 dark:text-emerald-400 font-black">{selectedDistrict} Region</span> today.
          </p>
        </div>

        {/* Integrated Weather & Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xs">
            <Sun className="h-5 w-5 text-amber-500 shrink-0 animate-spin-slow" />
            <div>
              <div className="text-xs font-black text-black dark:text-white">{weather.currentTempC}°C · {weather.condition}</div>
              <div className="text-[11px] text-black/70 dark:text-slate-300 font-black">Spraying Index: <strong className="text-emerald-800 dark:text-emerald-400 font-black">{weather.sprayingAdvisory.status}</strong></div>
            </div>
          </div>

          <Button onClick={() => setActiveTab('crop-advisor')} variant="primary" size="md">
            <Sprout className="h-4 w-4" />
            <span>Run Crop Advisor</span>
          </Button>

          <Button onClick={() => setActiveTab('market-intelligence')} variant="secondary" size="md">
            <TrendingUp className="h-4 w-4 text-emerald-800 dark:text-emerald-400" />
            <span>Market Feeds</span>
          </Button>
        </div>
      </Card>

      {/* KPI Stat Cards (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1 */}
        <Card hoverable className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="caption-text font-black text-black/60 dark:text-slate-400">Active Managed Land</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-800 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4 stroke-[2]" />
            </div>
          </div>
          <div className="text-[28px] font-black text-black dark:text-white tracking-tight">
            {totalFarmArea} <span className="text-sm font-bold text-black/60 dark:text-slate-400">Acres</span>
          </div>
          <div className="flex items-center justify-between text-[13px] font-black">
            <span className="text-black/70 dark:text-slate-300">{plots.length} Parcels Active</span>
            <Badge variant="emerald">+2.5 Acres</Badge>
          </div>
        </Card>

        {/* KPI 2 */}
        <Card hoverable className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="caption-text font-black text-black/60 dark:text-slate-400">Pending Farm Tasks</span>
            <div className="h-8 w-8 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-800 dark:text-sky-400 border border-sky-500/20">
              <Clock className="h-4 w-4 stroke-[2]" />
            </div>
          </div>
          <div className="text-[28px] font-black text-black dark:text-white tracking-tight">
            {pendingTasks} <span className="text-sm font-bold text-black/60 dark:text-slate-400">Tasks</span>
          </div>
          <div className="flex items-center justify-between text-[13px] font-black">
            <span className="text-black/70 dark:text-slate-300">1 High Priority</span>
            <Badge variant="sky">Scheduled</Badge>
          </div>
        </Card>

        {/* KPI 3 */}
        <Card hoverable className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="caption-text font-black text-black/60 dark:text-slate-400">Projected Harvest Value</span>
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-800 dark:text-amber-400 border border-amber-500/20">
              <DollarSign className="h-4 w-4 stroke-[2]" />
            </div>
          </div>
          <div className="text-[28px] font-black text-black dark:text-white tracking-tight">
            ₹{(totalExpectedRevenue / 100000).toFixed(1)}L
          </div>
          <div className="flex items-center justify-between text-[13px] font-black">
            <span className="text-black/70 dark:text-slate-300">Target Market Value</span>
            <Badge variant="amber">+4.2% APMC Gain</Badge>
          </div>
        </Card>

        {/* KPI 4 */}
        <Card hoverable className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="caption-text font-black text-black/60 dark:text-slate-400">Overall Crop Health</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-800 dark:text-emerald-400 border border-emerald-500/20">
              <Sprout className="h-4 w-4 stroke-[2]" />
            </div>
          </div>
          <div className="text-[28px] font-black text-black dark:text-white tracking-tight">
            {avgHealthScore}%
          </div>
          <div className="space-y-1">
            <Progress value={avgHealthScore} color="emerald" height="h-1.5" />
            <span className="text-[11px] text-black/60 dark:text-slate-400 font-black block text-right">Optimal Growth Index</span>
          </div>
        </Card>

      </div>

      {/* Main Grid: Recharts APMC Price Trend + Active Parcels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Recharts APMC 30-Day Trend */}
        <Card className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="card-title font-black text-black dark:text-white">Karnataka APMC Mandi Price Trends (30 Days)</h3>
              <p className="body-text text-xs text-black/70 dark:text-slate-300 font-bold mt-0.5">Commodity trading price in ₹ per Quintal across major Karnataka mandis.</p>
            </div>
            
            <div className="flex items-center gap-3 text-xs font-black">
              <span className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-600" /> Ragi</span>
              <span className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300"><span className="h-2 w-2 rounded-full bg-amber-500" /> Tomato</span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPriceTrendChartData}>
                <defs>
                  <linearGradient id="colorRagi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTomato" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="day" stroke="var(--text-primary)" tick={{ fontSize: 12, fontWeight: 800 }} />
                <YAxis stroke="var(--text-primary)" tick={{ fontSize: 12, fontWeight: 800 }} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', borderRadius: '14px', fontSize: '12px', fontWeight: 'bold', color: 'var(--text-primary)', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }} 
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="Ragi" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRagi)" />
                <Area type="monotone" dataKey="Tomato" stroke="#D97706" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTomato)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Right 4 Cols: Active Farm Plots Overview */}
        <Card className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-4">
              <h3 className="card-title text-base font-black text-black dark:text-white">Active Managed Plots</h3>
              <button 
                onClick={() => setActiveTab('farm-management')}
                className="text-xs text-emerald-900 dark:text-emerald-400 font-black hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-3">
              {plots.slice(0, 3).map(plot => (
                <div key={plot.id} className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 hover:border-emerald-500/40 transition-all duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-black dark:text-white">{plot.plotName}</span>
                    <Badge variant="emerald">{plot.growthStage}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-black/80 dark:text-slate-200 font-extrabold">
                    <span>{plot.currentCrop} ({plot.areaAcres} Acres)</span>
                    <span className="text-emerald-900 dark:text-emerald-400 font-black">{plot.healthScorePct}% Health</span>
                  </div>
                  <Progress value={plot.healthScorePct} color="emerald" height="h-1.5" />
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setActiveTab('farm-management')}
            variant="secondary"
            className="w-full"
          >
            <span>Manage Field Parcels</span>
          </Button>
        </Card>

      </div>

      {/* Operational Agenda */}
      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <h3 className="section-title text-lg font-black text-black dark:text-white">Today's Field Agenda</h3>
            <p className="body-text text-xs text-black/70 dark:text-slate-300 font-extrabold">Scheduled operational tasks for active farm plots.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-[var(--bg-sidebar)] p-1 rounded-xl border border-[var(--border-subtle)]">
            {['All', 'Irrigation', 'Fertigation'].map(filter => (
              <button
                key={filter}
                onClick={() => setAgendaFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all duration-150 ${
                  agendaFilter === filter
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-black/70 dark:text-slate-200 hover:text-black'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              onClick={() => toggleTaskStatus(task.id)}
              className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between hover:-translate-y-0.5 ${
                task.status === 'Completed'
                  ? 'bg-black/5 dark:bg-slate-950 border-[var(--border-subtle)] text-black opacity-60'
                  : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-emerald-500/40 text-black dark:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <button className={`h-5 w-5 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  task.status === 'Completed' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-black'
                }`}>
                  {task.status === 'Completed' && <CheckCircle2 className="h-3.5 w-3.5" />}
                </button>
                <div>
                  <div className={`text-sm font-black ${task.status === 'Completed' ? 'line-through text-black/60' : 'text-black dark:text-white'}`}>
                    {task.title}
                  </div>
                  <div className="text-xs text-black/70 dark:text-slate-300 font-extrabold mt-0.5">Category: {task.category} • Due: {task.dueDate}</div>
                </div>
              </div>

              <Badge variant={task.priority === 'High' ? 'rose' : 'slate'}>
                {task.priority} Priority
              </Badge>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};
