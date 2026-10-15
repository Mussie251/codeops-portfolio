import { notFound, redirect } from "next/navigation";
import { getOrder } from "../../../lib/db";
import { getSession } from "../../../lib/session";
import OrderStatus from "./OrderStatus";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(`/orders/${id}`)}`);
  }

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  if (session.role !== "staff" && order.userId !== session.id) {
    notFound();
  }

  return (
    <main>
      <h1>Order Status</h1>
      <p>Order ID: {order.id}</p>
      <OrderStatus initialOrder={order} />
    </main>
  );
}
