// exercise3.js
// Destructure name and city from a customer in one line, then write a
// greet({ name }) function that uses parameter destructuring.

const customer = {
  name: "Abebe Kebede",
  city: "Addis Ababa",
  balance: 350,
};

// One-line destructuring
const { name, city } = customer;
console.log(`${name} lives in ${city}.`);

// Parameter destructuring: pulls `name` straight out of the argument object
function greet({ name }) {
  return `Hello, ${name}! Welcome back.`;
}

console.log(greet(customer));