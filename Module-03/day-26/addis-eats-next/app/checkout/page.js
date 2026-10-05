export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <section className="container">
      <h2>Checkout</h2>
      <p>Checkout is dynamic because order information is expected to be request-specific.</p>

      <form>
        <label>
          Name
          <input type="text" placeholder="Your name" />
        </label>

        <label>
          Address
          <input type="text" placeholder="Delivery address" />
        </label>

        <button type="submit">Place Order</button>
      </form>
    </section>
  );
}
