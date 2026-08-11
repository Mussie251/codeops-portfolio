function vat(amount, rate = 0.15) {
  return amount * (1 + rate);
}

console.log(vat(1000));
console.log(vat(1000, 0.10));