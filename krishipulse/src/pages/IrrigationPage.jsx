import React from 'react';
import { Droplet, Power, Gauge } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useApp } from '../context/AppContext.jsx';

export const IrrigationPage = () => {
  const { plots, showToast } = useApp();

  return (
    <div className="space-y-6 pb-16">
      <Card className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-2xl sm:text-3xl font-black text-black dark:text-white">Smart Irrigation & Telemetry</h1>
          <p className="body-text text-xs text-black dark:text-slate-300 font-extrabold mt-1">
            Soil moisture probes and automated drip fertigation telemetry.
          </p>
        </div>

        <Badge variant="sky" size="md">DRIP VALVES ACTIVE</Badge>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plots.map(plot => (
          <Card key={plot.id} hoverable className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-3">
              <div>
                <h3 className="card-title text-base font-black text-black dark:text-white">{plot.plotName}</h3>
                <div className="text-xs text-black dark:text-slate-300 font-extrabold">{plot.currentCrop}</div>
              </div>
              <Badge variant="sky">{plot.moisturePct}% Moisture</Badge>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 text-center">
              <div className="text-[10px] text-black dark:text-slate-300 font-bold uppercase">Next Fertigation Cycle</div>
              <div className="text-sm font-black text-emerald-900 dark:text-emerald-300 mt-0.5">Today @ 05:30 PM (45 mins)</div>
            </div>

            <Button
              onClick={() => showToast('success', 'Valve Triggered', `Initiated 30-min drip cycle for ${plot.plotName}`)}
              variant="primary"
              className="w-full"
            >
              <Power className="h-4 w-4" />
              <span>Trigger Drip Valve</span>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
