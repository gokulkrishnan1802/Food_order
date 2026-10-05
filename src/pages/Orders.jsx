import {
  NavLink,
  Outlet
} from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Orders({
  currentOrder,
  orderHistory
}) {
  return (
    <div className="page">

      <Header />

      <section className="orders-section">

        <div className="orders-container">

          <h1>
            📦 My Orders
          </h1>

          <p>
            Manage your current and previous orders.
          </p>

          {/* Nested Navigation */}

          <nav className="orders-nav">

            <NavLink
              to="/orders/current"
            >
              Current Order
            </NavLink>

            <NavLink
              to="/orders/history"
            >
              Order History
            </NavLink>

          </nav>

          {/* Nested Route */}

          <div className="orders-content">

            <Outlet
              context={{
                currentOrder,
                orderHistory
              }}
            />

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Orders;