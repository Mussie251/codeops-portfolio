/*console.log("Hello World");

let firstName = "mos"
let age = 47

console.log(firstName)

console.log(`Hello  ${firstName}`)

console.log(x)

var x
*/

// TeleBirr Tip & Split Calculator
// Run with: node tip.js

// ---- Sample inputs (edit these to test different cases) ----
const bill = "350";        // bill amount as a string, like it might come from a form
const partySize = 4;       // number of people splitting the bill
const paymentMethod = "TeleBirr"; // "TeleBirr", "CBE Birr", or "Cash"

// ---- Step 1: Read and convert the bill ----
const billAmount = Number(bill);
console.log("Bill amount (converted):", billAmount);

// ---- Step 2: Tiered tip ----
// 10% tip when bill is over 300 ETB, else 5%
const tipRate = billAmount > 300 ? 0.10 : 0.05;
const tipAmount = billAmount * tipRate;
console.log("Tip rate:", tipRate, "-> Tip amount:", tipAmount);

// ---- Step 3: Service fee based on payment method ----
// Use a switch statement to add a TeleBirr / CBE Birr service fee
let serviceFee = 0;
switch (paymentMethod) {
  case "TeleBirr":
    serviceFee = 5; // flat 5 ETB service fee for TeleBirr
    break;
  case "CBE Birr":
    serviceFee = 3; // flat 3 ETB service fee for CBE Birr
    break;
  case "Cash":
    serviceFee = 0; // no service fee for cash
    break;
  default:
    serviceFee = 0;
    console.log("Unknown payment method, no service fee applied.");
}
console.log("Service fee:", serviceFee);

// ---- Step 4: Totals ----
const total = billAmount + tipAmount + serviceFee;
const perPerson = total / partySize;

// ---- Step 5: Print a clear message ----
console.log(`
--- TeleBirr Tip & Split Calculator ---
Bill:          ${billAmount.toFixed(2)} ETB
Tip (${(tipRate * 100).toFixed(0)}%):     ${tipAmount.toFixed(2)} ETB
Service fee:   ${serviceFee.toFixed(2)} ETB (${paymentMethod})
Total:         ${total.toFixed(2)} ETB
Party size:    ${partySize}
Per person:    ${perPerson.toFixed(2)} ETB
`);