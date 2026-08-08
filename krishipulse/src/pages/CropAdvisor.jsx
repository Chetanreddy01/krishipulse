import React, { useState } from 'react';
import { FlaskConical, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { mockCropSuitabilityList, traditionalMethodsDatabase } from '../data/mockCrops.js';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { ProgressBar } from '../components/common/ProgressBar.jsx';

export function CropAdvisor() {
  const { showToast } = useApp();

  const [nitrogen, setNitrogen] = useState(85);
  const [phosphorus, setPhosphorus] = useState(45);
  const [potassium, setPotassium] = useState(60);
  const [ph, setPh] = useState(6.8);
  const [soilType, setSoilType] = useState('Red Soil');
  const [season, setSeason] = useState('Kharif');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations] = useState(mockCropSuitabilityList);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    showToast('info', 'Running Agronomy Model', 'Evaluating Soil NPK, pH & Climate Telemetry...');

    setTimeout(() => {
      setIsAnalyzing(false);
      showToast('success', 'Analysis Complete', 'Generated optimal crop suitability list.');
    }, 800);
  };

  return (
    <div className="space-y-6 pb-16">
      <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-title text-2xl sm:text-3xl font-black text-black dark:text-white">Crop Advisor & Agronomy Engine</h1>
          <p className="body-text text-xs text-black dark:text-slate-300 font-extrabold mt-1">
            Soil-to-Crop NPK diagnostic algorithm paired with ancient Karnataka organic farming wisdom.
          </p>
        </div>

        <Badge variant="emerald" size="md">SOIL DIAGNOSTICS ACTIVE</Badge>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-5 space-y-6">
          <div className="border-b border-[#C4C4BE] dark:border-slate-800 pb-3">
            <h3 className="card-title text-base font-black text-black dark:text-white flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
              <span>Soil Laboratory Diagnostics</span>
            </h3>
            <p className="text-xs text-black dark:text-slate-300 font-extrabold mt-0.5">Adjust sliders to match your lab test report.</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-black text-black dark:text-white mb-1">
                <span>Nitrogen (N): {nitrogen} kg/ha</span>
                <span className="text-emerald-800 dark:text-emerald-400">Optimal</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                value={nitrogen}
                onChange={(e) => setNitrogen(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-black text-black dark:text-white mb-1">
                <span>Phosphorus (P): {phosphorus} kg/ha</span>
                <span className="text-emerald-800 dark:text-emerald-400">Optimal</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={phosphorus}
                onChange={(e) => setPhosphorus(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-black text-black dark:text-white mb-1">
                <span>Potassium (K): {potassium} kg/ha</span>
                <span className="text-emerald-800 dark:text-emerald-400">Optimal</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                value={potassium}
                onChange={(e) => setPotassium(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-black text-black dark:text-white mb-1">
                <span>Soil pH Level: {ph}</span>
                <span className="text-emerald-800 dark:text-emerald-400">Ideal</span>
              </div>
              <input
                type="range"
                min="4.5"
                max="8.5"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 rounded-xl p-2 text-xs font-black text-black dark:text-white outline-none"
                >
                  <option>Red Soil</option>
                  <option>Black Soil</option>
                  <option>Sandy Loam</option>
                  <option>Laterite</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-black dark:text-slate-300 block mb-1">Season</label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full bg-[#FAF9F6] dark:bg-slate-900 border border-[#C4C4BE] dark:border-slate-800 rounded-xl p-2 text-xs font-black text-black dark:text-white outline-none"
                >
                  <option>Kharif</option>
                  <option>Rabi</option>
                  <option>Summer</option>
                </select>
              </div>
            </div>
          </div>

          <Button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="w-full"
            variant="primary"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isAnalyzing ? 'Calculating Agronomy...' : 'Generate Crop Suitability'}</span>
          </Button>
        </Card>

        <div className="lg:col-span-7 space-y-6">
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-3">
              <h3 className="card-title text-base font-black text-black dark:text-white">Top Recommended Commodities</h3>
              <Badge variant="emerald">{recommendations.length} Matches Found</Badge>
            </div>

            <div className="space-y-4">
              {recommendations.map(crop => (
                <div key={crop.cropName} className="p-4 rounded-2xl border border-[#C4C4BE] bg-[#FAF9F6] dark:bg-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-black dark:text-white flex items-center gap-2">
                        <span>{crop.cropName}</span>
                        <span className="text-xs font-normal italic text-black dark:text-slate-300">({crop.scientificName})</span>
                      </h4>
                      <div className="text-xs text-emerald-800 dark:text-emerald-400 font-extrabold mt-0.5">{crop.category} • Gestation: {crop.gestationPeriodDays} Days</div>
                    </div>
                    <Badge variant="emerald" size="md">{crop.matchScore}% Match</Badge>
                  </div>

                  <ProgressBar value={crop.matchScore} color="emerald" height="h-2" />

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-black pt-2">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-[#C4C4BE] text-black dark:text-white">
                      <div className="text-[10px] text-black dark:text-slate-300 font-bold uppercase">Expected Yield</div>
                      <div className="font-mono font-black text-black dark:text-white mt-0.5">{crop.expectedYieldQuintalsPerAcre} Q/Acre</div>
                    </div>

                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-[#C4C4BE] text-black dark:text-white">
                      <div className="text-[10px] text-black dark:text-slate-300 font-bold uppercase">Est. Revenue</div>
                      <div className="font-mono font-black text-emerald-800 dark:text-emerald-400 mt-0.5">₹{crop.estimatedRevenuePerAcre.toLocaleString('en-IN')}/Acre</div>
                    </div>

                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-[#C4C4BE] text-black dark:text-white col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-black dark:text-slate-300 font-bold uppercase">Water Needs</div>
                      <div className="font-mono font-black text-black dark:text-white mt-0.5">{crop.waterRequirementMm} mm</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#C4C4BE] dark:border-slate-800 pb-3">
              <h3 className="card-title text-base font-black text-black dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                <span>Traditional Indian Organic Formulations</span>
              </h3>
              <Badge variant="amber">Vedic Organic Recipes</Badge>
            </div>

            <div className="space-y-3">
              {traditionalMethodsDatabase.map(method => (
                <div key={method.title} className="p-3.5 rounded-xl border border-[#C4C4BE] bg-[#FAF9F6] dark:bg-slate-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-black dark:text-white">{method.title}</span>
                    <Badge variant="emerald">{method.category}</Badge>
                  </div>
                  <p className="text-xs text-black dark:text-slate-200 font-extrabold leading-relaxed">{method.description}</p>
                  <div className="text-[11px] text-emerald-900 dark:text-emerald-400 font-black">
                    Ingredients: {method.materialsNeeded.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
