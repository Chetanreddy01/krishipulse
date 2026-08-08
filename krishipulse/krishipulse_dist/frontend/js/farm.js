/* ==========================================================================
   KrishiPulse - Farm Management & Expense Tracker Renderer (farm.js)
   Author: Chetan (Mandya, Karnataka)
   ========================================================================== */

async function renderFarmPage(containerEl) {
  if (!containerEl) return;

  const plots = await fetchFarmPlots();

  containerEl.innerHTML = `
    <div class="page-transition">
      <div class="card mb-6">
        <div class="card-header">
          <div>
            <h1 class="welcome-title">Farm Management & Input Expense Ledger</h1>
            <p class="card-subtitle mt-1">Managed land parcels, crop growth stages & expense ledgers.</p>
          </div>
          <span class="badge badge-emerald">${plots.length} PARCELS REGISTERED</span>
        </div>
      </div>

      <div class="farm-plots-grid">
        ${plots.map(plot => `
          <div class="card card-hoverable plot-item-card">
            <div>
              <div class="flex items-center justify-between pb-3 border-b mb-3">
                <div>
                  <h3 class="card-title">${plot.plotName}</h3>
                  <div class="text-xs font-semibold text-muted mt-0.5">${plot.currentCrop} (${plot.areaAcres} Acres)</div>
                </div>
                <span class="badge badge-emerald">${plot.growthStage}</span>
              </div>

              <div class="mb-3">
                <div class="flex justify-between text-xs font-bold text-primary mb-1">
                  <span>Crop Health Score</span>
                  <span class="text-primary-green">${plot.healthScorePct}%</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: ${plot.healthScorePct}%;"></div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2 text-center p-2 rounded-lg border mb-3" style="background-color: var(--bg-primary);">
                <div>
                  <div class="text-xs text-muted">Input Expenses</div>
                  <div class="text-xs font-bold text-primary mt-0.5">${formatRupees(plot.totalExpensesRs)}</div>
                </div>
                <div style="border-left: 1px solid var(--border-color);">
                  <div class="text-xs font-bold text-primary-green">Est. Harvest Revenue</div>
                  <div class="text-xs font-bold text-primary-green mt-0.5">${formatRupees(plot.expectedRevenueRs)}</div>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t flex justify-between text-xs font-semibold text-muted">
              <span>Sown: ${plot.sowingDate}</span>
              <span>Harvest: ${plot.expectedHarvestDate}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
