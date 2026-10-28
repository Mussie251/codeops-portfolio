
import { getOrder } from "../../../../../lib/db";
import { getSession } from "../../../../../lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const session = await getSession();

  if (!session) {
    return Response.json(
      { message: "You must sign in first." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return Response.json(
      { message: "Order not found." },
      { status: 404 }
    );
  }

  if (session.role !== "staff" && order.userId !== session.id) {
    return Response.json(
      { message: "You are not authorized to view this order." },
      { status: 403 }
    );
  }

  const encoder = new TextEncoder();
  let interval;
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      const sendOrder = async () => {
        if (closed) return;

        try {
          const currentOrder = await getOrder(id);

          if (!currentOrder) {
            controller.enqueue(
              encoder.encode(
                `event: error\ndata: ${JSON.stringify({
                  message: "Order no longer exists.",
                })}\n\n`
              )
            );
            clearInterval(interval);
            controller.close();
            return;
          }

          controller.enqueue(
            encoder.encode(
              `event: order\ndata: ${JSON.stringify({
                order: currentOrder,
              })}\n\n`
            )
          );
        } catch {
          clearInterval(interval);
          if (!closed) controller.close();
        }
      };

      // Tell the browser it may retry after a connection failure.
      controller.enqueue(encoder.encode("retry: 3000\n\n"));

      sendOrder();
      interval = setInterval(sendOrder, 3000);
    },

    cancel() {
      closed = true;
      clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
