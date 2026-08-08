import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card } from '../common/Card.jsx';

export function MarketCard({ chartData }) {
  return (
    <Card className="space-y-6">
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
          <AreaChart data={chartData}>
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
  );
}
