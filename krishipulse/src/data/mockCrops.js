/**
 * Crop Agronomy Suitability & Vedic Organic Formulations (Pure JavaScript)
 */

export const traditionalMethodsDatabase = [
  {
    title: 'Beejamrutha Seed Treatment',
    category: 'Seed Treatment',
    description: 'Vedic bio-inoculant recipe for treating seeds prior to sowing. Protects young seedlings from soil-borne fungal pathogens.',
    materialsNeeded: ['Indigenous Cow Dung (5kg)', 'Cow Urine (5L)', 'Lime (50g)', 'Virgin Farm Soil (Handful)'],
    applicationSchedule: 'Soak seeds for 30 mins before sowing',
    traditionalBenefit: 'Increases germination rate by 22% and prevents damping off disease.'
  },
  {
    title: 'Jeevamrutha Soil Bio-Revival',
    category: 'Bio-Fertilizer',
    description: 'Fermented liquid microbial culture containing billions of beneficial nitrogen-fixing soil bacteria.',
    materialsNeeded: ['Cow Dung (10kg)', 'Cow Urine (10L)', 'Jaggery (2kg)', 'Pulse Flour (2kg)', 'Fertile Soil'],
    applicationSchedule: 'Apply 200L/Acre via drip irrigation every 21 days',
    traditionalBenefit: 'Multiplies earthworm population and enhances soil organic carbon.'
  },
  {
    title: 'Agniastra Botanical Bio-Pesticide',
    category: 'Pest Control',
    description: 'Potent natural botanical extract against sap-sucking pests, leaf rollers, and stem borers.',
    materialsNeeded: ['Neem Leaves (2kg)', 'Garlic Paste (500g)', 'Green Chilly Paste (500g)', 'Cow Urine (10L)'],
    applicationSchedule: 'Boil for 2 hours, dilute 2L in 100L water, spray at dusk',
    traditionalBenefit: 'Zero chemical toxicity; safe for honeybees and natural predators.'
  }
];

export const mockCropSuitabilityList = [
  {
    cropName: 'Finger Millet (Ragi GPU-28)',
    scientificName: 'Eleusine coracana',
    matchScore: 98,
    category: 'Cereals / Millet',
    expectedYieldQuintalsPerAcre: 18,
    estimatedRevenuePerAcre: 73800,
    gestationPeriodDays: 105,
    waterRequirementMm: 420
  },
  {
    cropName: 'Sugarcane (VSI 08005)',
    scientificName: 'Saccharum officinarum',
    matchScore: 94,
    category: 'Cash Crops',
    expectedYieldQuintalsPerAcre: 550,
    estimatedRevenuePerAcre: 178750,
    gestationPeriodDays: 330,
    waterRequirementMm: 1600
  },
  {
    cropName: 'Hybrid Tomato (Arka Rakshak)',
    scientificName: 'Solanum lycopersicum',
    matchScore: 91,
    category: 'Vegetables',
    expectedYieldQuintalsPerAcre: 90,
    estimatedRevenuePerAcre: 216000,
    gestationPeriodDays: 120,
    waterRequirementMm: 600
  }
];
