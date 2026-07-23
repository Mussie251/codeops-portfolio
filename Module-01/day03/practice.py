# Unique Cities
cities = ["Addis Ababa", "Nairobi", "Kampala", "Addis Ababa", "Kigali", "Nairobi"]
unique_cities = set(cities)

print(unique_cities)
print(len(unique_cities))


# price report

prices = {"Apple": 200, "Banana": 100, "Orange": 250, "Mango": 130}
for fruit, price in prices.items():
    print(f"{fruit}: {price} ETB")


#Tax comprehension

prices = [100, 200, 300, 400, 500]
taxed_prices = [price * 1.15 for price in prices]  # Assuming a 15% tax rate
print(taxed_prices)

#Cheap items
prices = {"Laptop": 1500, "Mouse": 50, "Keyboard": 100, "Monitor": 300, "USB Drive": 20}
cheap_items = {item: price for item, price in prices.items() if price < 200}
print(cheap_items)

#write & read file

names = ["Abel", "Bruk", "Nati", "Sara"]

with open("names.txt", "w") as file:
    for name in names:
        file.write(name + "\n")


with open("names.txt", "r") as file:
    for line in file:
        print(line.strip())



#safe division

try:
    number = int(input("Enter a number: "))
    result = 100 / number
    print(f"Result: {result}")

except ValueError:
    print("Invalid input. Please enter a valid number.")

except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")