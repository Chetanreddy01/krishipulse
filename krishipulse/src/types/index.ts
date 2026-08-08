/**
 * KrishiPulse AI - Core Data Type Definitions
 * Handcrafted TypeScript Interfaces & Data Contracts for KrishiPulse Enterprise SaaS.
 * 
 * Feel free to edit or add new properties here to customize your application logic!
 */

// User Role Definition
export type UserRole = 'farmer' | 'agronomist' | 'trader';

/**
 * User Profile Data Contract
 * Stores details for Chetan's verified enterprise farming profile.
 */
export interface UserProfile {
  id: string;                 // Unique user identifier (e.g. 'usr-chetan')
  name: string;               // Full name (e.g. 'Chetan')
  email: string;              // Primary contact email (e.g. 'chetanreddy445@gmail.com')
  avatar: string;             // Avatar image URL
  role: UserRole;             // Account role: 'farmer', 'agronomist', or 'trader'
  district: string;           // Primary Karnataka Mandi district (e.g. 'Mandya')
  farmSizeAcres: number;      // Total managed landholding in acres (e.g. 12.5)
  phone: string;              // Phone number (e.g. '7338025342')
  fpoName?: string;           // Optional Farmer Producer Organization name
  preferredCrops: string[];   // List of primary cultivated crops
}

/**
 * Karnataka APMC Mandi Commodity Record
 * Represents live market price telemetry for Karnataka agricultural hubs.
 */
export interface APMCPriceRecord {
  id: string;                 // Record ID (e.g. 'apmc-1')
  district: string;           // Karnataka district (e.g. 'Mandya', 'Kolar', 'Belagavi')
  mandiName: string;          // Specific APMC market yard name
  cropName: string;           // Agricultural commodity (e.g. 'Finger Millet (Ragi)')
  category: 'Cereals' | 'Pulses' | 'Vegetables' | 'Spices' | 'Cash Crops' | 'Fruits';
  minPrice: number;           // Lowest recorded price in ₹ per Quintal (100kg)
  maxPrice: number;           // Highest recorded price in ₹ per Quintal
  modalPrice: number;         // Most common trading price in ₹ per Quintal
  prevModalPrice: number;     // Yesterday's modal price for trend calculations
  changePercent: number;      // % price movement (e.g. +3.8%)
  arrivalQtyTonnes: number;   // Total commodity volume arrived today in Metric Tonnes
  mspPrice?: number;          // Government Minimum Support Price (MSP) benchmark
  updatedAt: string;          // ISO timestamp of last market feed sync
  arbitrageTarget?: {         // Smart price arbitrage recommendation
    mandiName: string;        // Higher paying nearby market yard
    district: string;         // Target district hub
    modalPrice: number;       // Higher target price in ₹/Quintal
    extraGainPerQuintal: number; // Additional profit per quintal after transport
  };
}

/**
 * Traditional Indian & Karnataka Organic Farming Wisdom
 * Ancient Vedic methods for seed treatment, natural pest sprays, and soil revival.
 */
export interface TraditionalMethod {
  title: string;              // Recipe name (e.g. 'Beejamrutha Seed Treatment', 'Agniastra')
  category: 'Seed Treatment' | 'Bio-Fertilizer' | 'Pest Control' | 'Intercropping' | 'Soil Revival';
  description: string;       // Detailed preparation steps & application guide
  materialsNeeded: string[];  // Raw natural ingredients (e.g. Cow Dung, Neem Leaves, Garlic)
  applicationSchedule: string;// Spray schedule or application timing
  traditionalBenefit: string; // Agronomic advantages & soil health benefits
}

/**
 * AI Crop Suitability Recommendation Result
 * Calculated by the Agronomy Diagnostics Engine based on soil N-P-K & pH inputs.
 */
