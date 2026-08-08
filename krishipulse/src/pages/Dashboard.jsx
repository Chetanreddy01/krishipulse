import React, { useState } from 'react';
import { ShieldCheck, Clock, DollarSign, Sprout, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { mockPriceTrendChartData } from '../data/mockApmcData.js';
import { mockWeatherDataByDistrict } from '../data/mockWeatherData.js';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';

import { WelcomeBanner } from '../components/dashboard/WelcomeBanner.jsx';
import { StatsCard } from '../components/dashboard/StatsCard.jsx';
import { MarketCard } from '../components/dashboard/MarketCard.jsx';
import { PlotCard } from '../components/dashboard/PlotCard.jsx';
import { TaskCard } from '../components/dashboard/TaskCard.jsx';
import { formatLakhs } from '../utils/formatters.js';

export function Dashboard() {
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
    <div className="space-y-6 pb-12">
      <WelcomeBanner
        userName={userName}
        selectedDistrict={selectedDistrict}
        weather={weather}
        onNavigate={setActiveTab}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Managed Land"
          icon={ShieldCheck}
          value={totalFarmArea}
          unit="Acres"
          subtitle={`${plots.length} Parcels Active`}
          badgeText="+2.5 Acres"
          badgeVariant="emerald"
        />

        <StatsCard
          title="Pending Farm Tasks"
          icon={Clock}
          value={pendingTasks}
          unit="Tasks"
          subtitle="1 High Priority"
          badgeText="Scheduled"
          badgeVariant="sky"
        />

        <StatsCard
          title="Projected Harvest Value"
          icon={DollarSign}
          value={formatLakhs(totalExpectedRevenue)}
          subtitle="Target Market Value"
          badgeText="+4.2% APMC Gain"
          badgeVariant="amber"
        />

        <StatsCard
          title="Overall Crop Health"
          icon={Sprout}
          value={`${avgHealthScore}%`}
          subtitle="Optimal Growth Index"
          progressValue={avgHealthScore}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <MarketCard chartData={mockPriceTrendChartData} />
        </div>

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
                <PlotCard key={plot.id} plot={plot} />
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
            <TaskCard key={task.id} task={task} onToggle={toggleTaskStatus} />
          ))}
        </div>
      </Card>
    </div>
  );
}
