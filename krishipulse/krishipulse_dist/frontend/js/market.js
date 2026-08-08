/* ==========================================================================
   KrishiPulse - Market Page Renderer (market.js)
   Author: Chetan (Mandya, Karnataka)
   ========================================================================== */

async function renderMarketPage(containerEl) {
  if (!containerEl) return;

  const prices = await fetchApmcPrices('Mandya');

  containerEl.innerHTML = `
    <div class="page-transition">
      <div class="card mb-6">
        <div class="card-header">
          <div>
            <h1 class="welcome-title">Karnataka APMC Mandi Intelligence</h1>
            <p class="card-subtitle mt-1">Real-time commodity market prices & Mandi Arbitrage opportunities.</p>
          </div>
          <span class="badge badge-emerald">LIVE MARKET FEEDS</span>
        </div>
      </div>

      <div class="market-grid">
        ${prices.map(item => `
          <div class="card card-hoverable flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-3 border-b mb-3">
                <div>
                  <h3 class="card-title">${item.cropName}</h3>
                  <div class="text-xs font-semibold text-muted mt-0.5">${item.mandiName} (${item.district})</div>
                </div>
                <span class="badge ${item.changePercent >= 0 ? 'badge-emerald' : 'badge-rose'}">
                  ${item.changePercent >= 0 ? '+' : ''}${item.changePercent}%
                </span>
              </div>

              <div class="mandi-price-box">
                <div>
                  <div class="text-xs text-muted">Min</div>
                  <div class="text-xs font-bold text-primary mt-0.5">₹${item.minPrice}</div>
                </div>
                <div style="border-left: 1px solid var(--border-color); border-right: 1px solid var(--border-color);">
                  <div class="text-xs font-bold text-primary-green">Modal</div>
                  <div class="text-sm font-extrabold text-primary-green mt-0.5">₹${item.modalPrice}</div>
                </div>
                <div>
                  <div class="text-xs text-muted">Max</div>
                  <div class="text-xs font-bold text-primary mt-0.5">₹${item.maxPrice}</div>
                </div>
              </div>

              ${item.arbitrageTarget ? `
                <div class="arbitrage-pill mb-3">
                  <div class="text-xs font-bold text-primary-green flex justify-between">
                    <span>Mandi Arbitrage Target</span>
                    <span>↗</span>
                  </div>
                  <div class="text-xs font-bold text-primary mt-1">
                    Sell at <strong>${item.arbitrageTarget.mandiName}</strong> for ₹${item.arbitrageTarget.modalPrice}/Q
                  </div>
                  <div class="text-xs font-bold text-primary-green mt-0.5">
                    +₹${item.arbitrageTarget.extraGainPerQuintal}/Quintal net extra profit!
                  </div>
                </div>
              ` : ''}
            </div>

            <div class="pt-3 border-t flex justify-between text-xs font-semibold text-muted">
              <span>Arrivals: ${item.arrivalQtyTonnes} Tonnes</span>
              <span>Updated Today</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
