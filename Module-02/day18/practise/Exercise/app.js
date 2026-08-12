// app.js
// Imports and uses the money.js module.

import { addVat, VAT } from "./money.js";

console.log(`Current VAT rate: ${VAT * 100}%`);

const prices = [200, 500, 1000];

const totals = prices.map(addVat);

console.log("Prices with VAT applied:", totals);