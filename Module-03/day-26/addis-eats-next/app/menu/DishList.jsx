import Dish from "./Dish/Dish";

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <section>
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={Number(dish.price)}
          spicy={dish.spicy}
          onAdd={onAdd}
        />
      ))}
    </section>
  );
}

export default DishList;