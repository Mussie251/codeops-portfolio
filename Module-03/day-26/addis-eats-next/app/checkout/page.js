import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import { getSession } from "../../lib/session";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=%2Fcheckout");
  }

  if (session.role !== "customer") {
    redirect("/");
  }

  return (
    <section className="container">
      <h2>Checkout</h2>
      <p>Place your order below.</p>
      <CheckoutForm />
    </section>
  );
}
