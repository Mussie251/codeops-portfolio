import { redirect } from "next/navigation";
import { db } from "../../lib/db";
import { getSession } from "../../lib/session";

export const dynamic = "force-dynamic";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Fkitchen");
  }

  if (session.role !== "staff") {
    redirect("/");
  }

  const orders = await db.order.findMany();

  return (
    <section className="container">
      <h2>Kitchen Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Order {order.id}</strong>
              {" — "}
              {order.status}
              {" — "}
              {order.quantity} × {order.dishId}
              <p>Customer ID: {order.userId}</p>
              {order.notes && <p>Notes: {order.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
