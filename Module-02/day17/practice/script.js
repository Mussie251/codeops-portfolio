// ---- Pure calculation helpers (no side effects, no console output) ----

// Default rule: 1 point per 10 ETB spent
const standardRule = etb => Math.floor(etb / 10);

// Holiday rule: double points
const holidayRule = etb => Math.floor(etb / 10) * 2;

// Pure function: given current points + a redeem amount, compute new balance
const applyRedeem = (points, amount) => Math.max(0, points - amount);

// Pure function: given current points, an earn rule, and ETB spent, compute new balance
const applyEarn = (points, earnRule, etb) => points + earnRule(etb);

// ---- The module itself ----

function createLoyalty(earnRule = standardRule) {
  let points = 0; // private state — only reachable via closure

  return {
    earn(etb) {
      points = applyEarn(points, earnRule, etb); // HOF: rule passed in
      return points;
    },
    redeem(amount) {
      points = applyRedeem(points, amount);
      return points;
    },
    balance() {
      return points;
    },
  };
}

// ---- Usage (the only place console output belongs) ----

const card = createLoyalty();
card.earn(250);          // +25 points
card.redeem(10);
console.log(card.balance()); // 15

const holiday = createLoyalty(holidayRule);
holiday.earn(250);       // +50 points (double)
console.log(holiday.balance()); // 50

// Points can never go negative
const guard = createLoyalty();
guard.redeem(100);
console.log(guard.balance()); // 0

// Private state really is private:
console.log(card.points); // undefined — no direct access possible