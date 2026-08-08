import React from 'react';
import { Sun, Wind, Droplets, ShieldAlert, CloudRain } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { mockWeatherDataByDistrict } from '../data/mockWeatherData.js';
import { Card } from '../components/common/Card.jsx';
import { Badge } from '../components/common/Badge.jsx';

export function Weather() {
  const { selectedDistrict } = useApp();
  const weather = mockWeatherDataByDistrict[selectedDistrict] || mockWeatherDataByDistrict['Mandya'];

  return (
    <div className="space-y-6 pb-16">
      <Card className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-2xl sm:text-3xl font-black text-black dark:text-white">Micro-Climate Weather Dashboard</h1>
          <p className="body-text text-xs text-black dark:text-slate-300 font-extrabold mt-1">
            Real-time agricultural weather station feeds & pesticide spraying advisory window.
          </p>
        </div>

        <Badge variant="emerald" size="md">{selectedDistrict.toUpperCase()} STATION</Badge>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-4">
            <div>
              <div className="text-xs text-black dark:text-slate-300 font-extrabold">{weather.locationName}</div>
              <h2 className="text-4xl font-black text-black dark:text-white tracking-tight mt-1">{weather.currentTempC}°C</h2>
              <div className="text-sm font-black text-emerald-800 dark:text-emerald-400 mt-1">{weather.condition}</div>
            </div>

            <Sun className="h-16 w-16 text-amber-500 animate-spin-slow" />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800">
              <Droplets className="h-4 w-4 text-emerald-700 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-[10px] text-black dark:text-slate-300 font-bold uppercase">Humidity</div>
              <div className="text-sm font-black text-black dark:text-white">{weather.humidityPct}%</div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800">
              <Wind className="h-4 w-4 text-emerald-700 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-[10px] text-black dark:text-slate-300 font-bold uppercase">Wind Speed</div>
              <div className="text-sm font-black text-black dark:text-white">{weather.windSpeedKmh} km/h</div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800">
              <CloudRain className="h-4 w-4 text-emerald-700 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-[10px] text-black dark:text-slate-300 font-bold uppercase">24h Rain</div>
              <div className="text-sm font-black text-black dark:text-white">{weather.rainfall24hMm} mm</div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-3 mb-4">
              <h3 className="card-title text-base font-black text-black dark:text-white flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                <span>Agricultural Spraying Advisory Window</span>
              </h3>
              <Badge variant="emerald">{weather.sprayingAdvisory.status}</Badge>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 space-y-2">
              <div className="text-sm font-black text-emerald-950 dark:text-emerald-300">
                Spraying Safety Status: {weather.sprayingAdvisory.status}
              </div>
              <p className="text-xs text-black dark:text-slate-200 font-extrabold leading-relaxed">
                {weather.sprayingAdvisory.reason} Optimal conditions for pesticide application between 06:00 AM - 09:30 AM today.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 flex items-center justify-between text-xs font-black">
            <span className="text-black dark:text-slate-300">Evapotranspiration Index (ET0):</span>
            <span className="font-mono text-emerald-900 dark:text-emerald-300">{weather.evapotranspirationEt0Mm} mm/day</span>
          </div>
        </Card>
      </div>

      <Card className="space-y-4">
        <h3 className="card-title text-base font-black text-black dark:text-white">7-Day Agricultural Micro-Climate Forecast</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {weather.weeklyForecast.map(item => (
            <div key={item.day} className="p-3.5 rounded-xl border border-[#C4C4BE] bg-[#FAF9F6] dark:bg-slate-900 text-center space-y-1">
              <div className="text-xs font-black text-black dark:text-white">{item.day} ({item.date})</div>
              <div className="text-sm font-black text-emerald-800 dark:text-emerald-400 mt-1">{item.maxTemp}° / {item.minTemp}°</div>
              <div className="text-[11px] text-black dark:text-slate-300 font-bold">{item.condition}</div>
              <div className="text-[10px] text-blue-700 dark:text-blue-400 font-black">Rain: {item.rainProbPct}%</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
