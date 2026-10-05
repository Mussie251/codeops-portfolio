import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="sidebar">
        <h3>Categories</h3>
        <ul>
          <li><Link href="/menu">All Dishes</Link></li>
          <li><Link href="/menu/1">Main Dishes</Link></li>
          <li><Link href="/menu/2">Vegetarian</Link></li>
          <li><Link href="/menu/3">Traditional</Link></li>
        </ul>
      </aside>

      <section className="menu-content">
        {children}
      </section>
    </div>
  );
}
