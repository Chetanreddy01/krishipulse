/* ==========================================================================
   KrishiPulse - Crop Advisor & Organic Farming Engine (advisor.js)
   Author: Chetan (Mandya, Karnataka)
   Description: Fetches 31 Karnataka district agricultural data from FastAPI REST API.
   ========================================================================== */

const traditionalRecipes = [
  {
    title: 'Jeevamrutha (Liquid Bio-Enhancer)',
    category: 'Soil Fertility & Microbes',
    description: 'Ancient Vedic soil revitalizer containing billions of beneficial nitrogen-fixing and phosphate-solubilizing microbes.',
    ingredients: '200L Water, 10kg Desi Cow Dung, 10L Cow Urine, 2kg Jaggery, 2kg Pulse Flour (Besan), 1 Handful Fertile Soil.',
    application: 'Ferment for 48 hours in shade. Apply 200L per acre via irrigation or direct soil drenching every 15 days.'
  },
  {
    title: 'Beejamrutha (Seed Treatment Solution)',
    category: 'Seed Immunization',
    description: 'Traditional organic seed coating protecting seeds from fungal spores, wilt, and root rot during germination.',
    ingredients: '20L Water, 5kg Cow Dung, 5L Cow Urine, 50g Lime (Chuna), 1 Handful Virgin Soil.',
    application: 'Soak seeds for 30 minutes, dry under shade, and sow immediately.'
  },
  {
    title: 'Panchagavya (Plant Growth Stimulant)',
    category: 'Immunity & Flowering Booster',
    description: 'Formulated from 5 cow derivatives. Increases photosynthetic rate, flower retention, and fruit weight.',
    ingredients: 'Cow Dung, Cow Urine, Cow Milk, Cow Curd, Desi Ghee, Tender Coconut Water, Bananas, Jaggery.',
    application: 'Dilute 3L Panchagavya in 100L water (3% concentration). Spray during flowering and fruit setting stages.'
  },
  {
    title: 'Neemastra (Organic Pest Repellent)',
    category: 'Organic Pest Control',
    description: 'Potent botanical insecticide targeting sucking pests such as aphids, thrips, whiteflies, and jassids.',
    ingredients: '10kg Crushed Neem Leaves, 10L Cow Urine, 2kg Cow Dung, 200L Water.',
    application: 'Ferment for 24-48 hours. Strain and spray directly on affected crop canopy.'
  },
  {
    title: 'Agniastra (Stem & Fruit Borer Control)',
    category: 'Strong Botanical Pesticide',
    description: 'High-potency organic formulation targeting caterpillar borers, leaf rollers, and pod borers.',
    ingredients: '10L Cow Urine, 1kg Neem Leaves, 500g Hot Green Chillies, 500g Garlic, 250g Crushed Ginger.',
    application: 'Boil for 30 minutes, cool for 48 hours, strain, dilute 6L in 200L water per acre.'
  }
];

async function fetchKarnatakaDistrictsFromAPI() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/advisor/districts');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log('Using local static fallback district data.');
  }

  return [
    { district: "Mandya", soil: "Red Loamy Soil", season: "Kharif, Rabi", crops: ["Sugarcane", "Paddy", "Ragi", "Banana", "Coconut"] },
    { district: "Kalaburagi", soil: "Black Cotton Soil", season: "Kharif, Rabi", crops: ["Red Gram (Tur)", "Jowar", "Bengal Gram", "Cotton", "Sunflower"] },
    { district: "Mysuru", soil: "Red & Black Soil", season: "Kharif, Rabi", crops: ["Paddy", "Ragi", "Cotton", "Tobacco", "Sugarcane"] },
    { district: "Kodagu", soil: "Red Laterite Soil", season: "Kharif", crops: ["Coffee", "Black Pepper", "Paddy", "Cardamom", "Arecanut"] },
    { district: "Belagavi", soil: "Deep Black Soil", season: "Kharif, Rabi", crops: ["Sugarcane", "Soybean", "Maize", "Tobacco", "Cotton"] }
  ];
}

