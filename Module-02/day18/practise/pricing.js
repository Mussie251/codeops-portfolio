// pricing.js
// Responsible for: pure pricing/formatting helpers only.
// No data, no console output — just functions that take numbers in and
// return numbers or strings out.

export const VAT_RATE = 0.15; // 15% VAT

/**
 * Adds VAT to a subtotal.
 * @param {number} amount - amount in ETB before VAT
 * @returns {number} amount in ETB after VAT
 */
export const withVat = (amount) => amount * (1 + VAT_RATE);

/**
 * Formats a number as an ETB currency string, e.g. 1234.5 -> "1,234.50 ETB"
 * @param {number} amount
 * @returns {string}
 */
export const format = (amount) =>
  `${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ETB`;