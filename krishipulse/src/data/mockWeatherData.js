/**
 * Karnataka District Micro-Climate Weather Dataset (Pure JavaScript)
 * Author: Chetan (Mandya Station)
 */

export const mockWeatherDataByDistrict = {
  Mandya: {
    district: 'Mandya',
    locationName: 'Mandya Central Station',
    currentTempC: 28,
    condition: 'Partly Cloudy',
    icon: 'partly-cloudy',
    humidityPct: 76,
    windSpeedKmh: 14,
    windDirection: 'SW',
    rainfall24hMm: 4.2,
    uvIndex: 6,
    evapotranspirationEt0Mm: 4.8,
    sprayingAdvisory: {
      status: 'Optimal',
      reason: 'Wind speed under 15 km/h with high relative humidity.'
    },
    weeklyForecast: [
      { day: 'Thu', date: '06 Aug', maxTemp: 29, minTemp: 21, condition: 'Partly Cloudy', rainProbPct: 20 },
      { day: 'Fri', date: '07 Aug', maxTemp: 30, minTemp: 22, condition: 'Sunny', rainProbPct: 10 },
      { day: 'Sat', date: '08 Aug', maxTemp: 28, minTemp: 21, condition: 'Light Rain', rainProbPct: 65 },
      { day: 'Sun', date: '09 Aug', maxTemp: 27, minTemp: 20, condition: 'Thunderstorm', rainProbPct: 80 }
    ]
  },
  Kolar: {
    district: 'Kolar',
    locationName: 'Kolar Weather Station',
    currentTempC: 30,
    condition: 'Sunny',
    icon: 'sun',
    humidityPct: 62,
    windSpeedKmh: 18,
    windDirection: 'NW',
    rainfall24hMm: 0.0,
    uvIndex: 8,
    evapotranspirationEt0Mm: 5.6,
    sprayingAdvisory: {
      status: 'Caution',
      reason: 'High wind speed (18 km/h). Potential pesticide drift.'
    },
    weeklyForecast: [
      { day: 'Thu', date: '06 Aug', maxTemp: 31, minTemp: 23, condition: 'Sunny', rainProbPct: 5 },
      { day: 'Fri', date: '07 Aug', maxTemp: 32, minTemp: 23, condition: 'Clear', rainProbPct: 0 }
    ]
  }
};
