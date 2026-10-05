import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";

const dishes = {
  "1": {
    id: 1,
    name: "Doro Wot",
    price: 350,
    description: "Spicy Ethiopian chicken stew served with injera.",
  },
  "2": {
    id: 2,
    name: "Shiro Wot",
    price: 220,
    description: "Traditional chickpea stew prepared with Ethiopian spices.",
  },
  "3": {
    id: 3,
    name: "Tibs",
    price: 320,
    description: "Sautéed meat prepared with peppers, onions and spices.",
  },
  "4": {
    id: 4,
    name: "Beyaynetu",
    price: 280,
    description: "A selection of Ethiopian vegetarian dishes.",
  },
  "5": {
    id: 5,
    name: "Kitfo",
    price: 400,
    description: "Seasoned Ethiopian minced beef served traditionally.",
  },
};

export function generateStaticParams() {
  return Object.keys(dishes).map((id) => ({ id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = dishes[id];

  if (!dish) {
    notFound();
  }

  return (
    <article className="container">
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <h3>{dish.price} ETB</h3>

      <div className="actions">
        <AddToCartButton dish={dish} />

        <Link className="button" href="/menu">
          Back to Menu
        </Link>
      </div>
    </article>
  );
}
