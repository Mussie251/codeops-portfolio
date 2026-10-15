import { getSession } from "../../../lib/session";
import { NextResponse } from "next/server";
import { orderSchema } from "../../../lib/schema";
import { createOrder } from "../../../lib/db";

export async function POST(request) {
  const session = await getSession();

if (!session || session.role !== "customer") {
  return NextResponse.json(
    { message: "You must sign in with a customer account." },
    { status: 401 }
  );
}
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const order = await createOrder(result.data, session.id);

  return NextResponse.json(
    { message: "Order created", order },
    { status: 201 }
  );
}