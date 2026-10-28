"use client";

import { useEffect, useState } from "react";
import { when } from "../../../lib/format";

export default function TrackingClient({ initialOrder }) {
  const [order, setOrder] = useState(initialOrder);
  const [connection, setConnection] = useState("connecting");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const source = new EventSource(
      `/api/orders/${encodeURIComponent(initialOrder.id)}/stream`
    );

    source.addEventListener("open", () => {
      setConnection("connected");
    });

    source.addEventListener("order", (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.order) {
          setOrder(payload.order);
          setLastUpdated(new Date());
          setConnection("connected");
        }
      } catch {
        setConnection("error");
      }
    });

    source.addEventListener("error", () => {
      setConnection(
        source.readyState === EventSource.CLOSED
          ? "disconnected"
          : "reconnecting"
      );
    });

    return () => source.close();
  }, [initialOrder.id]);

  return (
    <section>
      <h2>Order #{order.id}</h2>
      <p>Status: <strong>{order.status}</strong></p>
      <p>Delivery neighbourhood: {order.neighbourhood || "Unspecified"}</p>
      <p>
        Live connection: <strong>{connection}</strong>
      </p>
      <p>
        Last update:{" "}
        {lastUpdated ? when.format(lastUpdated) : "Waiting for first update..."}
      </p>
    </section>
  );
}
