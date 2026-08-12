// summary.js
// Responsible for: the order data, turning it into per-order totals and a
// grand total, and printing the report. Uses the pure helpers from
// pricing.js rather than duplicating any VAT or formatting logic.

import { withVat, format } from "./pricing.js";

const orders = [
  {
    id: 1,
    customer: "Almaz",
    items: [
      { name: "Berbere spice", price: 120, qty: 2 },
      { name: "Teff flour", price: 180, qty: 1 },
    ],
  },
  {
    id: 2,
    customer: "Dawit",
    items: [
      { name: "Coffee beans", price: 350, qty: 3 },
    ],
  },
  {
    id: 3,
    customer: "Tigist",
    items: [
      { name: "Injera pack", price: 60, qty: 4 },
      { name: "Shiro powder", price: 90, qty: 1 },
    ],
  },
  {
    id: 4,
    customer: "Selam",
    items: [
      { name: "Honey jar", price: 400, qty: 1 },
      { name: "Coffee beans", price: 350, qty: 1 },
    ],
  },
];

// reduce to total one order's items, destructuring { price, qty } straight
// out of each item in the callback
const orderSubtotal = (items) =>
  items.reduce((sum, { price, qty }) => sum + price * qty, 0);

// map + spread: attach a `total` field (subtotal with VAT applied) to a
// copy of each order, leaving the original order objects untouched
const ordersWithTotals = orders.map((order) => ({
  ...order,
  total: withVat(orderSubtotal(order.items)),
}));

// filter: only orders whose VAT-inclusive total exceeds 500 ETB
const bigOrders = ordersWithTotals.filter((order) => order.total > 500);

// reduce: grand total across all orders (VAT-inclusive)
const grandTotal = ordersWithTotals.reduce((sum, { total }) => sum + total, 0);

// ---- Printing (the only place console output happens) ----

console.log("=== Addis Market Order Summary ===\n");

ordersWithTotals.forEach(({ id, customer, total }) => {
  console.log(`Order #${id} — ${customer}: ${format(total)}`);
});

console.log(`\nGrand total (all orders, incl. VAT): ${format(grandTotal)}\n`);

console.log(`--- Orders over 500 ETB (${bigOrders.length}) ---`);
bigOrders.forEach(({ id, customer, total }) => {
  console.log(`Order #${id} — ${customer}: ${format(total)}`);
});