
"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "../../lib/schema";
import { createOrder } from "../../lib/db";
import { getSession } from "../../lib/session";

export async function submitOrder(previousState, formData) {

  const session = await getSession();

if (!session || session.role !== "customer") {
  return {
    success: false,
    message: "Please sign in with a customer account to place an order.",
    errors: {},
  };
}

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


const order = await createOrder(result.data, session.id);

revalidatePath("/checkout");

return {
  success: true,
  message: "Order placed successfully!",
  orderId: order.id,
  errors: {},
};

}
