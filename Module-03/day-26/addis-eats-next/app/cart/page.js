import Link from "next/link";

export default function CartPage() {
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
