// exercise2.js
// Build a customer object, then log every key and value using
// Object.entries in a for...of loop (no manual index counters).

const customer = {
  name: "Abebe Kebede",
  city: "Addis Ababa",
  balance: 350,
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}