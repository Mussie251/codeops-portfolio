import menu from "../../menu/menu.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") || "").trim().toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 5;

  const filteredDishes = menu.filter((dish) =>
    dish.name.toLowerCase().includes(search)
  );

  const total = filteredDishes.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;

  return Response.json({
    dishes: filteredDishes.slice(start, start + pageSize),
    page,
    pageSize,
    total,
    totalPages,
  });
}
