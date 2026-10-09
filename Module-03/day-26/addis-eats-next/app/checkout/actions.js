
"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "../../lib/schema";
import { createOrder } from "../../lib/db";

export async function submitOrder(previousState, formData) {
  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    dishId: formData.get("dishId") || undefined,
    quantity: Number(formData.get("quantity") || 1),
    notes: formData.get("notes") || undefined,
  };

  const result = orderSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the form errors.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  await createOrder(result.data);
  revalidatePath("/checkout");

  return {
    success: true,
    message: "Order placed successfully!",
    errors: {},
  };
}