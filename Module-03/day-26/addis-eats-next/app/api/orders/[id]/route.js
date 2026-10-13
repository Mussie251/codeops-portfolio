import { NextResponse } from "next/server";
import { getOrder } from "../../../../lib/db";

export async function GET(request, { params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return NextResponse.json(
      { message: "Order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ order });
}
