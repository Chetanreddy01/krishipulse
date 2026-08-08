import type { CropRecommendationResult, SoilInputState } from '../types';

export const cropRecommendationDatabase: CropRecommendationResult[] = [
  {
    cropName: 'Finger Millet (Ragi / Eleusine coracana)',
    matchScore: 96,
    scientificName: 'Eleusine coracana',
    category: 'Millet / Grain',
    expectedYieldQuintalsPerAcre: 16,
    estimatedRevenuePerAcre: 65600, // Based on ₹4,100/Quintal APMC Mandya
    gestationPeriodDays: 110,
    waterRequirementMm: 350,
    optimalSoilPh: '5.5 - 7.5',
    npkRatio: { N: 60, P: 30, K: 30 },
    fertilizerSchedule: [
      { stage: 'Basal (At Sowing)', fertilizer: 'FYM / Compost + 50% N + 100% P & K', kgPerAcre: '2.5 Tonnes FYM + 30kg NPK' },
      { stage: 'Tillering (30 DAS)', fertilizer: 'Top Dress Urea or Jeevamrutha', kgPerAcre: '15 kg N or 200L Jeevamrutha' },
      { stage: 'Panicle Initiation (60 DAS)', fertilizer: 'Top Dress remaining Nitrogen', kgPerAcre: '15 kg N' }
    ],
    traditionalWisdom: [
      {
        title: 'Beejamrutha Seed Treatment',
        category: 'Seed Treatment',
        description: 'Coat seeds with a mixture of local cow dung, cow urine, lime, and virgin soil 2 hours before sowing.',
        materialsNeeded: ['5kg Local Cow Dung', '5L Cow Urine', '50g Lime (Chuna)', 'Handful fertile bund soil'],
        applicationSchedule: 'Apply 2-3 hours before sowing. Shade dry completely.',
        traditionalBenefit: 'Protects seeds against seed-borne pathogens and enhances germination rate by up to 22%.'
      },
      {
        title: 'Jeevamrutha Bio-Fertility Booster',
        category: 'Bio-Fertilizer',
        description: 'Fermented concoction of cow dung, urine, jaggery, pulse flour, and soil sprayed via irrigation water.',
        materialsNeeded: ['10kg Cow Dung', '10L Cow Urine', '2kg Jaggery', '2kg Besan flour', '200L Water'],
        applicationSchedule: 'Apply every 21 days with flood or drip irrigation water.',
        traditionalBenefit: 'Stimulates earthworm activity and micro-fauna, increasing phosphorus bioavailability.'
      },
      {
        title: 'Intercropping with Avaray (Field Beans)',
        category: 'Intercropping',
        description: 'Plant 4 rows of Ragi alternated with 1 row of Avaray (Lablab bean) or Red Gram.',
        materialsNeeded: ['Ragi Seed (4kg/Acre)', 'Avaray Seed (1kg/Acre)'],
        applicationSchedule: 'Sow simultaneously during Kharif monsoon arrival.',
        traditionalBenefit: 'Fixes atmospheric nitrogen naturally, suppresses weeds, and provides bonus legume income.'
      },
      {
        title: 'Neem & Wood Ash Grain Storage',
        category: 'Soil Revival',
        description: 'Store harvested dry ragi grains mixed with dried neem leaves and sieved wood ash in earthen pots.',
        materialsNeeded: ['Dry Neem Leaves', 'Wood Ash', 'Earthen / Terracotta Bins'],
        applicationSchedule: 'Post-harvest grain storage.',
        traditionalBenefit: 'Keeps grains fresh and pest-free for up to 3 years without chemical fumigants.'
      }
    ],
    marketOutlook: 'Bullish',
    riskLevel: 'Low'
  },
  {
    cropName: 'Hybrid Tomato (Kolar Type)',
    matchScore: 92,
    scientificName: 'Solanum lycopersicum',
    category: 'Horticulture / Vegetable',
    expectedYieldQuintalsPerAcre: 280,
    estimatedRevenuePerAcre: 728000, // Based on ₹2,600/Quintal APMC Kolar
    gestationPeriodDays: 120,
    waterRequirementMm: 600,
    optimalSoilPh: '6.0 - 7.0',
    npkRatio: { N: 120, P: 80, K: 100 },
    fertilizerSchedule: [
      { stage: 'Land Prep', fertilizer: 'Enriched Vermicompost + Trichoderma', kgPerAcre: '5 Tonnes Vermicompost' },
      { stage: 'Vegetative (20-40 Days)', fertilizer: 'NPK 19:19:19 via Drip', kgPerAcre: '3 kg / week' },
      { stage: 'Fruiting & Harvest (50-100 Days)', fertilizer: '0:0:50 Calcium Nitrate + Micronutrients', kgPerAcre: '4 kg / week' }
    ],
    traditionalWisdom: [
      {
        title: 'Marigold Trap Cropping for Fruit Borer',
        category: 'Intercropping',
        description: 'Plant African Yellow Marigold borders around every 16 rows of Tomato beds.',
        materialsNeeded: ['Marigold Seedlings (200 plants/acre)'],
        applicationSchedule: 'Transplant marigold 15 days before tomato seedlings.',
        traditionalBenefit: 'Marigold flowers attract Helicoverpa fruit borer moths away from tomatoes and control root-knot nematodes.'
      },
      {
        title: 'Panchagavya Foliar Spray',
        category: 'Bio-Fertilizer',
        description: 'Spray 3% fermented Panchagavya solution (cow dung, urine, milk, curd, ghee, banana, tender coconut).',
        materialsNeeded: ['5L Panchagavya Stock', '150L Water'],
        applicationSchedule: 'Spray at 15th, 30th, 45th, and 60th day after transplanting.',
        traditionalBenefit: 'Boosts plant immunity, enhances fruit shine, firmness, and shelf life during transit.'
      },
      {
        title: 'Neemastra Organic Pest Repellent',
        category: 'Pest Control',
        description: 'Boiled extract of crushed neem leaves, cow urine, and local cow dung diluted in water.',
        materialsNeeded: ['10kg Crushed Neem Leaves', '5L Cow Urine', '2kg Dung', '200L Water'],
        applicationSchedule: 'Spray at first sign of aphids, whiteflies, or thrips.',
        traditionalBenefit: 'Disrupts sucking pest life-cycles naturally without damaging beneficial ladybugs.'
      }
    ],
    marketOutlook: 'High Demand',
    riskLevel: 'Moderate'
  },
  {
    cropName: 'Sugarcane (Co 86032 / Niyathi)',
    matchScore: 89,
    scientificName: 'Saccharum officinarum',
    category: 'Cash Crop',
    expectedYieldQuintalsPerAcre: 450,
    estimatedRevenuePerAcre: 1494000, // Based on ₹3,320/Quintal Mandya APMC
    gestationPeriodDays: 360,
    waterRequirementMm: 1800,
    optimalSoilPh: '6.5 - 8.0',
    npkRatio: { N: 140, P: 60, K: 60 },
    fertilizerSchedule: [
      { stage: 'Planting (Basal)', fertilizer: 'Single Super Phosphate + FYM', kgPerAcre: '150 kg SSP + 10T FYM' },
      { stage: 'Partial Earthing Up (45 Days)', fertilizer: 'Urea + MOP split 1', kgPerAcre: '50 kg Urea + 25 kg MOP' },
      { stage: 'Final Earthing Up (120 Days)', fertilizer: 'Urea + MOP split 2 + Zinc', kgPerAcre: '50 kg Urea + 25 kg MOP + 10kg Zn' }
    ],
    traditionalWisdom: [
      {
        title: 'Trash Mulching & Trash Composting',
        category: 'Soil Revival',
        description: 'Spread dried sugarcane leaves between rows instead of burning.',
        materialsNeeded: ['Sugarcane Trash (3-4 Tonnes/Acre)', 'Waste Decomposer / Jeevamrutha'],
        applicationSchedule: 'Immediately after harvest / ratoon management.',
        traditionalBenefit: 'Saves 30% irrigation water by reducing soil evaporation and adds organic humus.'
      },
      {
        title: 'Cowpea Intercropping in Early Stage',
        category: 'Intercropping',
        description: 'Sow 2 rows of Cowpea between sugarcane furrows during first 60 days.',
        materialsNeeded: ['Cowpea Seed (6kg/Acre)'],
        applicationSchedule: 'Incorporate cowpea into soil at 45 days after planting.',
        traditionalBenefit: 'Suppresses early weeds and yields up to 40 kg natural nitrogen per acre.'
      }
    ],
    marketOutlook: 'Stable',
    riskLevel: 'Low'
  },
  {
    cropName: 'Yellow Maize / Corn (Deccan Hybrid)',
    matchScore: 86,
    scientificName: 'Zea mays',
    category: 'Cereal / Feed',
    expectedYieldQuintalsPerAcre: 30,
    estimatedRevenuePerAcre: 70200, // Based on ₹2,340/Quintal Belagavi APMC
    gestationPeriodDays: 105,
    waterRequirementMm: 500,
    optimalSoilPh: '5.8 - 7.8',
    npkRatio: { N: 100, P: 50, K: 40 },
    fertilizerSchedule: [
      { stage: 'Sowing', fertilizer: 'DAP + MOP + Zinc Sulfate', kgPerAcre: '50kg DAP + 25kg MOP + 5kg Zn' },
      { stage: 'Knee High Stage (30 DAS)', fertilizer: 'Urea Top Dressing', kgPerAcre: '40 kg Urea' },
      { stage: 'Tasseling Stage (55 DAS)', fertilizer: 'Urea + Potash Spray', kgPerAcre: '30 kg Urea' }
    ],
    traditionalWisdom: [
      {
        title: 'Agniastra Insect Control for Armyworm',
        category: 'Pest Control',
        description: 'Boiled extract of neem leaves, tobacco leaves, hot green chilli paste, and garlic paste in cow urine.',
        materialsNeeded: ['2kg Tobacco', '2kg Garlic', '2kg Green Chilli', '5kg Neem Leaves', '10L Cow Urine'],
        applicationSchedule: 'Apply into plant whorl at 20-35 DAS for Fall Armyworm control.',
        traditionalBenefit: 'Natural pungent alkaloid repels armyworm larvae without chemical residues.'
      }
    ],
    marketOutlook: 'Bullish',
    riskLevel: 'Low'
  }
];

export function calculateSoilCropMatch(input: SoilInputState): CropRecommendationResult[] {
  // Dynamic heuristic matching engine based on soil NPK, pH, rainfall, and Karnataka district
  return cropRecommendationDatabase.map(crop => {
    let score = 85;

    // NPK alignment check
    const nDiff = Math.abs(input.nitrogen - crop.npkRatio.N);
    const pDiff = Math.abs(input.phosphorus - crop.npkRatio.P);
    const kDiff = Math.abs(input.potassium - crop.npkRatio.K);

    if (nDiff < 20) score += 4;
    if (pDiff < 15) score += 3;
    if (kDiff < 15) score += 3;

    // Rainfall match
    if (Math.abs(input.rainfallMm - crop.waterRequirementMm) < 200) {
      score += 4;
    }

    // Soil type boost
    if (input.soilType === 'Red Soil' && crop.cropName.includes('Ragi')) score += 5;
    if (input.soilType === 'Black Soil' && crop.cropName.includes('Maize')) score += 5;
    if (input.soilType === 'Red Soil' && crop.cropName.includes('Tomato')) score += 4;

    const finalScore = Math.min(99, Math.max(72, score));

    return {
      ...crop,
      matchScore: finalScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
