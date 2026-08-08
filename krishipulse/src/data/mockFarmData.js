/**
 * Farm Land Parcels & Financial Ledger Dataset (Pure JavaScript)
 * Author: Chetan (12.5 Managed Acres)
 */

export const initialFarmPlots = [
  {
    id: 'plot-1',
    plotName: 'North Parcel - Sugarcane',
    district: 'Mandya',
    areaAcres: 5.5,
    currentCrop: 'Sugarcane (VSI 08005)',
    sowingDate: '2026-01-15',
    expectedHarvestDate: '2026-11-20',
    growthStage: 'Vegetative',
    healthScorePct: 94,
    moisturePct: 78,
    totalExpensesRs: 45000,
    expectedRevenueRs: 320000
  },
  {
    id: 'plot-2',
    plotName: 'South Parcel - Finger Millet',
    district: 'Mandya',
    areaAcres: 4.0,
    currentCrop: 'Finger Millet (Ragi GPU-28)',
    sowingDate: '2026-06-01',
    expectedHarvestDate: '2026-09-15',
    growthStage: 'Flowering',
    healthScorePct: 98,
    moisturePct: 82,
    totalExpensesRs: 18000,
    expectedRevenueRs: 164000
  },
  {
    id: 'plot-3',
    plotName: 'East Field - Hybrid Tomato',
    district: 'Kolar',
    areaAcres: 3.0,
    currentCrop: 'Hybrid Tomato (Arka Rakshak)',
    sowingDate: '2026-05-10',
    expectedHarvestDate: '2026-08-25',
    growthStage: 'Maturity',
    healthScorePct: 91,
    moisturePct: 74,
    totalExpensesRs: 28000,
    expectedRevenueRs: 210000
  }
];

export const initialFarmExpenses = [
  {
    id: 'exp-1',
    plotId: 'plot-1',
    category: 'Fertilizer',
    amountRs: 14500,
    date: '2026-07-12',
    notes: 'Complex NPK 19-19-19 + Organic Jeevamrutha batch 2'
  },
  {
    id: 'exp-2',
    plotId: 'plot-2',
    category: 'Seeds',
    amountRs: 4200,
    date: '2026-05-28',
    notes: 'Certified GPU-28 Ragi seeds + Beejamrutha bio-treatment'
  },
  {
    id: 'exp-3',
    plotId: 'plot-3',
    category: 'Labor',
    amountRs: 8500,
    date: '2026-08-01',
    notes: 'Drip fertigation line flush + pruning team'
  }
];

export const initialFarmTasks = [
  {
    id: 'task-1',
    plotId: 'plot-2',
    title: 'Apply 2nd Dose Bio-Jeevamrutha Spray',
    dueDate: '2026-08-08',
    priority: 'High',
    status: 'Pending',
    category: 'Fertigation'
  },
  {
    id: 'task-2',
    plotId: 'plot-1',
    title: 'Inspect Drip Emitter Discharge Rates',
    dueDate: '2026-08-10',
    priority: 'Medium',
    status: 'Pending',
    category: 'Irrigation'
  },
  {
    id: 'task-3',
    plotId: 'plot-3',
    title: 'Pheromone Trap Monitoring for Fruit Borer',
    dueDate: '2026-08-05',
    priority: 'High',
    status: 'Completed',
    category: 'Pest Control'
  }
];
