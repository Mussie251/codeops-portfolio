"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartPage() {
  const { cart, dispatch } = useCart();

  if (cart.length === 0) {
    return (
      <section className="container">
        <h2>Your Cart</h2>
        <p>Your cart is currently empty.</p>

        <Link className="button" href="/menu">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="container">
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <article className="dish-card" key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price} ETB</p>

          <button
            onClick={() =>
              dispatch({
                type: "REMOVE",
                id: item.id,
              })
            }
          >
            Remove
          </button>
        </article>
      ))}

      <div className="actions">
        <button onClick={() => dispatch({ type: "CLEAR" })}>
          Clear Cart
        </button>

        <Link className="button" href="/checkout">
          Checkout
        </Link>
      </div>
    </section>
  );
}
