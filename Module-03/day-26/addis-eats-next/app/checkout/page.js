
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <section className="container">
      <h2>Checkout</h2>
      <p>Place your order below.</p>
      <CheckoutForm />
    </section>
  );
}