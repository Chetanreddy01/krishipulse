/**
 * Karnataka APMC Mandi Telemetry Dataset (Pure JavaScript)
 * Author: Chetan (Mandya APMC Hub)
 */

export const karnatakaDistricts = [
  'Mandya',
  'Kolar',
  'Belagavi',
  'Shimoga',
  'Hassan',
  'Chitradurga',
  'Tumakuru',
  'Davanagere',
  'Mysuru',
  'Ballari'
];

export const mockApmcPrices = [
  {
    id: 'apmc-1',
    district: 'Mandya',
    mandiName: 'Mandya Main Yard',
    cropName: 'Finger Millet (Ragi GPU-28)',
    category: 'Cereals',
    minPrice: 3850,
    maxPrice: 4280,
    modalPrice: 4100,
    prevModalPrice: 3950,
    changePercent: 3.8,
    arrivalQtyTonnes: 142,
    mspPrice: 3846,
    updatedAt: '2026-08-06T10:30:00Z',
    arbitrageTarget: {
      mandiName: 'Mysuru Bandipalya',
      district: 'Mysuru',
      modalPrice: 4320,
      extraGainPerQuintal: 220
    }
  },
  {
    id: 'apmc-2',
    district: 'Mandya',
    mandiName: 'Pandavapura Yard',
    cropName: 'Sugarcane (VSI 08005)',
    category: 'Cash Crops',
    minPrice: 3100,
    maxPrice: 3350,
    modalPrice: 3250,
    prevModalPrice: 3200,
    changePercent: 1.5,
    arrivalQtyTonnes: 850,
    mspPrice: 3150,
    updatedAt: '2026-08-06T11:00:00Z'
  },
  {
    id: 'apmc-3',
    district: 'Kolar',
    mandiName: 'Kolar APMC Market',
    cropName: 'Hybrid Tomato (Arka Rakshak)',
    category: 'Vegetables',
    minPrice: 1800,
    maxPrice: 2600,
    modalPrice: 2400,
    prevModalPrice: 2150,
    changePercent: 11.6,
    arrivalQtyTonnes: 620,
    updatedAt: '2026-08-06T09:45:00Z',
    arbitrageTarget: {
      mandiName: 'Yeshwanthpur APMC',
      district: 'Bengaluru Urban',
      modalPrice: 2850,
      extraGainPerQuintal: 450
    }
  },
  {
    id: 'apmc-4',
    district: 'Belagavi',
    mandiName: 'Belagavi Central Yard',
    cropName: 'Maize (Yellow Hybrid)',
    category: 'Cereals',
    minPrice: 2100,
    maxPrice: 2380,
    modalPrice: 2290,
    prevModalPrice: 2310,
    changePercent: -0.8,
    arrivalQtyTonnes: 410,
    mspPrice: 2090,
    updatedAt: '2026-08-06T10:15:00Z'
  },
  {
    id: 'apmc-5',
    district: 'Shimoga',
    mandiName: 'Shivamogga APMC',
    cropName: 'Arecanut (Rashi Supreme)',
    category: 'Cash Crops',
    minPrice: 46000,
    maxPrice: 51200,
    modalPrice: 48900,
    prevModalPrice: 47500,
    changePercent: 2.9,
    arrivalQtyTonnes: 85,
    updatedAt: '2026-08-06T11:15:00Z'
  }
];

export const mockPriceTrendChartData = [
  { day: 'Day 1', Ragi: 3820, Tomato: 1900 },
  { day: 'Day 5', Ragi: 3850, Tomato: 2050 },
  { day: 'Day 10', Ragi: 3910, Tomato: 1980 },
  { day: 'Day 15', Ragi: 3950, Tomato: 2150 },
  { day: 'Day 20', Ragi: 4020, Tomato: 2300 },
  { day: 'Day 25', Ragi: 4080, Tomato: 2250 },
  { day: 'Day 30', Ragi: 4100, Tomato: 2400 }
];
