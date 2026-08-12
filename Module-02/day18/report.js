// report.js
// Responsible for: turning raw transaction data into summaries and
// formatted output. Every function here is pure — it takes transactions
// in and returns a value out, with no console output and no mutation of
// its inputs.

/**
 * Filters transactions down to one type, then sums their amounts.
 * @param {Array<object>} txns
 * @param {"credit"|"debit"} type
 * @returns {number}
 */
export const totalByType = (txns, type) =>
  txns
    .filter((t) => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

/**
 * Builds a list of human-readable receipt strings, one per transaction.
 * The callback destructures { customer, amount, type } straight out of
 * each transaction object.
 * @param {Array<object>} txns
 * @returns {string[]}
 */
export const formatReceipts = (txns) =>
  txns.map(({ customer, amount, type }) => {
    const sign = type === "credit" ? "+" : "-";
    return `${customer}: ${sign}${amount} ETB (${type})`;
  });

/**
 * Returns a NEW transaction object with an updated amount, leaving the
 * original transaction untouched. Useful for correcting a mistyped amount.
 * @param {object} txn
 * @param {number} newAmount
 * @returns {object}
 */
export const withCorrectedAmount = (txn, newAmount) => ({
  ...txn,
  amount: newAmount,
});

/**
 * Splits transactions into credits and debits using filter, and returns
 * both the totals and the counts as a single summary object.
 * @param {Array<object>} txns
 * @returns {{credits: Array<object>, debits: Array<object>, creditTotal: number, debitTotal: number}}
 */
export const summarize = (txns) => {
  const credits = txns.filter((t) => t.type === "credit");
  const debits = txns.filter((t) => t.type === "debit");

  const creditTotal = credits.reduce((sum, { amount }) => sum + amount, 0);
  const debitTotal = debits.reduce((sum, { amount }) => sum + amount, 0);

  return { credits, debits, creditTotal, debitTotal };
};