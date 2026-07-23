#Data structure and Big-O

import time
from collections import deque


#Exercise 1
numbers = [10, 20, 30, 40, 50]
#1.Big-O: O(1)
#Reason: Accessing a list by index always takes the same
# amount of time no matter the size of the list.
print(numbers[2])

#2.Big-O: O(n)
#Reason: The loop checks every items exactly once.
for number in numbers:
    pass

#3.Big-O: O(n**2)
#Reason: for every item the inner loop runs again
for i in numbers:
    for j in numbers:
        pass

#4.Big-O: O(1)
#Reason: dictionary lookup is a constant time
student = {"name": "sami", "age": "25", "city": "addis ababa"}
print(student["name"])

#5.Big-O: O(log n)
#Reason: Binary search cuts the search in half 
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left<= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

sorted_numbers = list(range(100))
index = binary_search(sorted_numbers, 73)

print("Binary search founds:", index)


#Exercise 2
print("#" * 40)
print("List Vs Dictionary  Lookup")
print("#" * 40)

SIZE = 100000

print("creating Data.....")

#Fake account numbers
accounts_list = []
accounts_dict = {}

for i in range(SIZE):
    account = f"ACC{i}"

    accounts_list.append(account)
    accounts_dict[accout] = i

target = f"ACC{SIZE-1}"

print("*" * 40)
print("List Lookup")
print("*" * 40)
start = time.perf_counter()
found = target in accounts_list
end = time.perf_counter()
list_time = end - start

print(f"List lookup: {list_time:.8f} seconds")

print("-" * 40)
print("Dictionary Lookup")
print("-" * 40)
start = time.perf_counter()
found = target in accounts_list
end = time.perf_counter()
dict_time = end - start

print(f"Dictionary lookup: {dict_time:.8f} seconds")

print("\nDictionary lookup is much faster because")
print("it uses a hash table (average O(1)).")
print("List lookup has to check one item after another (O(n)).")

#3.Stack
print("-" * 40)
print("Stack")
print("-" * 40)

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):

        if self.is_empty():
            return None
        
        return self.items.pop()

    def peek(self):

        if self.is_empty():
            return None

        return self.items[-1]
    def is_empty(self):
        return len(self.items) == 0

names = ["Nati", "Abel", "Abebe", "Sara"]

stack = Stack()

for name in names:
    stack.push(name)

reversed_names = []

while not stack.is_empty():
    reversed_names.append(stack.pop())

print("Original :", names)
print("Reversed:", reversed_names)

#4.Queue


print("-" * 40)
print("4. Queue")
print("-" * 40)

bank_queue = deque()

bank_queue.append("Customer A")
bank_queue.append("Customer B")
bank_queue.append("Customer C")
bank_queue.append("Customer D")
bank_queue.append("Customer E")

print("Customer entering the bank:")

for customer in bank_queue:
    print(customer)

print("\nServing customers...\n")

while bank_queue:
    served = bank_queue.popleft()
    print(served, "has been served.")

print("\nQueue is empty.")

#5. Singly Linked List
print("-" * 40)
print("5. Singly Linked List")
print("-" * 40)

class LinkedList:

    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head

        while current is not None:
            print(current.data)
            current = current.next



linked = LinkedList()

linked.push_front("Bank")
linked.push_front("Savings")
linked.push_front("Current")
linked.push_front("Checking")

print("Linked List:")

linked.print_all()

print("\nProgram Finished.")



