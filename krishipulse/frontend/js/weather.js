/* ==========================================================================
   KrishiPulse - Weather Page Renderer (weather.js)
   Author: Chetan (Mandya, Karnataka)
   ========================================================================== */

async function renderWeatherPage(containerEl) {
  if (!containerEl) return;

  const weather = await fetchWeatherData('Mandya');

  containerEl.innerHTML = `
    <div class="page-transition">
      <div class="card mb-6">
        <div class="card-header">
          <div>
            <h1 class="welcome-title">Micro-Climate Weather Dashboard</h1>
            <p class="card-subtitle mt-1">Real-time agricultural weather station telemetry & spraying advisories.</p>
          </div>
          <span class="badge badge-emerald">MANDYA STATION</span>
        </div>
      </div>

      <div class="weather-grid">
        <div class="card">
          <div class="flex items-center justify-between pb-4 border-b mb-4">
            <div>
              <div class="text-xs font-semibold text-muted">${weather.locationName}</div>
              <h2 style="font-size: 42px; font-weight: 800; color: var(--text-primary);">${weather.currentTempC}°C</h2>
              <div class="text-sm font-bold text-primary-green mt-1">${weather.condition}</div>
            </div>
            <span style="font-size: 48px;">☀️</span>
          </div>

          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="card p-3" style="padding: 12px; background-color: var(--bg-primary);">
              <div class="text-xs text-muted">Humidity</div>
              <div class="text-sm font-bold text-primary mt-1">${weather.humidityPct}%</div>
            </div>

            <div class="card p-3" style="padding: 12px; background-color: var(--bg-primary);">
              <div class="text-xs text-muted">Wind Speed</div>
              <div class="text-sm font-bold text-primary mt-1">${weather.windSpeedKmh} km/h</div>
            </div>

            <div class="card p-3" style="padding: 12px; background-color: var(--bg-primary);">
              <div class="text-xs text-muted">24h Rainfall</div>
              <div class="text-sm font-bold text-primary mt-1">${weather.rainfall24hMm} mm</div>
            </div>
          </div>
        </div>

        <div class="card flex flex-col justify-between">
          <div>
            <div class="card-header">
              <h3 class="card-title">Spraying Safety Window</h3>
              <span class="badge badge-emerald">${weather.sprayingAdvisory.status}</span>
            </div>

            <div class="card p-4 mb-4" style="background-color: rgba(22, 163, 74, 0.08); border-color: rgba(22, 163, 74, 0.3);">
              <div class="text-sm font-bold text-dark-green mb-1">Status: ${weather.sprayingAdvisory.status}</div>
              <p class="text-xs text-secondary font-semibold">${weather.sprayingAdvisory.reason}</p>
            </div>
          </div>

          <div class="card p-3 flex justify-between text-xs font-bold" style="background-color: var(--bg-primary);">
            <span>Evapotranspiration Index (ET0):</span>
            <strong style="font-family: monospace; color: var(--primary-green);">3.8 mm/day</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}
