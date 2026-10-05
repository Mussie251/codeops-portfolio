import { Suspense } from "react";
import Link from "next/link";

export const revalidate = 60;

async function DishList() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const dishes = [
    { id: 1, name: "Doro Wot", price: 350, description: "Spicy Ethiopian chicken stew." },
    { id: 2, name: "Shiro Wot", price: 220, description: "Traditional chickpea stew." },
    { id: 3, name: "Tibs", price: 320, description: "Sautéed meat with peppers and onions." },
    { id: 4, name: "Beyaynetu", price: 280, description: "Assorted vegetarian Ethiopian dishes." },
    { id: 5, name: "Kitfo", price: 400, description: "Seasoned Ethiopian minced beef." },
  ];

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <article className="dish-card" key={dish.id}>
          <h3>{dish.name}</h3>
          <p>{dish.description}</p>
          <strong>{dish.price} ETB</strong>
          <br />
          <Link href={`/menu/${dish.id}`}>View Dish</Link>
        </article>
      ))}
    </div>
  );
}

export default function MenuPage() {
  return (
    <section>
      <h2>Our Menu</h2>
      <p>Browse our Ethiopian dishes.</p>

      <Suspense fallback={<p>Loading dishes...</p>}>
        <DishList />
      </Suspense>
    </section>
  );
}
