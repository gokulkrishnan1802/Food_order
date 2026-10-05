import { Link, useLocation } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function OrderConfirmation() {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="page">
        <Header />

        <section className="confirmation-page">
          <div className="empty-cart">
            <h1>
              No Order Found
            </h1>

            <p>
              Your order information is
              not available.
            </p>

            <Link
              to="/menu"
              className="order-btn"
            >
              Back to Menu
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <section className="confirmation-page">

        <div className="confirmation-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Placed Successfully! 🎉
          </h1>

          <p>
            Thank you for ordering
            with us.
          </p>

          <div className="order-info">

            <h2>
              Order Details
            </h2>

            <p>
              <strong>
                Order ID:
              </strong>{" "}
              #{order.id}
            </p>

            <p>
              <strong>
                Customer:
              </strong>{" "}
              {order.customer.name}
            </p>

            <p>
              <strong>
                Phone:
              </strong>{" "}
              {order.customer.phone}
            </p>

            <p>
              <strong>
                Address:
              </strong>{" "}
              {order.customer.address}
            </p>

            <p>
              <strong>
                Payment:
              </strong>{" "}
              {
                order.customer
                  .paymentMethod
              }
            </p>

            <h3>
              Ordered Items
            </h3>

            {order.items.map(
              (item) => (
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
              )
            )}

            <hr />

            <div className="summary-total">
              <span>
                Total
              </span>

              <strong>
                ₹
                {order.total.toFixed(2)}
              </strong>
            </div>

          </div>

          <div className="confirmation-actions">

            <Link
              to="/orders/current"
              className="order-btn"
            >
              View Current Order
            </Link>

            <Link
              to="/menu"
              className="back-category-btn"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}

export default OrderConfirmation;