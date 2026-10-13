import { notFound } from "next/navigation";
import { getOrder } from "../../../lib/db";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
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
