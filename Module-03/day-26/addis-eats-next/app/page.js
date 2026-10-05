import Link from "next/link";

export default function HomePage() {
  return (
    <section className="container">
      <h2>Welcome to Addis Eats</h2>
      <p>Discover Ethiopian dishes and place your order.</p>

      <div className="actions">
        <Link className="button" href="/menu">
          View Menu
        </Link>
        <Link className="button" href="/cart">
          View Cart
        </Link>
      </div>
    </section>
  );
}
