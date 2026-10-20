
import { redirect } from "next/navigation";
import { db } from "../../lib/db";
import { getSession } from "../../lib/session";
import RevenueChart from "./RevenueChart";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) redirect("/signin");
  if (session.role !== "staff") redirect("/");

  const orders = await db.order.findMany();

  const revenueByNeighbourhood = {};
  const ordersByDate = {};

  for (const order of orders) {
    const area = order.neighbourhood || "Unspecified";
    revenueByNeighbourhood[area] =
      (revenueByNeighbourhood[area] || 0) + (order.total || 0);

    const date = order.createdAt
      ? order.createdAt.slice(0, 10)
      : "Unknown";
    ordersByDate[date] = (ordersByDate[date] || 0) + 1;
  }

  const revenueData = Object.entries(revenueByNeighbourhood).map(
    ([neighbourhood, revenue]) => ({ neighbourhood, revenue })
  );

  const orderData = Object.entries(ordersByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, orders]) => ({ date, orders }));

  return (
    <main className="container">
      <h1>Analytics Dashboard</h1>
      <p>Total orders: {orders.length}</p>
      {orders.length === 0 ? (
        <p>No orders yet. Charts will appear after orders are placed.</p>
      ) : (
        <RevenueChart revenueData={revenueData} orderData={orderData} />
      )}
    </main>
  );
}
