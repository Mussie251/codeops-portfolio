// app.js
// Responsible for: wiring the data (transactions.js) and the logic
// (report.js) together, and being the ONLY place that prints to the
// console. No summarizing or formatting logic lives here.

import { transactions } from "./transactions.js";
import { totalByType, formatReceipts, withCorrectedAmount, summarize } from "./report.js";

console.log("=== TeleBirr Transaction Report ===\n");

// filter + reduce, via totalByType
console.log(`Total debits: ${totalByType(transactions, "debit")} ETB`);
console.log(`Total credits: ${totalByType(transactions, "credit")} ETB\n`);

// filter + reduce together, via summarize
const { credits, debits, creditTotal, debitTotal } = summarize(transactions);
console.log(`(${debits.length} debit transactions totalling ${debitTotal} ETB)`);
console.log(`(${credits.length} credit transactions totalling ${creditTotal} ETB)\n`);

// map + destructuring, via formatReceipts
console.log("--- Receipts ---");
formatReceipts(transactions).forEach((line) => console.log(line));

// spread update: correct transaction #1's amount without mutating the original
console.log("\n--- Correcting a transaction ---");
const original = transactions[0];
const corrected = withCorrectedAmount(original, 275);

console.log("Original transaction:", original);
console.log("Corrected copy:", corrected);
console.log("Original was not mutated:", original.amount === 250);