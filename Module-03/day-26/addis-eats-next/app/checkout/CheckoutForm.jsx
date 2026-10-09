
"use client";

import { useActionState } from "react";
import { submitOrder } from "./actions";

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(
    submitOrder,
    initialState
  );

  return (
    <form action={formAction}>
      <label>
        Name
        <input name="name" required minLength={2} />
      </label>
      {state.errors?.name?.map((error) => (
        <p key={error}>{error}</p>
      ))}

      <label>
        Phone
        <input name="phone" required placeholder="0912345678" />
      </label>
      {state.errors?.phone?.map((error) => (
        <p key={error}>{error}</p>
      ))}

      <label>
        Dish ID (optional)
        <input name="dishId" placeholder="dish_1" />
      </label>

      <label>
        Quantity
        <input name="quantity" type="number" min="1" defaultValue="1" />
      </label>
      {state.errors?.quantity?.map((error) => (
        <p key={error}>{error}</p>
      ))}

      <label>
        Notes (optional)
        <input name="notes" maxLength={200} />
      </label>

      <button type="submit" disabled={pending}>
        {pending ? "Placing order..." : "Place Order"}
      </button>

      {state.message && <p>{state.message}</p>}
    </form>
  );
}