/* ==========================================================================
   KrishiPulse - Helper Utilities (utils.js)
   Author: Chetan (Mandya, Karnataka)
   Description: DOM selectors, Indian currency formatting (₹), and date helpers
   ========================================================================== */

// Shortcut for selecting a single DOM element
function $(selector) {
  return document.querySelector(selector);
}

// Shortcut for selecting multiple DOM elements
function $$(selector) {
  return document.querySelectorAll(selector);
}

// Format numbers into Indian Rupees (e.g., 3450 -> ₹3,450)
function formatRupees(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
}

// Format numbers into Lakhs (e.g., 820000 -> ₹8.2L)
function formatLakhs(amount) {
  if (!amount) return '₹0.0L';
  return `₹${(amount / 100000).toFixed(1)}L`;
}

// Format date into human-readable string (e.g. "2026-08-07" -> "07 Aug 2026")
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

// Attach to global window object
window.$ = $;
window.$$ = $$;
window.formatRupees = formatRupees;
window.formatLakhs = formatLakhs;
window.formatDate = formatDate;
