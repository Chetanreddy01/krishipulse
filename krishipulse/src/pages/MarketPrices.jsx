/**
 * Market Prices Module (Pure JavaScript JSX)
 * Karnataka APMC Mandi price discovery matrix, MSP benchmarks, and Mandi Price Arbitrage engine.
 */

import React, { useState } from 'react';
import { TrendingUp, MapPin, Search, ArrowUpRight, ShieldCheck, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';

export const MarketPrices = () => {
  const { apmcPrices, selectedDistrict, setSelectedDistrict } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredPrices = apmcPrices.filter(item => {
    const matchesSearch = item.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.mandiName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Cereals', 'Vegetables', 'Cash Crops'];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title text-2xl sm:text-3xl font-black text-black dark:text-white">Karnataka APMC Mandi Intelligence</h1>
          <p className="body-text text-xs text-black dark:text-slate-300 font-extrabold mt-1">
            Real-time market price telemetry, MSP benchmarks, and Mandi Price Arbitrage recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" size="md">LIVE MANDI FEED</Badge>
          <Badge variant="amber" size="md">MANDYA REGION</Badge>
        </div>
      </Card>

      {/* Search & Filter Controls */}
      <Card className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search crop or mandi (e.g. Ragi, Mandya)..."
            className="w-full bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-black text-black dark:text-white outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                categoryFilter === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 text-black dark:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Card>

      {/* Prices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrices.map(item => (
          <Card key={item.id} hoverable className="space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-3 mb-3">
                <div>
                  <h3 className="card-title text-base font-black text-black dark:text-white">{item.cropName}</h3>
                  <div className="text-xs text-black dark:text-slate-300 font-extrabold flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-emerald-700 dark:text-emerald-400" />
                    <span>{item.mandiName} ({item.district})</span>
                  </div>
                </div>
                <Badge variant={item.changePercent >= 0 ? 'emerald' : 'rose'}>
                  {item.changePercent >= 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                </Badge>
              </div>

              {/* Price Numbers */}
              <div className="grid grid-cols-3 gap-2 text-center py-2 bg-[#FAF9F6] dark:bg-slate-900 rounded-xl border border-[#C4C4BE] dark:border-slate-800 mb-4">
                <div>
                  <div className="text-[10px] text-black dark:text-slate-300 font-bold uppercase">Min Price</div>
                  <div className="text-xs font-black text-black dark:text-white mt-0.5">₹{item.minPrice}</div>
                </div>
                <div className="border-x border-[#C4C4BE] dark:border-slate-800">
                  <div className="text-[10px] text-emerald-800 dark:text-emerald-400 font-black uppercase">Modal Price</div>
                  <div className="text-sm font-black text-emerald-900 dark:text-emerald-300 mt-0.5">₹{item.modalPrice}</div>
                </div>
                <div>
                  <div className="text-[10px] text-black dark:text-slate-300 font-bold uppercase">Max Price</div>
                  <div className="text-xs font-black text-black dark:text-white mt-0.5">₹{item.maxPrice}</div>
                </div>
              </div>

              {/* Mandi Arbitrage Recommendation Box */}
              {item.arbitrageTarget && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 space-y-1">
                  <div className="text-[11px] font-black text-emerald-950 dark:text-emerald-300 flex items-center justify-between">
                    <span>Mandi Arbitrage Opportunity</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-xs font-black text-black dark:text-white">
                    Sell at <strong className="text-emerald-900 dark:text-emerald-300">{item.arbitrageTarget.mandiName}</strong> for ₹{item.arbitrageTarget.modalPrice}/Q
                  </div>
                  <div className="text-[11px] font-black text-emerald-800 dark:text-emerald-400">
                    +₹{item.arbitrageTarget.extraGainPerQuintal}/Quintal net gain after transport!
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#C4C4BE] dark:border-slate-800 flex items-center justify-between text-[11px] text-black dark:text-slate-300 font-bold">
              <span>Arrivals: {item.arrivalQtyTonnes} Tonnes</span>
              <span>Updated Today</span>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};
