import { Link } from "react-router-dom";
import { useCart } from "../cart/cartProvider";

function Cart() {
  const { items, dispatch, total } = useCart();

  if (items.length === 0) {
    return (
      <main>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/menu">Browse Menu</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Your Cart</h1>

      {items.map((item, index) => (
        <article key={`${item.id}-${index}`}>
          <h2>{item.name}</h2>
          <p>{item.price} ETB</p>

          <button
            onClick={() =>
              dispatch({
                type: "remove",
                id: item.id,
              })
            }
          >
            Remove
          </button>
        </article>
      ))}

      <h2>Total: {total} ETB</h2>

      <button onClick={() => dispatch({ type: "clear" })}>
        Clear Cart
      </button>

      <div>
        <Link to="/menu">Continue Shopping</Link>
        {" | "}
        <Link to="/checkout">Checkout</Link>
      </div>
    </main>
  );
}

export default Cart;