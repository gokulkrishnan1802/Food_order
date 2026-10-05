import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Checkout({ placeOrder }) {
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery"
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required.";
    } else if (
      !/\S+@\S+\.\S+/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    } else if (
      !/^\d{10}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number.";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      navigate("/menu");
      return;
    }

    const order = placeOrder(formData);

    navigate(
      "/order-confirmation",
      {
        state: {
          order
        }
      }
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <Header />

        <section className="checkout-page">
          <div className="empty-cart">
            <h1>
              Your Cart is Empty 🛒
            </h1>

            <p>
              Add food before checkout.
            </p>

            <button
              className="order-btn"
              onClick={() =>
                navigate("/menu")
              }
            >
              Go to Menu
            </button>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <section className="checkout-page">

        <div className="checkout-header">
          <h1>
            Checkout 💳
          </h1>

          <p>
            Enter your delivery details.
          </p>
        </div>

        <div className="checkout-container">

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <h2>
              Delivery Details
            </h2>

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            {errors.name && (
              <p className="error-text">
                {errors.name}
              </p>
            )}

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            {errors.email && (
              <p className="error-text">
                {errors.email}
              </p>
            )}

            <label>
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
            />

            {errors.phone && (
              <p className="error-text">
                {errors.phone}
              </p>
            )}

            <label>
              Delivery Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter delivery address"
              rows="4"
            />

            {errors.address && (
              <p className="error-text">
                {errors.address}
              </p>
            )}

            <label>
              Payment Method
            </label>

            <select
              name="paymentMethod"
              value={
                formData.paymentMethod
              }
              onChange={handleChange}
            >
              <option>
                Cash on Delivery
              </option>

              <option>
                UPI
              </option>

              <option>
                Credit / Debit Card
              </option>
            </select>

            <button
              type="submit"
              className="order-btn"
            >
              Place Order →
            </button>

          </form>

          <div className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div
                className="summary-row"
                key={item.id}
              >
                <span>
                  {item.name} ×{" "}
                  {item.quantity}
                </span>

                <span>
                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </span>
              </div>
            ))}

            <hr />

            <div className="summary-row">
              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Tax (5%)
              </span>

              <span>
                ₹{tax.toFixed(2)}
              </span>
            </div>

            <div className="summary-total">
              <span>
                Total
              </span>

              <strong>
                ₹{total.toFixed(2)}
              </strong>
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}

export default Checkout;