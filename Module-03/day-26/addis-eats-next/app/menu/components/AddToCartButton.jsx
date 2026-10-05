"use client";

import { useCart } from "../../cart/CartProvider";

export default function AddToCartButton({ dish }) {
  const { dispatch } = useCart();

  function handleAdd() {
    dispatch({
      type: "ADD",
      item: dish,
    });
  }

  return (
    <button onClick={handleAdd}>
      Add to Cart
    </button>
  );
}
