import "./globals.css";
import Link from "next/link";
import { CartProvider } from "./cart/CartProvider";
import { getSession } from "../lib/session";
import SignOutButton from "./SignOutButton";

export const metadata = {
  title: "Addis Eats",
  description: "Ethiopian food ordering application built with Next.js",
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="site-header">
            <h1>Addis Eats</h1>

            <nav>
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/checkout">Checkout</Link>

              {session?.role === "staff" && (
                <Link href="/kitchen">Kitchen</Link>
              )}

              {session ? (
                <>
                  <span>Hi, {session.name}</span>
                  <SignOutButton />
                </>
              ) : (
                <Link href="/signin">Sign in</Link>
              )}
            </nav>
          </header>

          <main>{children}</main>

          <footer>
            <p>© 2026 Addis Eats</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
