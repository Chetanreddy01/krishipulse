/**
 * API Service Layer
 * Encapsulates HTTP REST requests and telemetry data services.
 */

import { mockApmcPrices, mockPriceTrendChartData } from '../data/mockApmcData.js';
import { initialFarmPlots, initialFarmExpenses, initialFarmTasks } from '../data/mockFarmData.js';
import { mockWeatherDataByDistrict } from '../data/mockWeatherData.js';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchUserProfile = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/user`);
    if (res.ok) return await res.json();
  } catch (err) {
    // Fallback to local user profile
  }
  return {
    id: 'usr-chetan',
    name: 'Chetan',
    email: 'chetanreddy445@gmail.com',
    phone: '7338025342',
    role: 'farmer',
    district: 'Mandya',
    farmSizeAcres: 12.5,
    preferredCrops: ['Finger Millet (Ragi)', 'Sugarcane', 'Paddy', 'Hybrid Tomato']
  };
};

export const fetchFarmPlots = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/plots`);
    if (res.ok) return await res.json();
  } catch (err) {
    // Fallback
  }
  return initialFarmPlots;
};

export const fetchFarmExpenses = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/expenses`);
    if (res.ok) return await res.json();
  } catch (err) {
    // Fallback
  }
  return initialFarmExpenses;
};

export const fetchFarmTasks = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`);
    if (res.ok) return await res.json();
  } catch (err) {
    // Fallback
  }
  return initialFarmTasks;
};

export const fetchApmcPrices = async (district = 'Mandya') => {
  return mockApmcPrices;
};

export const fetchPriceTrendData = async () => {
  return mockPriceTrendChartData;
};

export const fetchWeatherData = async (district = 'Mandya') => {
  return mockWeatherDataByDistrict[district] || mockWeatherDataByDistrict['Mandya'];
};
