
import { NextResponse } from "next/server";
import { getOrder } from "../../../../lib/db";
import { getSession } from "../../../../lib/session";

export async function GET(request, { params }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "You must sign in first." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return NextResponse.json(
      { message: "Order not found." },
      { status: 404 }
    );
  }

  if (session.role !== "staff" && order.userId !== session.id) {
    return NextResponse.json(
      { message: "You are not authorized to view this order." },
      { status: 403 }
    );
  }

  return NextResponse.json({ order });
}
