import Link from "next/link";


export const metadata = {
  title: "Ethiopian Food Delivery in Addis Ababa",

  description:
    "Discover Ethiopian favourites and order Doro Wot, Shiro Wot, Tibs, Beyaynetu and Kitfo for delivery across Addis Ababa.",

  alternates: {
    canonical: "/",
  },
};


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
