import { notFound, redirect } from "next/navigation";
import { getOrder } from "../../../lib/db";
import { getSession } from "../../../lib/session";
import TrackingClient from "./TrackingClient";

export const dynamic = "force-dynamic";

export default async function TrackOrderPage({ params }) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(`/track/${id}`)}`);
  }

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  if (session.role !== "staff" && order.userId !== session.id) {
    notFound();
  }

  return (
    <main className="container">
      <h1>Live Order Tracking</h1>
      <p>Track your order status and delivery destination.</p>
      <TrackingClient initialOrder={order} />
    </main>
  );
}
