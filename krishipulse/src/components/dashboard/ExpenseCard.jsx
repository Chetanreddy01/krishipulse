import React from 'react';
import { Badge } from '../common/Badge.jsx';
import { formatCurrency } from '../../utils/formatters.js';

export function ExpenseCard({ expense, plotName }) {
  return (
    <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-between text-xs font-black">
      <div>
        <div className="text-black dark:text-white font-black">{plotName || 'Farm Plot'}</div>
        <div className="text-[11px] text-black/60 dark:text-slate-400 font-bold mt-0.5">{expense.notes} • {expense.date}</div>
      </div>

      <div className="text-right">
        <Badge variant="amber" className="mb-1">{expense.category}</Badge>
        <div className="font-mono text-emerald-900 dark:text-emerald-300 font-black">{formatCurrency(expense.amountRs)}</div>
      </div>
    </div>
  );
}
