/* ==========================================================================
   KrishiPulse - REST API Service Layer (api.js)
   Author: Chetan (Mandya, Karnataka)
   Description: Connects to Python FastAPI REST Backend & Live Open-Meteo Weather API
   ========================================================================== */

// Auto-detect backend hostname (Works on Localhost, Mobile Wi-Fi IP & Production)
const currentHost = window.location.hostname || '127.0.0.1';
const API_BASE_URL = currentHost.includes('vercel.app') || currentHost.includes('netlify.app')
  ? 'https://krishipulse-api.onrender.com/api'  // Production API URL
  : `http://${currentHost}:8000/api`;            // Local & Mobile Wi-Fi Network API URL

// Fetch Chetan's User Profile
async function fetchUserProfile() {
  try {
    const response = await fetch(`${API_BASE_URL}/user`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Using local fallback profile data.');
  }

  return {
    id: 'usr-chetan',
    name: 'Chetan',
    email: 'chetanreddy445@gmail.com',
    phone: '7338025342',
    role: 'Lead Agronomist & Enterprise Farmer',
    district: 'Mandya',
    farmSizeAcres: 12.5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };
}

// Login User via Python FastAPI REST API
async function loginUser(emailOrPhone, password) {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrPhone, password })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Login failed. Invalid phone/email or password.');
  }
  return data;
}

// Signup User via Python FastAPI REST API
async function signupUser(userData) {
  const response = await fetch(`${API_BASE_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Signup failed. Email or phone already registered.');
  }
  return data;
}

// Fetch Karnataka APMC Mandi Market Commodity Prices
async function fetchApmcPrices(district = 'Mandya') {
  try {
    const response = await fetch(`${API_BASE_URL}/market/prices?district=${district}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Using local fallback APMC market price data.');
  }

  return [
    {
      id: 'apmc-1',
      cropName: 'Finger Millet (Ragi)',
      mandiName: 'Mandya Main APMC',
      district: 'Mandya',
      modalPrice: 3450,
      minPrice: 3200,
      maxPrice: 3650,
      arrivalQtyTonnes: 145.5,
      changePercent: 3.2,
      category: 'Cereals',
      arbitrageTarget: { mandiName: 'Bengaluru APMC (Yeshwanthpur)', modalPrice: 3780, extraGainPerQuintal: 330 }
    },
    {
      id: 'apmc-2',
      cropName: 'Sugarcane (Co-86032)',
      mandiName: 'Maddur APMC Market',
      district: 'Mandya',
      modalPrice: 3150,
      minPrice: 3000,
      maxPrice: 3300,
      arrivalQtyTonnes: 420.0,
      changePercent: 1.5,
      category: 'Cash Crops',
      arbitrageTarget: null
    },
    {
      id: 'apmc-3',
      cropName: 'Hybrid Red Tomato',
      mandiName: 'Kolar APMC Market',
      district: 'Kolar',
      modalPrice: 1850,
      minPrice: 1600,
      maxPrice: 2100,
      arrivalQtyTonnes: 580.0,
      changePercent: -4.5,
      category: 'Vegetables',
      arbitrageTarget: { mandiName: 'Mysuru APMC (Bandipalya)', modalPrice: 2200, extraGainPerQuintal: 350 }
    }
  ];
}

// Fetch Managed Land Parcels
async function fetchFarmPlots() {
  try {
    const response = await fetch(`${API_BASE_URL}/farm/plots`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Using local fallback land plots data.');
  }

  return [
    {
      id: 'plot-1',
      plotName: 'North Field - Finger Millet',
      areaAcres: 5.5,
      currentCrop: 'Finger Millet (Ragi)',
      growthStage: 'Vegetative',
      healthScorePct: 94,
      totalExpensesRs: 42000,
      expectedRevenueRs: 245000,
      sowingDate: '2026-05-15',
      expectedHarvestDate: '2026-09-30'
    },
    {
      id: 'plot-2',
      plotName: 'East Field - Sugarcane',
      areaAcres: 4.0,
      currentCrop: 'Sugarcane',
      growthStage: 'Maturation',
      healthScorePct: 88,
      totalExpensesRs: 65000,
      expectedRevenueRs: 380000,
      sowingDate: '2025-11-10',
      expectedHarvestDate: '2026-11-20'
    },
    {
      id: 'plot-3',
      plotName: 'South Field - Hybrid Tomato',
      areaAcres: 3.0,
      currentCrop: 'Hybrid Tomato',
      growthStage: 'Flowering & Fruiting',
      healthScorePct: 91,
      totalExpensesRs: 35000,
      expectedRevenueRs: 195000,
      sowingDate: '2026-06-01',
      expectedHarvestDate: '2026-08-25'
    }
  ];
}

// Fetch REAL LIVE Weather Data from Open-Meteo Satellite API via FastAPI or Direct
async function fetchWeatherData(district = 'Mandya') {
  try {
    const response = await fetch(`${API_BASE_URL}/weather?district=${district}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Fetching live Open-Meteo weather API directly...');
  }

  try {
    const liveRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=12.5218&longitude=76.8951&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&timezone=Asia%2FKolkata');
    if (liveRes.ok) {
      const data = await liveRes.json();
      const current = data.current || {};
      const tempC = Math.round(current.temperature_2m || 28);
      const humidity = Math.round(current.relative_humidity_2m || 68);
      const windKmh = Math.round(current.wind_speed_10m || 14);
      const rainMm = current.precipitation || 0;

      return {
        locationName: `${district} Live Satellite Hub`,
        currentTempC: tempC,
        condition: tempC > 26 ? 'Live Solar Clear' : 'Partly Cloudy',
        humidityPct: humidity,
        windSpeedKmh: windKmh,
        rainfall24hMm: rainMm,
        sprayingAdvisory: {
          status: windKmh < 18 ? 'Optimal Window' : 'Wind Alert',
          reason: `Live satellite wind speed (${windKmh} km/h) & temperature (${tempC}°C).`
        }
      };
    }
  } catch (e) {
    console.log('Live weather fetch error:', e);
  }

  return {
    locationName: 'Mandya Agri Station',
    currentTempC: 28,
    condition: 'Partly Cloudy',
    humidityPct: 68,
    windSpeedKmh: 14,
    rainfall24hMm: 4.2,
    sprayingAdvisory: {
      status: 'Optimal Window',
      reason: 'Low wind speed (14 km/h) & safe temperature.'
    }
  };
}
