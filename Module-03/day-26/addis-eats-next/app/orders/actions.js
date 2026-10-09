
"use server";

import { revalidatePath } from "next/cache";
import { getSession, getOrder, markCancelled } from "../../lib/db";

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "Please sign in first." };
  }

  const order = await getOrder(orderId);

  if (!order) {
    return { success: false, message: "Order not found." };
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

  return { success: true, message: "Order cancelled successfully." };
}