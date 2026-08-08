/* ==========================================================================
   KrishiPulse - Main Application Controller (script.js)
   Author: Chetan (Mandya, Karnataka)
   Description: Connects all 13 modules, 4 template switchers, global search modal & router
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const appContent = $('#app-content');
  const navItems = $$('.nav-item');
  const regionBtn = $('#region-btn');
  const regionDropdown = $('#region-dropdown');
  const sidebar = $('#sidebar');
  const sidebarToggleBtn = $('#sidebar-toggle-btn');
  const currentTabLabel = $('#current-tab-label');
  const tmplBtns = $$('.tmpl-opt-btn');
  const headerProfileBtn = $('#header-profile-btn');
  const searchTriggerBtn = $('#search-trigger-btn');
  const searchModal = $('#search-modal');
  const closeSearchModalBtn = $('#close-search-modal');
  const globalSearchInput = $('#global-search-input');
  const searchItems = $$('.search-item');

  let currentTab = 'dashboard';

  // Open Search Modal
  function openSearchModal() {
    if (searchModal) {
      searchModal.style.display = 'flex';
      if (globalSearchInput) globalSearchInput.focus();
    }
  }

  // Close Search Modal
  function closeSearchModal() {
    if (searchModal) searchModal.style.display = 'none';
  }

  // Search trigger click
  if (searchTriggerBtn) {
    searchTriggerBtn.addEventListener('click', openSearchModal);
  }

  if (closeSearchModalBtn) {
    closeSearchModalBtn.addEventListener('click', closeSearchModal);
  }

  // Close search modal on backdrop click or ESC key
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearchModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === 'Escape') {
      closeSearchModal();
    }
  });

  // Navigation Tab Switcher
  function switchTab(tabId) {
    currentTab = tabId;

    // Update active nav styling
    navItems.forEach(item => {
      if (item.dataset.tab === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update breadcrumb header
    const tabTitles = {
      dashboard: 'Dashboard Overview',
      advisor: 'Crop Advisor & Vedic Organic Engine',
      market: 'APMC Market Intelligence',
      weather: 'Micro-Climate Weather Telemetry',
      farm: 'Farm Management & Operations Ledger',
      disease: 'AI Plant Disease Diagnostics',
      pest: 'Pest Diagnostics & Organic Remedies',
      irrigation: 'Smart Irrigation Telemetry',
      analytics: 'Financial Analytics & Benchmarks',
      schemes: 'Karnataka Govt Schemes & Subsidies',
      notifications: 'System Alert Feeds',
      profile: 'User Profile & Preferences',
      settings: 'Workspace Settings'
    };

    if (currentTabLabel) {
      currentTabLabel.textContent = tabTitles[tabId] || 'Dashboard';
    }

    // Render corresponding page module
    if (appContent) {
      switch (tabId) {
        case 'dashboard':
          renderDashboardPage(appContent);
          break;
        case 'advisor':
          renderAdvisorPage(appContent);
          break;
        case 'market':
          renderMarketPage(appContent);
          break;
        case 'weather':
          renderWeatherPage(appContent);
          break;
        case 'farm':
          renderFarmPage(appContent);
          break;
        case 'disease':
          renderDiseasePage(appContent);
          break;
        case 'pest':
          renderPestPage(appContent);
          break;
        case 'irrigation':
          renderIrrigationPage(appContent);
          break;
        case 'analytics':
          renderAnalyticsPage(appContent);
          break;
        case 'schemes':
          renderSchemesPage(appContent);
          break;
        case 'notifications':
          renderNotificationsPage(appContent);
          break;
        case 'profile':
          renderProfilePage(appContent);
          break;
        case 'settings':
          renderSettingsPage(appContent);
          break;
        default:
          renderDashboardPage(appContent);
          break;
      }
    }
  }

  // Attach click to search result items
  searchItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      if (tab) {
        closeSearchModal();
        switchTab(tab);
      }
    });
  });

  // Generic Module Renderers for Precision Labs & System
  function renderDiseasePage(container) {
    container.innerHTML = `
      <div class="page-transition">
        <div class="card mb-6">
          <div class="card-header">
            <div>
              <h1 class="welcome-title">AI Plant Disease Detection</h1>
              <p class="card-subtitle mt-1">Computer Vision diagnostic scanner for leaf blight, rust, and viral lesions.</p>
            </div>
            <span class="badge badge-emerald">VISION AI ACTIVE</span>
          </div>
        </div>
        <div class="card text-center p-12">
          <div style="font-size: 48px; margin-bottom: 12px;">🔬</div>
          <h3 class="card-title">Plant Leaf Diagnostic Scanner</h3>
          <p class="card-subtitle mt-1 mb-4">Upload a clear photograph of crop leaf or scan using smartphone camera.</p>
          <button class="btn btn-primary">📸 Upload Leaf Image for Analysis</button>
        </div>
      </div>
    `;
  }

  function renderPestPage(container) {
    container.innerHTML = `
      <div class="page-transition">
        <div class="card mb-6">
          <div class="card-header">
            <div>
              <h1 class="welcome-title">Pest Diagnostics & Organic Remedies</h1>
              <p class="card-subtitle mt-1">Targeted botanical treatments for stem borers, aphids, and thrips.</p>
            </div>
            <span class="badge badge-amber">ORGANIC PEST CONTROL</span>
          </div>
        </div>
        <div class="card p-6">
          <h3 class="card-title mb-2">🐛 Organic Neemastra & Agniastra Formulations</h3>
          <p class="card-subtitle mb-4">Select pest type to get exact botanical preparation steps.</p>
        </div>
      </div>
    `;
  }

  function renderIrrigationPage(container) {
    container.innerHTML = `
      <div class="page-transition">
        <div class="card mb-6">
          <div class="card-header">
            <div>
              <h1 class="welcome-title">Smart Irrigation Telemetry</h1>
              <p class="card-subtitle mt-1">Soil moisture sensors & automated solenoid valve controls.</p>
            </div>
            <span class="badge badge-emerald">VALVES AUTO MODE</span>
          </div>
        </div>
        <div class="kpi-grid">
          <div class="card card-pastel-sky">
            <div class="text-xs text-muted">North Field Moisture</div>
            <div class="text-2xl font-black mt-1">82%</div>
            <span class="badge badge-emerald mt-2">Optimal Moisture</span>
          </div>
          <div class="card card-pastel-emerald">
            <div class="text-xs text-muted">East Field Moisture</div>
            <div class="text-2xl font-black mt-1">74%</div>
            <span class="badge badge-emerald mt-2">Optimal Moisture</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderAnalyticsPage(container) {
    container.innerHTML = `
      <div class="page-transition">
        <div class="card mb-6">
          <div class="card-header">
            <div>
              <h1 class="welcome-title">Financial Analytics & Yield Benchmarks</h1>
              <p class="card-subtitle mt-1">Cost-per-acre analysis, net ROI, and harvest revenue forecasts.</p>
            </div>
            <span class="badge badge-emerald">+24.5% ANNUAL ROI</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderSchemesPage(container) {
    container.innerHTML = `
      <div class="page-transition">
        <div class="card mb-6">
          <div class="card-header">
            <div>
              <h1 class="welcome-title">Karnataka Govt Schemes & Subsidies</h1>
              <p class="card-subtitle mt-1">Official agricultural subsidy schemes, Krishi Bhagya & Raitha Siri updates.</p>
            </div>
            <span class="badge badge-amber">GOVT SUBSIDIES</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderNotificationsPage(container) {
    container.innerHTML = `
      <div class="page-transition">
        <div class="card mb-6">
          <div class="card-header">
            <div>
              <h1 class="welcome-title">System Alert Feeds</h1>
              <p class="card-subtitle mt-1">Real-time alerts for Mandi price surges and weather advisories.</p>
            </div>
            <span class="badge badge-emerald">0 UNREAD ALERTS</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderProfilePage(container) {
    container.innerHTML = `
      <div class="page-transition">
        <div class="card mb-6">
          <div class="card-header">
            <div>
              <h1 class="welcome-title">User Profile & Farm Registry</h1>
              <p class="card-subtitle mt-1">Verified Enterprise Profile for Chetan.</p>
            </div>
            <span class="badge badge-emerald">VERIFIED FARMER</span>
          </div>
        </div>
        <div class="card p-6 flex items-center gap-6">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Chetan" style="width: 80px; height: 80px; border-radius: 9999px; border: 3px solid var(--primary-green);">
          <div>
            <h2 class="welcome-title">Chetan</h2>
            <div class="text-sm font-bold text-primary-green">Lead Agronomist & Enterprise Owner</div>
            <div class="text-xs text-muted mt-1">Mobile: <strong>+91 7338025342</strong> · Email: <strong>chetanreddy445@gmail.com</strong></div>
            <div class="text-xs text-muted">Region Hub: <strong>Mandya, Karnataka</strong> · Managed Land: <strong>12.5 Acres</strong></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderSettingsPage(container) {
    container.innerHTML = `
      <div class="page-transition">
        <div class="card mb-6">
          <div class="card-header">
            <div>
              <h1 class="welcome-title">Workspace Settings</h1>
              <p class="card-subtitle mt-1">Telemetry refresh rate, REST API backend configurations, and preferences.</p>
            </div>
            <span class="badge badge-slate">v1.0.0</span>
          </div>
        </div>
      </div>
    `;
  }

  // Attach click listeners to nav items
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      if (tab) switchTab(tab);
    });
  });

  // Profile Header click
  if (headerProfileBtn) {
    headerProfileBtn.addEventListener('click', () => switchTab('profile'));
  }

  // 4 Template Design Switcher Controller
  tmplBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tmpl = btn.dataset.tmpl;
      
      tmplBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (tmpl === 'petify') {
        document.documentElement.setAttribute('data-template', 'petify');
      } else if (tmpl === 'linear') {
        document.documentElement.setAttribute('data-template', 'linear');
      } else if (tmpl === 'notion') {
        document.documentElement.setAttribute('data-template', 'notion');
      } else {
        document.documentElement.removeAttribute('data-template');
      }
    });
  });

  // Region Selector Dropdown Toggle
  if (regionBtn && regionDropdown) {
    regionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      regionDropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      regionDropdown.classList.remove('open');
    });
  }

  // Sidebar Mobile Toggle
  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Initial Page Render
  switchTab('dashboard');
});
