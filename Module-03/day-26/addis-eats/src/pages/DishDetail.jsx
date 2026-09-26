import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../cart/cartProvider";

function DishDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/src/data/menu.json", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dish");
        }
        return response.json();
      })
      .then((data) => {
        const foundDish = data.find(
          (item) => String(item.id) === String(id)
        );

        if (!foundDish) {
          throw new Error("Dish not found");
        }

        setDish(foundDish);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return (
      <main>
        <h1>Dish unavailable</h1>
        <p>{error.message}</p>
        <Link to="/menu">Back to Menu</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/menu">← Back to Menu</Link>

      <h1>{dish.name}</h1>
      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>

      {dish.spicy && <p>🌶️ Spicy</p>}

      <button
        onClick={() =>
          dispatch({
            type: "add",
            item: dish,
          })
        }
      >
        Add to Cart
      </button>
    </main>
  );
}

export default DishDetail;