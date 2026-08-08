/**
 * Utility Formatters
 * Formatting functions for currency, dates, and numbers.
 */

export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatLakhs = (amount) => {
  if (!amount) return '₹0.0L';
  return `₹${(amount / 100000).toFixed(1)}L`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatPercent = (val) => {
  return `${val >= 0 ? '+' : ''}${val}%`;
};