export interface CropRecommendationResult {
  cropName: string;                     // Recommended crop name (e.g. 'Finger Millet (Ragi)')
  matchScore: number;                   // Calculated suitability score % (e.g. 96%)
  scientificName: string;               // Botanical Latin name (e.g. 'Eleusine coracana')
  category: string;                     // Crop classification (e.g. 'Millet / Grain')
  expectedYieldQuintalsPerAcre: number; // Projected harvest yield per acre
  estimatedRevenuePerAcre: number;      // Estimated gross revenue in ₹/Acre based on APMC rates
  gestationPeriodDays: number;          // Days from sowing to maturity
  waterRequirementMm: number;           // Total water required in mm
  optimalSoilPh: string;                // Ideal soil pH range (e.g. '6.0 - 7.5')
  npkRatio: { N: number; P: number; K: number }; // Target soil N-P-K ratio
  fertilizerSchedule: { stage: string; fertilizer: string; kgPerAcre: string }[];
  traditionalWisdom: TraditionalMethod[]; // Associated organic botanical recipes
  marketOutlook: 'Bullish' | 'Stable' | 'High Demand';
  riskLevel: 'Low' | 'Moderate' | 'High';
}

/**
 * Soil Laboratory Diagnostics Input State
 * Used in Crop Advisor to test soil parameters.
 */
export interface SoilInputState {
  nitrogen: number;           // Soil Nitrogen content (kg/ha)
  phosphorus: number;         // Soil Phosphorus content (kg/ha)
  potassium: number;          // Soil Potassium content (kg/ha)
  ph: number;                 // Soil pH level (4.5 to 8.5)
  organicCarbon: number;      // Soil Organic Carbon %
  rainfallMm: number;         // Seasonal rainfall estimate in mm
  temperatureC: number;       // Average ambient temperature in °C
  humidityPct: number;        // Average humidity %
  district: string;           // Target Karnataka district hub
  soilType: 'Red Soil' | 'Black Soil' | 'Alluvial' | 'Laterite' | 'Sandy Loam';
  season: 'Kharif' | 'Rabi' | 'Summer';
}

/**
 * Weather & Micro-Climate Telemetry
 */
export interface WeatherData {
  district: string;           // District name
  locationName: string;       // Precise weather station location
  currentTempC: number;       // Temperature in °C
  condition: string;          // Weather status (e.g. 'Partly Cloudy', 'Sunny')
  icon: string;               // Icon code
  humidityPct: number;        // Relative humidity %
  windSpeedKmh: number;       // Wind speed in km/h
  windDirection: string;      // Wind compass direction (e.g. 'SW', 'NW')
  rainfall24hMm: number;      // Past 24h rainfall total in mm
  uvIndex: number;            // UV Solar Radiation Index
  evapotranspirationEt0Mm: number; // Evapotranspiration ET0 guide for irrigation (mm/day)
  sprayingAdvisory: {
    status: 'Optimal' | 'Caution' | 'Do Not Spray'; // Spraying Safety Window
    reason: string;                                  // Explanation based on wind & rain
  };
  weeklyForecast: {
    day: string;
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    rainProbPct: number;
    windKmh?: number;
  }[];
}

/**
 * Farm Land Parcel (Field Plot)
 * Represents an active physical plot of land managed by Chetan.
 */
export interface FarmPlot {
  id: string;                 // Plot identifier (e.g. 'plot-1')
  plotName: string;           // Name (e.g. 'North Parcel - Sugarcane')
  district: string;           // District location
  areaAcres: number;          // Size of plot in acres
  currentCrop: string;        // Currently cultivated crop
  sowingDate: string;         // Date sown (YYYY-MM-DD)
  expectedHarvestDate: string;// Estimated harvest date
  growthStage: 'Sowing' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvesting';
  healthScorePct: number;     // Crop health score (0-100%)
  moisturePct: number;        // Soil probe moisture %
  totalExpensesRs: number;    // Cumulative input costs logged for this plot in ₹
  expectedRevenueRs: number;  // Projected harvest revenue in ₹
}

/**
 * Farm Financial Expense Record
 * Tracks money spent on Seeds, Fertilizer, Labor, Pesticides, etc.
 */
export interface FarmExpense {
  id: string;                 // Expense ID
  plotId: string;             // Associated plot ID
  category: 'Seeds' | 'Fertilizer' | 'Labor' | 'Pesticide' | 'Equipment' | 'Irrigation';
  amountRs: number;           // Expense amount in ₹
  date: string;               // Transaction date
  notes: string;              // Notes/receipt details
}

/**
 * Scheduled Operational Field Task
 */
export interface FarmTask {
  id: string;                 // Task ID
  plotId: string;             // Targeted plot ID
  title: string;              // Action required (e.g. 'Apply Organic Jeevamrutha')
  dueDate: string;            // Due date
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
  category: string;           // Category (e.g. 'Fertigation', 'Pest Control', 'Harvest')
}
