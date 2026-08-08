import React, { useState } from 'react';
import { Plus, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { ProgressBar } from '../components/common/ProgressBar.jsx';
import { Modal } from '../components/common/Modal.jsx';
import { formatCurrency } from '../utils/formatters.js';

export function FarmManagement() {
  const { plots, expenses, addPlot, addExpense } = useApp();

  const [addPlotModalOpen, setAddPlotModalOpen] = useState(false);
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);

  const [plotName, setPlotName] = useState('');
  const [areaAcres, setAreaAcres] = useState(3.0);
  const [cropName, setCropName] = useState('Finger Millet (Ragi)');

  const [targetPlotId, setTargetPlotId] = useState(plots[0]?.id || 'plot-1');
  const [expenseCategory, setExpenseCategory] = useState('Fertilizer');
  const [expenseAmount, setExpenseAmount] = useState(5000);
  const [expenseNotes, setExpenseNotes] = useState('');

  const handleCreatePlot = (e) => {
    e.preventDefault();
    if (!plotName) return;
    addPlot({
      plotName,
      district: 'Mandya',
      areaAcres: Number(areaAcres),
      currentCrop: cropName,
      sowingDate: '2026-06-01',
      expectedHarvestDate: '2026-10-15',
      growthStage: 'Vegetative',
      healthScorePct: 95,
      moisturePct: 80,
      totalExpensesRs: 0,
      expectedRevenueRs: Number(areaAcres) * 45000
    });
    setPlotName('');
    setAddPlotModalOpen(false);
  };

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!expenseAmount) return;
    addExpense({
      plotId: targetPlotId,
      category: expenseCategory,
      amountRs: Number(expenseAmount),
      date: new Date().toISOString().split('T')[0],
      notes: expenseNotes || `${expenseCategory} application entry`
    });
    setExpenseAmount(5000);
    setExpenseNotes('');
    setAddExpenseModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16">
      <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title text-2xl sm:text-3xl font-black text-black dark:text-white">Farm Management & Operations Ledger</h1>
          <p className="body-text text-xs text-black dark:text-slate-300 font-extrabold mt-1">
            Track active managed land plots, crop health scores, and financial expense ledgers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setAddPlotModalOpen(true)} variant="primary" size="md">
            <Plus className="h-4 w-4" />
            <span>Add Land Parcel</span>
          </Button>

          <Button onClick={() => setAddExpenseModalOpen(true)} variant="secondary" size="md">
            <DollarSign className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            <span>Log Expense</span>
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plots.map(plot => (
          <Card key={plot.id} hoverable className="space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-3 mb-3">
                <div>
                  <h3 className="card-title text-base font-black text-black dark:text-white">{plot.plotName}</h3>
                  <div className="text-xs text-black dark:text-slate-300 font-extrabold mt-0.5">{plot.currentCrop} • {plot.areaAcres} Acres</div>
                </div>
                <Badge variant="emerald">{plot.growthStage}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black text-black dark:text-white">
                  <span>Crop Health Score:</span>
                  <span className="text-emerald-900 dark:text-emerald-400">{plot.healthScorePct}%</span>
                </div>
                <ProgressBar value={plot.healthScorePct} color="emerald" height="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-center py-2 bg-[#FAF9F6] dark:bg-slate-900 rounded-xl border border-[#C4C4BE] dark:border-slate-800 mt-4">
                <div>
                  <div className="text-[10px] text-black dark:text-slate-300 font-bold uppercase">Expenses</div>
                  <div className="text-xs font-black text-black dark:text-white mt-0.5">{formatCurrency(plot.totalExpensesRs)}</div>
                </div>
                <div className="border-l border-[#C4C4BE] dark:border-slate-800">
                  <div className="text-[10px] text-emerald-800 dark:text-emerald-400 font-black uppercase">Est. Revenue</div>
                  <div className="text-xs font-black text-emerald-900 dark:text-emerald-300 mt-0.5">{formatCurrency(plot.expectedRevenueRs)}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#C4C4BE] dark:border-slate-800 flex items-center justify-between text-[11px] font-black text-black dark:text-slate-300">
              <span>Sown: {plot.sowingDate}</span>
              <span>Harvest: {plot.expectedHarvestDate}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-3">
          <h3 className="card-title text-base font-black text-black dark:text-white">Financial Input Expense Ledger</h3>
          <Badge variant="amber">{expenses.length} Logged Entries</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-black">
            <thead>
              <tr className="border-b border-[#C4C4BE] dark:border-slate-800 text-black dark:text-slate-300 uppercase tracking-wider">
                <th className="pb-3">Date</th>
                <th className="pb-3">Target Plot</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Notes</th>
                <th className="pb-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C4C4BE] dark:divide-slate-800 text-black dark:text-white">
              {expenses.map(exp => (
                <tr key={exp.id} className="hover:bg-black/5 dark:hover:bg-slate-800/50">
                  <td className="py-3 font-mono">{exp.date}</td>
                  <td className="py-3 font-black">{plots.find(p => p.id === exp.plotId)?.plotName || 'Farm Plot'}</td>
                  <td className="py-3"><Badge variant="slate">{exp.category}</Badge></td>
                  <td className="py-3 font-bold text-black dark:text-slate-200">{exp.notes}</td>
                  <td className="py-3 text-right font-mono font-black text-emerald-900 dark:text-emerald-300">{formatCurrency(exp.amountRs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={addPlotModalOpen} onClose={() => setAddPlotModalOpen(false)} title="Register New Land Parcel">
        <form onSubmit={handleCreatePlot} className="space-y-4">
          <div>
            <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">Plot Name</label>
            <input
              type="text"
              value={plotName}
              onChange={(e) => setPlotName(e.target.value)}
              placeholder="e.g. West Field - Finger Millet"
              required
              className="w-full bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 rounded-xl p-2.5 text-xs font-black text-black dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">Area (Acres)</label>
            <input
              type="number"
              step="0.5"
              value={areaAcres}
              onChange={(e) => setAreaAcres(Number(e.target.value))}
              required
              className="w-full bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 rounded-xl p-2.5 text-xs font-black text-black dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">Current Crop</label>
            <input
              type="text"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
              className="w-full bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 rounded-xl p-2.5 text-xs font-black text-black dark:text-white outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button onClick={() => setAddPlotModalOpen(false)} variant="secondary" size="sm">Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Land Plot</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={addExpenseModalOpen} onClose={() => setAddExpenseModalOpen(false)} title="Log Financial Farm Expense">
        <form onSubmit={handleCreateExpense} className="space-y-4">
          <div>
            <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">Target Land Parcel</label>
            <select
              value={targetPlotId}
              onChange={(e) => setTargetPlotId(e.target.value)}
              className="w-full bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 rounded-xl p-2.5 text-xs font-black text-black dark:text-white outline-none"
            >
              {plots.map(p => (
                <option key={p.id} value={p.id}>{p.plotName} ({p.areaAcres} Acres)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">Expense Category</label>
            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="w-full bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 rounded-xl p-2.5 text-xs font-black text-black dark:text-white outline-none"
            >
              <option>Seeds</option>
              <option>Fertilizer</option>
              <option>Labor</option>
              <option>Pesticide</option>
              <option>Irrigation</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">Amount (₹)</label>
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(Number(e.target.value))}
              required
              className="w-full bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 rounded-xl p-2.5 text-xs font-black text-black dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">Receipt Notes</label>
            <input
              type="text"
              value={expenseNotes}
              onChange={(e) => setExpenseNotes(e.target.value)}
              placeholder="e.g. Bio-Jeevamrutha batch purchase"
              className="w-full bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 rounded-xl p-2.5 text-xs font-black text-black dark:text-white outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button onClick={() => setAddExpenseModalOpen(false)} variant="secondary" size="sm">Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Log Expense</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
