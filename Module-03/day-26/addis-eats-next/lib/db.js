/**
 * In-memory mock database and helper utilities for Addis Eats.
 * Provides data access functions for dishes, orders, and session management.
 */

// Mock dish records
const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description: "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
];

// Shared in-memory order store for this Node.js process
const globalForAddisEats = globalThis;

if (!globalForAddisEats.__addisEatsMockOrders) {
  globalForAddisEats.__addisEatsMockOrders = [];
}

const mockOrders = globalForAddisEats.__addisEatsMockOrders;

// Mock authenticated user session

const mockUsers = [
  {
    id: "user_addis_101",
    name: "Abebe Bikila",
    email: "abebe@example.com",
    role: "customer",
  },
  {
    id: "staff_addis_101",
    name: "Addis Eats Staff",
    email: "staff@example.com",
    role: "staff",
  },
];


/**
 * ORM-style database query interface
 */
export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((d) => d.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

/**
 * Fetch a single dish by ID
 */
export async function getDish(id) {
  const dish = mockDishes.find((d) => d.id === id);
  return dish || null;
}

/**

/**
 * Create an order for the authenticated user
 */
export async function createOrder(data, userId) {
  if (!userId) {
    throw new Error("An authenticated user ID is required.");
  }

  const newOrder = {
    id: `ord_${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: "PENDING",
    userId,
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(newOrder);
  return newOrder;
}


/**
 * Retrieve a specific order by ID
 */
export async function getOrder(id) {
  console.log("[getOrder] Requested ID:", id);
  console.log(
    "[getOrder] Available IDs:",
    mockOrders.map((order) => order.id)
  );

  const order = mockOrders.find((o) => o.id === id);
  return order || null;
}

/**
 * Mark an order as cancelled
 */
export async function markCancelled(id) {
  const order = mockOrders.find((o) => o.id === id);
  if (!order) {
    throw new Error("Order not found");
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();
  return order;
}




export async function getUserByEmail(email) {
  return mockUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  ) || null;
}

export async function getOrdersByUserId(userId) {
  return mockOrders.filter((order) => order.userId === userId);
}
