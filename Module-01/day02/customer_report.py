customers = [
 ("Almaz", 1500), ("Dawit", 700), ("Tigist", 200),
 ("Hanna", 1200), ("Samuel", 450),
]


def tier(balance):
    if balance >= 1000:
        return "premium"
    elif balance >= 500:
        return "standard"
    else:
        return "basic"
    

# Count the number of customers in each tier
premium_count = 0
standard_count = 0
basic_count = 0 


for name, balance in customers:
    customer_tier = tier(balance)
    print(f"{name}: {tier(balance)} ({balance} ETB)")


    if customer_tier == "premium":
        premium_count += 1
    elif customer_tier == "standard":
        standard_count += 1
    else:
        basic_count += 1

print(f"Premium customers: {premium_count}")
print(f"Standard customers: {standard_count}")
print(f"Basic customers: {basic_count}")