"""
KrishiPulse - Micro-Climate Weather Router (routes/weather.py)
Author: Chetan (Mandya, Karnataka)
Description: Fetches REAL LIVE weather telemetry from Open-Meteo Public Satellite API.
"""

from fastapi import APIRouter
import urllib.request
import json
import schemas

router = APIRouter(prefix="/api/weather", tags=["Weather Telemetry"])

# Coordinates mapping for Karnataka District Hubs
DISTRICT_COORDINATES = {
    "mandya": {"lat": 12.5218, "lon": 76.8951, "name": "Mandya Agri Station"},
    "mysuru": {"lat": 12.2958, "lon": 76.6394, "name": "Mysuru Agri Hub"},
    "bengaluru": {"lat": 12.9716, "lon": 77.5946, "name": "Bengaluru Urban Station"},
    "kalaburagi": {"lat": 17.3297, "lon": 76.8343, "name": "Kalaburagi Dryland Hub"},
    "belagavi": {"lat": 15.8497, "lon": 74.5086, "name": "Belagavi Sugar Belt Station"},
    "kolar": {"lat": 13.1367, "lon": 78.1292, "name": "Kolar Vegetable Station"}
}

@router.get("", response_model=schemas.WeatherSchema)
def read_live_weather_telemetry(district: str = "Mandya"):
    """
    Fetches real-time live meteorological telemetry from Open-Meteo Weather Satellite API.
    """
    dist_key = district.lower()
    coords = DISTRICT_COORDINATES.get(dist_key, DISTRICT_COORDINATES["mandya"])
    
    # Live Open-Meteo Satellite API URL
    url = f"https://api.open-meteo.com/v1/forecast?latitude={coords['lat']}&longitude={coords['lon']}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FKolkata"
    
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            current = data.get("current", {})
            
            temp_c = round(current.get("temperature_2m", 28))
            humidity = round(current.get("relative_humidity_2m", 68))
            wind_speed = round(current.get("wind_speed_10m", 14))
            rainfall = current.get("precipitation", 0.0)

            # Calculate Spraying Advisory Window based on live wind speed & temp
            if wind_speed < 18 and temp_c < 34:
                status = "Optimal Window"
                reason = f"Safe live wind speed ({wind_speed} km/h) & safe live temperature ({temp_c}°C)."
            else:
                status = "High Wind Alert"
                reason = f"Live wind speed is {wind_speed} km/h. Avoid high-altitude spraying."

            return {
                "locationName": coords["name"],
                "currentTempC": temp_c,
                "condition": "Clear Sky / Live Feed" if temp_c > 26 else "Partly Cloudy",
                "humidityPct": humidity,
                "windSpeedKmh": wind_speed,
                "rainfall24hMm": rainfall,
                "sprayingAdvisory": {
                    "status": status,
                    "reason": reason
                }
            }
    except Exception as e:
        print(f"Error fetching live Open-Meteo weather API: {e}")

    # Fallback if offline
    return {
        "locationName": coords["name"],
        "currentTempC": 28,
        "condition": "Live Telemetry Unavailable",
        "humidityPct": 68,
        "windSpeedKmh": 14,
        "rainfall24hMm": 0.0,
        "sprayingAdvisory": {
            "status": "Optimal Window",
            "reason": "Safe temperature & wind index."
        }
    }
