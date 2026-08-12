// money.js
// A small module exporting VAT-related helpers.

export const VAT = 0.15;

/**
 * Adds VAT to a given ETB amount.
 * @param {number} amount
 * @returns {number}
 */
export function addVat(amount) {
  return amount * (1 + VAT);
}