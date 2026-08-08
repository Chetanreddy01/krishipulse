import type { FarmPlot, FarmExpense, FarmTask } from '../types';

export const initialFarmPlots: FarmPlot[] = [
  {
    id: 'plot-1',
    plotName: 'East Field Parcel A (Cauvery Belt)',
    district: 'Mandya',
    areaAcres: 3.5,
    currentCrop: 'Finger Millet (Ragi)',
    sowingDate: '2026-06-15',
    expectedHarvestDate: '2026-10-02',
    growthStage: 'Vegetative',
    healthScorePct: 94,
    moisturePct: 78,
    totalExpensesRs: 24500,
    expectedRevenueRs: 229600
  },
  {
    id: 'plot-2',
    plotName: 'Polyhouse Parcel B (Hi-Tech)',
    district: 'Kolar',
    areaAcres: 2.0,
    currentCrop: 'Hybrid Tomato',
    sowingDate: '2026-05-20',
    expectedHarvestDate: '2026-09-15',
    growthStage: 'Flowering',
    healthScorePct: 89,
    moisturePct: 84,
    totalExpensesRs: 86000,
    expectedRevenueRs: 1456000
  },
  {
    id: 'plot-3',
    plotName: 'North River Plot C',
    district: 'Mandya',
    areaAcres: 4.0,
    currentCrop: 'Sugarcane (Co 86032)',
    sowingDate: '2026-01-10',
    expectedHarvestDate: '2027-01-05',
    growthStage: 'Vegetative',
    healthScorePct: 96,
    moisturePct: 88,
    totalExpensesRs: 92000,
    expectedRevenueRs: 5976000
  }
];

export const initialFarmExpenses: FarmExpense[] = [
  { id: 'exp-1', plotId: 'plot-1', category: 'Seeds', amountRs: 4200, date: '2026-06-12', notes: 'Certified GPU-28 Ragi Seed (14 kg)' },
  { id: 'exp-2', plotId: 'plot-1', category: 'Fertilizer', amountRs: 6800, date: '2026-06-14', notes: 'Organic Vermicompost & Jeevamrutha prep' },
  { id: 'exp-3', plotId: 'plot-1', category: 'Labor', amountRs: 8500, date: '2026-06-15', notes: 'Land leveling & Sowing labor (5 workers)' },
  { id: 'exp-4', plotId: 'plot-2', category: 'Seeds', amountRs: 18500, date: '2026-05-18', notes: 'Arka Rakshak Tomato Seedlings (12,000 plants)' },
  { id: 'exp-5', plotId: 'plot-2', category: 'Irrigation', amountRs: 24000, date: '2026-05-25', notes: 'Drip fertigation manifold automation' },
  { id: 'exp-6', plotId: 'plot-2', category: 'Pesticide', amountRs: 9200, date: '2026-07-02', notes: 'Neemastra organic spray & Trichoderma' }
];

export const initialFarmTasks: FarmTask[] = [
  { id: 'task-1', plotId: 'plot-1', title: 'Apply 2nd Dose Jeevamrutha (200L/Acre)', dueDate: '2026-08-08', priority: 'High', status: 'Pending', category: 'Fertigation' },
  { id: 'task-2', plotId: 'plot-2', title: 'Foliar Spray Panchagavya 3% for Fruit Set', dueDate: '2026-08-07', priority: 'High', status: 'In Progress', category: 'Spraying' },
  { id: 'task-3', plotId: 'plot-3', title: 'Sugarcane Trash Mulching & Earthing Up', dueDate: '2026-08-12', priority: 'Medium', status: 'Pending', category: 'Fertigation' },
  { id: 'task-4', plotId: 'plot-2', title: 'Inspect Yellow Sticky Traps for Whitefly', dueDate: '2026-08-06', priority: 'Low', status: 'Completed', category: 'Spraying' }
];
