"use client";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

export default function OrderStatus({ initialOrder }) {
  const { data, error, isLoading } = useSWR(
    `/api/orders/${initialOrder.id}`,
    fetcher,
    {
      fallbackData: { order: initialOrder },
      refreshInterval: 5000,
    }
  );

  const order = data?.order ?? initialOrder;

  return (
    <section>
      <h2>Current Status: {order.status}</h2>

      {isLoading && <p>Loading order status...</p>}

      {error && (
        <p role="alert">
          Could not refresh the order status. Showing the last available data.
        </p>
      )}

      <p>Customer: {order.name}</p>
      <p>Phone: {order.phone}</p>
      <p>Last checked automatically every 5 seconds.</p>
    </section>
  );
}
