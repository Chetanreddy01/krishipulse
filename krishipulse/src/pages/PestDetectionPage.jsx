import React, { useState } from 'react';
import { Bug, Sparkles, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useApp } from '../context/AppContext.jsx';

export const PestDetectionPage = () => {
  const { showToast } = useApp();
  const [selectedPest, setSelectedPest] = useState('Fall Armyworm');

  const pestsList = [
    {
      name: 'Fall Armyworm',
      crop: 'Maize & Sugarcane',
      risk: 'High',
      treatment: 'Apply Agniastra organic botanical formulation (Neem + Garlic + Green Chilly extract).',
      dosage: '500 ml per 100L water'
    },
    {
      name: 'Tomato Fruit Borer',
      crop: 'Hybrid Tomato',
      risk: 'Moderate',
      treatment: 'Deploy Pheromone Traps @ 12 traps/acre + Spray Neem Oil (10,000 ppm).',
      dosage: '5 ml per Liter water'
    }
  ];

  return (
    <div className="space-y-6 pb-16">
      <Card className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-2xl sm:text-3xl font-black text-black dark:text-white">Pest Diagnostics & Bio-Organics</h1>
          <p className="body-text text-xs text-black dark:text-slate-300 font-extrabold mt-1">
            AI pest diagnostic advisory paired with Karnataka organic botanical treatments.
          </p>
        </div>

        <Badge variant="rose" size="md">PEST RADAR ACTIVE</Badge>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pestsList.map(pest => (
          <Card key={pest.name} hoverable className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-3">
              <div>
                <h3 className="card-title text-base font-black text-black dark:text-white">{pest.name}</h3>
                <div className="text-xs text-black dark:text-slate-300 font-extrabold">{pest.crop}</div>
              </div>
              <Badge variant={pest.risk === 'High' ? 'rose' : 'amber'}>{pest.risk} Risk</Badge>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 space-y-1">
              <div className="text-xs font-black text-emerald-900 dark:text-emerald-300">Organic Treatment:</div>
              <p className="text-xs text-black dark:text-slate-200 font-bold">{pest.treatment}</p>
            </div>

            <div className="text-[11px] text-black dark:text-slate-300 font-black">
              Recommended Dosage: {pest.dosage}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
