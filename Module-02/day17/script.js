'use strict';
//// rest params: any number of prices
//const subtotal = (...prices) =>
//prices.reduce((sum, p) => sum + p, 0);
//// factory (HOF + closure)
//const discountBy = rate =>
//n => n * (1 - rate);
//// small pure helpers
//const withVat = n => n * 1.15;
//const toETB = n => `${n.toFixed(2)} ETB`;
//
//// closure keeps a running order number
//function makeReceiptMaker() {
//let orderNo = 0;
//const memberOff = discountBy(0.10);
//return function (...items) {
//orderNo++;
//const gross = subtotal(...items);
//const net = withVat(memberOff(gross));
//return `#${orderNo}: ${toETB(net)}`;
//};
//}
//const receipt = makeReceiptMaker();
//// Almaz orders Doro Wat + Tibs + Shiro
//receipt(220, 180, 120);
//// "#1: 538.20 ETB"
//// Dawit orders Firfir + Buna
//receipt(140, 60);
//// "#2: 207.00 ETB"
//


//const subtotal = (...prices) =>
//  prices.reduce((sum, p) => sum + p, 0);
//
//
//const discountBy = rate => n => n * (1-rate);
//
//const withVat = n => n * 1.15;
//const toETB = n => `${n.toFixed(2)} ETB`;
//
//

"use strict";

/**
 * TODO: Write subtotal(...prices) using a reduce callback.
 * Use rest parameters to accept any number of prices [2, 3].
 */
const subtotal = (...prices) => {
  prices.reduce((sum, p) => sum + p, 0);
};

/**
 * TODO: Write discountBy(rate) as a factory returning an arrow function.
 * This is a Higher-Order Function (HOF) that creates a closure over the rate [2, 3].
 */
const discountBy = (rate) => {
  n => n * (1 - rate);
};

/**
 * TODO: Add withVat as a small pure helper.
 * It should add 15% VAT to a given amount [2, 3].
 */
const withVat = (n) => {
  n * 1.15
};

/**
 * TODO: Add toETB as a small pure helper.
 * It should format a number to 2 decimal places followed by " ETB" [2, 3].
 */
const toETB = (n) => {
  n.toFixed(2)
};

/**
 * TODO: Build makeReceiptMaker() with a private order number.
 * This function uses a closure to maintain the state of orderNo across calls [4, 5].
 * Inside, it should pre-build a 10% member discount function using discountBy(0.10) [5].
 */
function makeReceiptMaker() {
  let orderNo = 0; // Private state [4]
  const memberOff = discountBy(0.1);

  return function (...items) {
    orderNo++;
    const gross = subtotal(...items)
    const net = withVat(memberOff(gross));
    return `#${orderNo}: ${toETB(net)}`;  // 4. Format and return receipt string (e.g., "#1: 538.20 ETB") [5]
  };
}

// Export for run.js
//if (typeof module !== "undefined") {
 // module.exports = { subtotal, discountBy, withVat, toETB, makeReceiptMaker };
//}
const { makeReceiptMaker } = require("./order");
const receipt = makeReceiptMaker();

// Almaz orders Doro Wat (220), Tibs (180), and Shiro (120)
console.log(receipt(220, 180, 120));

// Dawit orders Firfir (140) and Buna (60)
console.log(receipt(140, 60));