"use client";
import { useState } from "react";

function Dish({ name, price, spicy, onAdd }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount((prevCount) => prevCount + 1);
    onAdd(price);
  }

  return (
    <article>
      <h3>{name}</h3>

      <p>
        {price} ETB {spicy && "🌶️"}
      </p>

      <button onClick={handleAdd}>Add</button>

      {count > 0 && <p>Added: {count}</p>}
    </article>
  );
}

export default Dish;