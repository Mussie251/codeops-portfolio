import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useCart } from "../cart/cartProvider";

function Checkout() {
  const { items, total, dispatch } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  const phoneValid = /^(09\d{8}|\+2519\d{8})$/.test(
    formData.phone
  );

  const formValid =
    formData.name.trim().length >= 2 &&
    phoneValid &&
    formData.area.trim().length > 0;

  function handleSubmit(event) {
    event.preventDefault();

    if (!formValid) {
      return;
    }

    console.log("Order submitted:", {
      customer: formData,
      items,
      total,
    });

    setSubmitted(true);
    dispatch({ type: "clear" });
  }

  if (submitted) {
    return (
      <main>
        <h1>Order Confirmed!</h1>
        <p>Thank you for ordering from Addis Eats.</p>
        <Link to="/menu">Back to Menu</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Checkout</h1>

      <p>Total: {total} ETB</p>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            placeholder="0912345678"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Area
          <input
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </label>

        {!phoneValid && formData.phone && (
          <p>Enter a valid Ethiopian phone number.</p>
        )}

        <button type="submit" disabled={!formValid}>
          Place Order
        </button>
      </form>
    </main>
  );
}

export default Checkout;