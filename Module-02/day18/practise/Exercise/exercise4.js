// exercise4.js
// Produce an updated copy of a customer object with spread, changing the
// city and adding a phone field, without mutating the original.

const customer = {
  name: "Abebe Kebede",
  city: "Addis Ababa",
  balance: 350,
};

const updatedCustomer = {
  ...customer,
  city: "Adama",
  phone: "+251 91 122 3344",
};

console.log("Original customer:", customer);
console.log("Updated customer:", updatedCustomer);
console.log("Original was not mutated:", customer.city === "Addis Ababa" && customer.phone === undefined);