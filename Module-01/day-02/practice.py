# Exercise 1
temperature = float(input("Enter temperature in °C: "))

if temperature < 15:
    print("cold")
elif temperature < 25:
    print("warm")
else:
    print("hot")




# Exercise 2
for i in range(1, 11):
    print(f"Receipt #{i}:")

# Exercise 3
for i in range(1, 21):
    if i % 2 == 0:
        print(i)

# Exercise 4
def apply_discount(price, percent=10):  
    discounted_price = price - (price * percent / 100)
    return discounted_price
print(apply_discount(100))  # Default discount of 10%
print(apply_discount(100, 20))  # Custom discount of 20%


# Exercise 5
count = 5
while count >= 1:
    print(count)
    count -= 1
print("Liftoff!")