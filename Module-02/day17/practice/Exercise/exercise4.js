function applyToAll(list, fn) {
  const results = [];

  for (const item of list) {
    results.push(fn(item));
  }

  return results;
}

const prices = [100, 200, 500, 1000];

const addVat = price => price * 1.15;

const pricesWithVat = applyToAll(prices, addVat);

console.log(pricesWithVat);