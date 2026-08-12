// exercise1.js
// Given an array of ETB prices: add 15% VAT (map), keep those under 1000 (filter),
// then compute a grand total (reduce). No manual for-loop counters.

const VAT_RATE = 0.15;

const prices = [200, 500, 800, 1200, 50, 900];

const round2 = (n) => Math.round(n * 100) / 100;

const pricesWithVat = prices.map((price) => round2(price * (1 + VAT_RATE)));

const under1000 = pricesWithVat.filter((price) => price < 1000);

const grandTotal = round2(under1000.reduce((total, price) => total + price, 0));

console.log("Original prices:", prices);
console.log("Prices with 15% VAT:", pricesWithVat);
console.log("Under 1000 after VAT:", under1000);
console.log("Grand total:", grandTotal);