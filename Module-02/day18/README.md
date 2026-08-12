Module responsibilities
transactions.js — owns the raw data only. It exports a single array, transactions, of { id, customer, amount, type } objects. It contains no logic and no console.log calls.
report.js — owns all the summarizing and formatting logic. Every export is a pure function (same input always gives the same output, no side effects, no mutation of arguments):
totalByType(txns, type) — filters transactions to one type, then reduces their amounts into a total.
formatReceipts(txns) — maps each transaction into a receipt string. The callback destructures { customer, amount, type } directly out of each transaction object.
withCorrectedAmount(txn, newAmount) — returns a new transaction object via { ...txn, amount: newAmount }, leaving the original object untouched.
summarize(txns) — combines filter and reduce to split transactions into credits/debits and total each in one call.
app.js — the only module that touches console.log. It imports the data from transactions.js and the functions from report.js, calls them, and prints the resulting report.