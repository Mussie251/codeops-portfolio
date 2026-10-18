
import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import { CartProvider } from "./cart/CartProvider";
import { getSession } from "../lib/session";
import SignOutButton from "./SignOutButton";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});


export const metadata = {
  metadataBase: new URL(
    process.env.SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "Addis Eats — Ethiopian Food Delivery",
    template: "%s | Addis Eats",
  },

  description:
    "Order Ethiopian favourites including Doro Wot, Shiro Wot, Tibs, Beyaynetu and Kitfo for delivery in Addis Ababa.",

  openGraph: {
    type: "website",
    locale: "en_ET",
    siteName: "Addis Eats",
    title: "Addis Eats — Ethiopian Food Delivery",
    description:
      "Discover Ethiopian dishes and order your favourites for delivery in Addis Ababa.",
  },
};


export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
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