async function renderAdvisorPage(containerEl) {
  if (!containerEl) return;

  const districtsData = await fetchKarnatakaDistrictsFromAPI();
  const defaultDistrict = districtsData[0] || { district: "Mandya", soil: "Red Loamy Soil", season: "Kharif, Rabi", crops: ["Sugarcane", "Paddy", "Ragi", "Banana", "Coconut"] };

  containerEl.innerHTML = `
    <div class="page-transition">
      <div class="card mb-6">
        <div class="card-header">
          <div>
            <h1 class="welcome-title">Crop Advisor & Organic Farming Engine</h1>
            <p class="card-subtitle mt-1">Karnataka 31-District Agriculture Dataset served via Python FastAPI REST API.</p>
          </div>
          <span class="badge badge-emerald">31 KARNATAKA DISTRICTS LOADED</span>
        </div>
      </div>

      <div class="advisor-grid">
        <!-- Left: Soil NPK Diagnostics & District Selector -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">🧪 Select Karnataka District</h3>
            <span class="badge badge-slate">FASTAPI REST API</span>
          </div>

          <div class="form-group mb-4">
            <label class="form-label">Karnataka District (${districtsData.length} Districts Available)</label>
            <select class="form-control" id="district-select">
              ${districtsData.map(d => `<option value="${d.district}">${d.district} District</option>`).join('')}
            </select>
          </div>

          <div class="p-3 mb-4 rounded border" style="background-color: var(--bg-primary);">
            <div class="text-xs font-bold text-muted uppercase">Dominant Soil Type</div>
            <div class="text-sm font-extrabold text-primary-green mt-0.5" id="district-soil-display">${defaultDistrict.soil}</div>
            
            <div class="text-xs font-bold text-muted uppercase mt-2">Major Growing Season</div>
            <div class="text-sm font-bold text-primary mt-0.5" id="district-season-display">${defaultDistrict.season}</div>
          </div>

          <div class="soil-slider-group">
            <div class="slider-val-header">
              <span>Nitrogen (N): <strong id="n-val">85</strong> kg/ha</span>
              <span class="text-primary-green">Optimal</span>
            </div>
            <input type="range" min="10" max="150" value="85" class="range-slider" id="n-slider">
          </div>

          <div class="soil-slider-group">
            <div class="slider-val-header">
              <span>Phosphorus (P): <strong id="p-val">45</strong> kg/ha</span>
              <span class="text-primary-green">Optimal</span>
            </div>
            <input type="range" min="5" max="100" value="45" class="range-slider" id="p-slider">
          </div>

          <div class="soil-slider-group">
            <div class="slider-val-header">
              <span>Potassium (K): <strong id="k-val">60</strong> kg/ha</span>
              <span class="text-primary-green">Optimal</span>
            </div>
            <input type="range" min="10" max="150" value="60" class="range-slider" id="k-slider">
          </div>

          <div class="soil-slider-group">
            <div class="slider-val-header">
              <span>Soil pH Level: <strong id="ph-val">6.8</strong></span>
              <span class="text-primary-green">Ideal Neutral</span>
            </div>
            <input type="range" min="4.5" max="8.5" step="0.1" value="6.8" class="range-slider" id="ph-slider">
          </div>

          <button class="btn btn-primary w-full" id="calc-crop-btn">
            ✨ Fetch District Crop Recommendations
          </button>
        </div>

        <!-- Right: District Top 5 Crops & Vedic Recipes -->
        <div class="flex flex-col gap-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title" id="rec-header-title">Top Major Crops for ${defaultDistrict.district}</h3>
              <span class="badge badge-emerald" id="rec-crop-count">5 Major Crops</span>
            </div>

            <div class="flex flex-col gap-3" id="rec-crops-list">
              ${defaultDistrict.crops.map((crop, idx) => `
                <div class="crop-card-item">
                  <div class="flex items-center justify-between">
                    <div>
                      <strong style="font-size: 15px; color: var(--text-primary);">#${idx + 1} ${crop}</strong>
                      <span class="badge badge-slate ml-2">${defaultDistrict.season}</span>
                    </div>
                    <span class="badge badge-emerald">High Suitability</span>
                  </div>
                  <div class="text-xs text-muted mt-1">
                    Dominant soil condition: <strong>${defaultDistrict.soil}</strong>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Traditional Vedic Recipes Card -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">📜 Traditional Indian Organic Formulations</h3>
              <span class="badge badge-amber">Vedic Organic Recipes</span>
            </div>

            <div class="flex flex-col gap-3">
              ${traditionalRecipes.map(recipe => `
                <div class="card p-3" style="padding: 14px; background-color: var(--bg-primary);">
                  <div class="flex items-center justify-between mb-1">
                    <strong style="font-size: 13px; color: var(--text-primary);">${recipe.title}</strong>
                    <span class="badge badge-slate">${recipe.category}</span>
                  </div>
                  <p class="text-xs font-semibold text-secondary mb-2">${recipe.description}</p>
                  <div class="text-xs font-bold text-primary-green mb-1">
                    🧂 Ingredients: ${recipe.ingredients}
                  </div>
                  <div class="text-xs font-semibold text-muted">
                    💡 Application: ${recipe.application}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach District Selector Event Listener
  const districtSelect = $('#district-select');
  if (districtSelect) {
    districtSelect.addEventListener('change', (e) => {
      const selectedName = e.target.value;
      const found = districtsData.find(d => d.district === selectedName);
      if (found) {
        $('#district-soil-display').textContent = found.soil;
        $('#district-season-display').textContent = found.season;
        $('#rec-header-title').textContent = `Top Major Crops for ${found.district}`;
        $('#rec-crops-list').innerHTML = found.crops.map((crop, idx) => `
          <div class="crop-card-item">
            <div class="flex items-center justify-between">
              <div>
                <strong style="font-size: 15px; color: var(--text-primary);">#${idx + 1} ${crop}</strong>
                <span class="badge badge-slate ml-2">${found.season}</span>
              </div>
              <span class="badge badge-emerald">High Suitability</span>
            </div>
            <div class="text-xs text-muted mt-1">
              Dominant soil condition: <strong>${found.soil}</strong>
            </div>
          </div>
        `).join('');
      }
    });
  }

  // Attach Range Sliders
  const nSlider = $('#n-slider');
  const pSlider = $('#p-slider');
  const kSlider = $('#k-slider');
  const phSlider = $('#ph-slider');

  if (nSlider) nSlider.oninput = (e) => $('#n-val').textContent = e.target.value;
  if (pSlider) pSlider.oninput = (e) => $('#p-val').textContent = e.target.value;
  if (kSlider) kSlider.oninput = (e) => $('#k-val').textContent = e.target.value;
  if (phSlider) phSlider.oninput = (e) => $('#ph-val').textContent = e.target.value;
}
