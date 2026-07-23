# Inventory management system
stock = {}

try:
    with open('stock.txt', 'r') as file:
        for line in file:
            item, qty = line.strip().split(',')
            stock[item] = int(qty)

except FileNotFoundError:
    print("Stock file not found. Starting with an empty inventory.")


def adjust_stock(item, amount):
    stock[item] = stock.get(item, 0) + amount


adjust_stock("paracetamol", -10)
adjust_stock("vitamin_c", 5)

low_stock = [item for item, qty in stock.items() if qty < 10]


print("current stock:")
print(stock)
print("low stock:", low_stock)



with open('stock.txt', 'w') as file:
    for item, qty in stock.items():
        file.write(f"{item},{qty}\n")