
import random 

#1.Recursive Sum

def total(nums):

    if len(nums) == 0:             # Base Case
        return 0
    return nums[0] + total(nums[1:])

def count_down(n):

    if n <= 0:           #Base Case
        return

    print(n)

    count_down(n - 1)         #Recursive call

print("=" * 50)
print("1. Recursive Sum")
print("=" * 50)

numbers = [10, 20, 30, 50]

print("Numbers:", numbers)
print("Total:", total(numbers))

print("\nCountdown:")
count_down(5)

#2. Binary Search

def binary_search(items, target):

    left = 0
    right = len(items) - 1

    while left<= right:
        mid = (left + right) // 2

        if items[mid] == target:
            return mid
        elif items[mid] < target:
            left = mid + 1

        else:
            right = mid - 1


    return -1

print("\n" + "=" * 50)
print("2. Binary Search")
print("=" * 50)

balances = [100, 250, 400, 650, 900, 1200, 2000]

print("Balances:", balances)

target = 900

index = binary_search(balances, target)

print(f"{target} found at index:", index)

print("Searching for 500:", binary_search(balances, 500))


#3. Merge Sort

def merge(left, right):

    merged = []

    i=0
    j=0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1

        else:
            merged.append(left[i])
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])

    return merged

def merge_sort(items):

    if len(items) <= 1:
        return items

    middle = len(items) // 2
    left = merge_sort(items[:middle])
    right = merge_sort(items[middle:])
    return merge(left, right)

print("\n" + "=" * 50)
print("3. Merge Sort")
print("=" * 50)

random_list = [random.randint(1, 100) for _ in range(15)]

print("Original:")
print(random_list)

sorted_list = merge_sort(random_list)

print("\nMerge Sorted:")
print(sorted_list)

print("\nDo they match?")
print(sorted_list == sorted(random_list))

#4. Sort with a key

accounts = [("Abel", 1200), ("Sami", 750), ("Helen", 2500), ("Nati", 900), ("Kaleb", 1800)]

sorted_accounts = sorted(accounts, key=lambda account: account[1], reverse=True)


print("\n" + "=" * 50)
print("4. Sort with a key")
print("\n" + "=" * 50)

print("sorted by balance (highest first):")

for name, balance in sorted_accounts:
    print(f"{name}: {balance} ETB")


#5. Two pointers

def has_pair(nums, tarrget):

    left = 0
    right = len(nums) - 1

    while left < right:

        current_sum = nums[left] + nums[right]

        if current_sum == target:
            return True

        elif current_sum < target:
            left += 1

        else:
            right -= 1

    return False

print("\n" + "=" * 50)
print("5. Two Pointers")
print("=" * 50)

numbers = [2, 4, 7, 10, 15, 18, 25]

print("Numbers:", numbers)

target = 22

print(f"Is ther a pair that sums to {target}?")
print(has_pair(numbers, target))

target = 50

print(f"\nIs there a pair that sums to {target}?")
print(has_pair(numbers, target))

print("\nProgram Finished Successfully!")