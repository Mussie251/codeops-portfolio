A pricing module plus a script that takes an array of orders and produces a per-order total and a grand total in ETB, using map, filter, reduce, destructuring, and spread.

Module responsibilities
pricing.js — pure pricing helpers only, no data and no console.log:
VAT_RATE — the VAT rate (0.15).
withVat(amount) — returns amount with VAT applied.
format(amount) — returns an ETB-formatted string, e.g. "1,207.50 ETB".
summary.js — owns the order data and all the reporting logic, and is the only file that prints:
Each order is { id, customer, items: [{ name, price, qty }] }.
orderSubtotal(items) uses reduce to total an order's items, destructuring { price, qty } directly in the callback.
ordersWithTotals uses map + spread ({ ...order, total }) to attach a VAT-inclusive total field to a copy of each order, without mutating the original orders array.
bigOrders uses filter to keep only orders whose total exceeds 500 ETB.
grandTotal uses reduce again to sum every order's total.