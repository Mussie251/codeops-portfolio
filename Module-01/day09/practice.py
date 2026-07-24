
# DAY 09 PRACTICE
# Binary Search Trees, Graphs and Heap Queue


import heapq


# EXERCISE 1
# BUILD A BINARY SEARCH TREE (BST)


class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root


def inorder(root):
    if root is None:
        return

    inorder(root.left)
    print(root.value, end=" ")
    inorder(root.right)


print("===== Exercise 1 =====")

balances = [500, 200, 800, 100, 300, 700, 900]

root = None

for balance in balances:
    root = insert(root, balance)

print("Balances in sorted order:")
inorder(root)

print("\n")



# EXERCISE 2
# TREE HEIGHT


def height(node):
    if node is None:
        return 0

    left_height = height(node.left)
    right_height = height(node.right)

    return max(left_height, right_height) + 1


print("===== Exercise 2 =====")
print("Tree Height:", height(root))
print()



# EXERCISE 3
# BREADTH FIRST SEARCH (BFS)


graph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["F"],
    "D": [],
    "E": ["F"],
    "F": []
}


def bfs(graph, start):
    visited = set()

    queue = [start]

    while queue:

        vertex = queue.pop(0)

        if vertex not in visited:

            visited.add(vertex)

            for neighbour in graph[vertex]:
                queue.append(neighbour)

    return visited


print("===== Exercise 3 =====")
print("Reachable Nodes:", bfs(graph, "A"))
print()



# EXERCISE 4
# DEPTH FIRST SEARCH (DFS)


def dfs(graph, start, visited=None):

    if visited is None:
        visited = []

    visited.append(start)

    for neighbour in graph[start]:

        if neighbour not in visited:
            dfs(graph, neighbour, visited)

    return visited


print("===== Exercise 4 =====")
print("DFS Visit Order:", dfs(graph, "A"))
print("BFS Reachable Nodes:", bfs(graph, "A"))
print()


# EXERCISE 5
# PRIORITY QUEUE


tasks = []

heapq.heappush(tasks, (3, "Reply Emails"))
heapq.heappush(tasks, (1, "Fix Server"))
heapq.heappush(tasks, (5, "Watch Movie"))
heapq.heappush(tasks, (2, "Attend Meeting"))
heapq.heappush(tasks, (4, "Go Shopping"))

print("===== Exercise 5 =====")

while tasks:
    priority, task = heapq.heappop(tasks)
    print(priority, "-", task)