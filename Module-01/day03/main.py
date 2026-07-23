#In class Exercise: Transaction Log Reader

customer_totals = {}
try:

  with open("transactions.txt", "r") as file:
     for line in file:
        customer, amount = line.strip().split(",")
        amount = float(amount)
        if customer in customer_totals:
            customer_totals[customer] += amount
        else:
            customer_totals[customer] = amount


  sorted_customers = sorted(customer_totals.items(), key=lambda x: x[1], reverse=True)


  with open("report.txt", "w") as report:
     for customer, total in sorted_customers:
            report.write(f"{customer}: {total:.2f}\n")

  
  print("Report generated successfully.")

except FileNotFoundError:
    print("Transaction file not found.")
