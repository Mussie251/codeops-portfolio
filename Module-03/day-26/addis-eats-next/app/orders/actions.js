"use server";

import { revalidatePath } from "next/cache";
import { getOrder, markCancelled } from "../../lib/db";
import { getSession } from "../../lib/session";

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session || session.role !== "customer") {
    return {
      success: false,
      message: "Please sign in with a customer account.",
    };
  }

  if (typeof orderId !== "string" || !orderId.trim()) {
    return {
      success: false,
      message: "Invalid order ID.",
    };
  }

  const order = await getOrder(orderId);

  if (!order) {
    return {
      success: false,
      message: "Order not found.",
    };
  }

  if (order.userId !== session.id) {
    return {
      success: false,
      message: "You are not authorized to cancel this order.",
    };
  }

  if (order.status !== "PENDING") {
    return {
      success: false,
      message: "Only pending orders can be cancelled.",
    };
  }

  await markCancelled(orderId);
  revalidatePath("/orders");
  revalidatePath(`/orders/${orderId}`);

  return {
    success: true,
    message: "Order cancelled successfully.",
  };
}
