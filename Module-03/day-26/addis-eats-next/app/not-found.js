import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <h2>Dish Not Found</h2>
      <p>The requested dish does not exist.</p>
      <Link className="button" href="/menu">
        Return to Menu
      </Link>
    </div>
  );
}
