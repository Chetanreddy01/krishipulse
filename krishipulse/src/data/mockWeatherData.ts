import type { WeatherData } from '../types';

export const mockWeatherDataByDistrict: Record<string, WeatherData> = {
  'Mandya': {
    district: 'Mandya',
    locationName: 'Mandya Rural (Cauvery Basin)',
    currentTempC: 28,
    condition: 'Partly Cloudy',
    icon: 'CloudSun',
    humidityPct: 68,
    windSpeedKmh: 12,
    windDirection: 'WSW',
    rainfall24hMm: 4.2,
    uvIndex: 7,
    evapotranspirationEt0Mm: 4.8,
    sprayingAdvisory: {
      status: 'Optimal',
      reason: 'Wind speed under 15 km/h with low rain probability for the next 8 hours.'
    },
    weeklyForecast: [
      { day: 'Thu', date: 'Aug 06', maxTemp: 29, minTemp: 21, condition: 'Partly Cloudy', rainProbPct: 20, windKmh: 12 },
      { day: 'Fri', date: 'Aug 07', maxTemp: 30, minTemp: 22, condition: 'Sunny', rainProbPct: 10, windKmh: 10 },
      { day: 'Sat', date: 'Aug 08', maxTemp: 28, minTemp: 21, condition: 'Light Rain', rainProbPct: 60, windKmh: 16 },
      { day: 'Sun', date: 'Aug 09', maxTemp: 27, minTemp: 20, condition: 'Moderate Shower', rainProbPct: 75, windKmh: 18 },
      { day: 'Mon', date: 'Aug 10', maxTemp: 29, minTemp: 21, condition: 'Partly Cloudy', rainProbPct: 30, windKmh: 14 },
      { day: 'Tue', date: 'Aug 11', maxTemp: 30, minTemp: 22, condition: 'Sunny', rainProbPct: 15, windKmh: 11 },
      { day: 'Wed', date: 'Aug 12', maxTemp: 31, minTemp: 22, condition: 'Clear Sky', rainProbPct: 5, windKmh: 9 },
    ]
  },
  'Kolar': {
    district: 'Kolar',
    locationName: 'Kolar Polyhouse Zone',
    currentTempC: 31,
    condition: 'Sunny & Warm',
    icon: 'Sun',
    humidityPct: 52,
    windSpeedKmh: 19,
    windDirection: 'NE',
    rainfall24hMm: 0.0,
    uvIndex: 9,
    evapotranspirationEt0Mm: 6.1,
    sprayingAdvisory: {
      status: 'Caution',
      reason: 'High wind gusts above 18 km/h may cause drift. Prefer early morning spraying.'
    },
    weeklyForecast: [
      { day: 'Thu', date: 'Aug 06', maxTemp: 31, minTemp: 22, condition: 'Sunny', rainProbPct: 5, windKmh: 19 },
      { day: 'Fri', date: 'Aug 07', maxTemp: 32, minTemp: 23, condition: 'Clear Sky', rainProbPct: 0, windKmh: 15 },
      { day: 'Sat', date: 'Aug 08', maxTemp: 31, minTemp: 22, condition: 'Partly Cloudy', rainProbPct: 20, windKmh: 14 },
      { day: 'Sun', date: 'Aug 09', maxTemp: 30, minTemp: 21, condition: 'Light Rain', rainProbPct: 40, windKmh: 16 },
      { day: 'Mon', date: 'Aug 10', maxTemp: 31, minTemp: 22, condition: 'Sunny', rainProbPct: 10, windKmh: 13 },
      { day: 'Tue', date: 'Aug 11', maxTemp: 32, minTemp: 23, condition: 'Clear Sky', rainProbPct: 5, windKmh: 12 },
      { day: 'Wed', date: 'Aug 12', maxTemp: 33, minTemp: 24, condition: 'Sunny', rainProbPct: 0, windKmh: 11 },
    ]
  },
  'Bengaluru (RMC Yard)': {
    district: 'Bengaluru (RMC Yard)',
    locationName: 'Bengaluru Urban & Peri-Urban',
    currentTempC: 27,
    condition: 'Overcast',
    icon: 'Cloud',
    humidityPct: 74,
    windSpeedKmh: 14,
    windDirection: 'WNW',
    rainfall24hMm: 8.5,
    uvIndex: 6,
    evapotranspirationEt0Mm: 3.9,
    sprayingAdvisory: {
      status: 'Do Not Spray',
      reason: 'Overcast conditions with high humidity and rain expected within 3 hours.'
    },
    weeklyForecast: [
      { day: 'Thu', date: 'Aug 06', maxTemp: 27, minTemp: 20, condition: 'Overcast', rainProbPct: 70, windKmh: 14 },
      { day: 'Fri', date: 'Aug 07', maxTemp: 28, minTemp: 20, condition: 'Light Rain', rainProbPct: 50, windKmh: 12 },
      { day: 'Sat', date: 'Aug 08', maxTemp: 29, minTemp: 21, condition: 'Partly Cloudy', rainProbPct: 30, windKmh: 11 },
      { day: 'Sun', date: 'Aug 09', maxTemp: 28, minTemp: 20, condition: 'Moderate Shower', rainProbPct: 80, windKmh: 15 },
      { day: 'Mon', date: 'Aug 10', maxTemp: 27, minTemp: 19, condition: 'Light Rain', rainProbPct: 45, windKmh: 13 },
      { day: 'Tue', date: 'Aug 11', maxTemp: 29, minTemp: 20, condition: 'Sunny', rainProbPct: 15, windKmh: 10 },
      { day: 'Wed', date: 'Aug 12', maxTemp: 30, minTemp: 21, condition: 'Partly Cloudy', rainProbPct: 20, windKmh: 9 },
    ]
  }
};
