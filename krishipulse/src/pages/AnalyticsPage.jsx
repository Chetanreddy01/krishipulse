import React from 'react';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { useApp } from '../context/AppContext.jsx';

export const AnalyticsPage = () => {
  const { plots } = useApp();

  const totalRev = plots.reduce((acc, p) => acc + p.expectedRevenueRs, 0);
  const totalExp = plots.reduce((acc, p) => acc + p.totalExpensesRs, 0);
  const netProfit = totalRev - totalExp;

  return (
    <div className="space-y-6 pb-16">
      <Card className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-2xl sm:text-3xl font-black text-black dark:text-white">Financial Analytics & Yield Reports</h1>
          <p className="body-text text-xs text-black dark:text-slate-300 font-extrabold mt-1">
            Profit margins, cost breakdown ledger, and yield analytics.
          </p>
        </div>

        <Badge variant="emerald" size="md">PROFIT MARGIN: {Math.round((netProfit / (totalRev || 1)) * 100)}%</Badge>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-2">
          <div className="text-xs text-black dark:text-slate-300 font-bold uppercase">Total Expected Revenue</div>
          <div className="text-3xl font-black text-emerald-900 dark:text-emerald-300">₹{(totalRev / 100000).toFixed(2)} Lakhs</div>
        </Card>

        <Card className="space-y-2">
          <div className="text-xs text-black dark:text-slate-300 font-bold uppercase">Total Input Expenses</div>
          <div className="text-3xl font-black text-red-600">₹{(totalExp / 100000).toFixed(2)} Lakhs</div>
        </Card>

        <Card className="space-y-2">
          <div className="text-xs text-black dark:text-slate-300 font-bold uppercase">Net Projected Profit</div>
          <div className="text-3xl font-black text-black dark:text-white">₹{(netProfit / 100000).toFixed(2)} Lakhs</div>
        </Card>
      </div>
    </div>
  );
};
