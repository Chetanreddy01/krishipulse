/* ==========================================================================
   KrishiPulse - Dashboard Page Renderer (dashboard.js)
   Inspired by Apitex PWA & Petify Admin Dashboard (Envato Elements)
   ========================================================================== */

async function renderDashboardPage(containerEl) {
  if (!containerEl) return;

  // Immediate Mobile Skeleton / Placeholder View for instant mobile rendering
  containerEl.innerHTML = `
    <div class="page-transition">
      <div class="card-hero-mesh mb-6">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div style="font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; color: #B45309;">
              KRISHIPULSE ENTERPRISE PLATFORM
            </div>
            <h1 class="welcome-title mt-1" style="color: #0F172A;">
              Welcome back, <span class="badge badge-amber" style="font-size: 16px; padding: 4px 14px;">Chetan</span> 👋
            </h1>
            <p class="card-subtitle mt-1" style="color: #475569; font-weight: 700;">
              Active Mandi Hub: <strong style="color: #15803D;">Mandya Region</strong> · Total Land: <strong>12.5 Acres</strong>
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button class="btn btn-dark" onclick="document.querySelector('[data-tab=advisor]').click()">
              <span>🧪 Run Crop Advisor</span>
            </button>
            <button class="btn btn-primary" onclick="document.querySelector('[data-tab=market]').click()">
              <span>📈 APMC Market Feeds</span>
            </button>
          </div>
        </div>
      </div>
      <div class="card p-8 text-center text-muted">
        🌾 Loading telemetry & APMC market prices...
      </div>
    </div>
  `;

  // Fetch telemetry data from API layer with fallbacks
  let user, weather, plots, apmcPrices;
  try {
    user = await fetchUserProfile();
    weather = await fetchWeatherData(user.district);
    plots = await fetchFarmPlots();
    apmcPrices = await fetchApmcPrices(user.district);
  } catch (err) {
    console.log('Dashboard fetch error fallback:', err);
  }

  // Ensure default structures if data is pending
  user = user || { name: 'Chetan', district: 'Mandya', farmSizeAcres: 12.5 };
  weather = weather || { currentTempC: 28, condition: 'Clear Sky', sprayingAdvisory: { status: 'Optimal Window' } };
  plots = plots || [
    { id: 'plot-1', plotName: 'North Field - Ragi', areaAcres: 5.5, healthScorePct: 94, growthStage: 'Vegetative' },
    { id: 'plot-2', plotName: 'East Field - Sugarcane', areaAcres: 4.0, healthScorePct: 88, growthStage: 'Maturation' }
  ];
  apmcPrices = apmcPrices || [
    { cropName: 'Finger Millet (Ragi)', mandiName: 'Mandya Main APMC', modalPrice: 3450, arrivalQtyTonnes: 145.5, changePercent: 3.2 }
  ];

  const totalAcres = plots.reduce((sum, p) => sum + (p.areaAcres || 0), 0);
  const totalRevenue = plots.reduce((sum, p) => sum + (p.expectedRevenueRs || 245000), 0);
  const avgHealth = Math.round(plots.reduce((sum, p) => sum + (p.healthScorePct || 90), 0) / plots.length);

  containerEl.innerHTML = `
    <div class="page-transition">
      
      <!-- Apitex Inspired Hero Card (Warm Mesh Gradient & Quick Action Pills) -->
      <div class="card-hero-mesh mb-6">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div style="font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; color: #B45309;">
              KRISHIPULSE ENTERPRISE PLATFORM
            </div>
            <h1 class="welcome-title mt-1" style="color: #0F172A;">
              Welcome back, <span class="badge badge-amber" style="font-size: 16px; padding: 4px 14px;">${user.name}</span> 👋
            </h1>
            <p class="card-subtitle mt-1" style="color: #475569; font-weight: 700;">
              Active Mandi Hub: <strong style="color: #15803D;">${user.district} Region</strong> · Total Land: <strong>${user.farmSizeAcres} Acres</strong>
            </p>
          </div>

          <!-- Quick Action Buttons (Apitex Dark Pill Style) -->
          <div class="flex items-center gap-3">
            <button class="btn btn-dark" onclick="document.querySelector('[data-tab=advisor]').click()">
              <span>🧪 Run Crop Advisor</span>
            </button>
            <button class="btn btn-primary" onclick="document.querySelector('[data-tab=market]').click()">
              <span>📈 APMC Market Feeds</span>
            </button>
          </div>
        </div>

        <!-- Quick Land Parcel Avatars Row (Apitex Quick Money Transfer Row) -->
        <div class="mt-6 pt-4 border-t border-amber-300 flex items-center justify-between flex-wrap gap-3">
          <div class="flex items-center gap-3">
            <span class="text-xs font-black text-amber-900 uppercase tracking-wider">Quick Field Parcels:</span>
            <div class="flex items-center gap-2">
              ${plots.map(p => `
                <div class="flex items-center gap-2 p-2 px-3 rounded-full bg-white/80 border border-amber-200 text-xs font-black shadow-xs">
                  <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>${p.plotName ? p.plotName.split('-')[0] : 'Parcel'}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="text-xs font-black text-emerald-900 bg-white/80 px-3 py-1.5 rounded-full border border-emerald-300">
            🌾 Projected Harvest: <strong>${formatLakhs(totalRevenue)}</strong>
          </div>
        </div>
      </div>

      <!-- Petify Inspired Pastel Stat Cards (4 Columns) -->
      <div class="kpi-grid">
        <div class="card card-hoverable card-pastel-emerald stat-card">
          <div class="stat-header">
            <span class="stat-label">Active Managed Land</span>
            <div class="stat-icon">🛡️</div>
          </div>
          <div class="stat-value">${totalAcres} <span class="stat-unit">Acres</span></div>
          <div class="stat-footer">
            <span>${plots.length} Active Parcels</span>
            <span class="badge badge-emerald">+2.5 Acres</span>
          </div>
        </div>

        <div class="card card-hoverable card-pastel-amber stat-card">
          <div class="stat-header">
            <span class="stat-label">Micro-Climate Weather</span>
            <div class="stat-icon">☀️</div>
          </div>
          <div class="stat-value">${weather.currentTempC}°C</div>
          <div class="stat-footer">
            <span>${weather.condition}</span>
            <span class="badge badge-amber">${weather.sprayingAdvisory ? weather.sprayingAdvisory.status : 'Optimal'}</span>
          </div>
        </div>

        <div class="card card-hoverable card-pastel-sky stat-card">
          <div class="stat-header">
            <span class="stat-label">Pending Field Tasks</span>
            <div class="stat-icon">⏱️</div>
          </div>
          <div class="stat-value">3 <span class="stat-unit">Tasks</span></div>
          <div class="stat-footer">
            <span>1 High Priority</span>
            <span class="badge badge-slate">Scheduled</span>
          </div>
        </div>

        <div class="card card-hoverable card-pastel-purple stat-card">
          <div class="stat-header">
            <span class="stat-label">Overall Crop Health</span>
            <div class="stat-icon">🌱</div>
          </div>
          <div class="stat-value">${avgHealth}%</div>
          <div class="progress-bar-track mt-1">
            <div class="progress-bar-fill" style="width: ${avgHealth}%;"></div>
          </div>
        </div>
      </div>

      <!-- Main Dashboard Grid: APMC Mandi Prices + Active Parcels -->
      <div class="dashboard-grid mb-6">
        
        <!-- Left 8 Cols: APMC Live Prices -->
        <div class="card" style="grid-column: span 8;">
          <div class="card-header">
            <div>
              <h3 class="card-title">Karnataka APMC Mandi Commodity Rates</h3>
              <p class="card-subtitle">Live trading prices across Mandya, Maddur & Kolar APMC markets.</p>
            </div>
            <span class="badge badge-emerald">LIVE TELEMETRY</span>
          </div>

          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Commodity</th>
                  <th>Mandi Hub</th>
                  <th>Modal Price</th>
                  <th>Arrivals</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                ${apmcPrices.map(item => `
                  <tr>
                    <td><strong>${item.cropName}</strong></td>
                    <td>${item.mandiName}</td>
                    <td style="font-family: monospace; font-weight: 900; color: var(--primary-green);">${formatRupees(item.modalPrice)}/Q</td>
                    <td>${item.arrivalQtyTonnes} Tonnes</td>
                    <td><span class="badge ${(item.changePercent || 0) >= 0 ? 'badge-emerald' : 'badge-rose'}">${(item.changePercent || 0) >= 0 ? '+' : ''}${item.changePercent || 0}%</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right 4 Cols: Active Managed Parcels -->
        <div class="card" style="grid-column: span 4;">
          <div class="card-header">
            <h3 class="card-title">Active Managed Plots</h3>
            <span class="badge badge-slate">${plots.length} Active</span>
          </div>

          <div class="flex flex-col gap-3">
            ${plots.map(plot => `
              <div class="card p-3" style="padding: 14px; background-color: var(--bg-primary);">
                <div class="flex items-center justify-between mb-1">
                  <strong style="font-size: 13px; color: var(--text-primary);">${plot.plotName}</strong>
                  <span class="badge badge-emerald">${plot.growthStage}</span>
                </div>
                <div class="flex items-center justify-between text-xs font-semibold mb-2" style="color: var(--text-secondary);">
                  <span>${plot.currentCrop} (${plot.areaAcres} Acres)</span>
                  <strong style="color: var(--primary-green);">${plot.healthScorePct}% Health</strong>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: ${plot.healthScorePct}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}
