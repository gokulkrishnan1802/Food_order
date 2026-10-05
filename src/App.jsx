import {
  lazy,
  Suspense,
  useState
} from "react";

import {
  Routes,
  Route
} from "react-router-dom";

import {
  useSelector,
  useDispatch
} from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/Login";
import FoodMenu from "./pages/FoodMenu";

import FoodCrud from "./pages/FoodCrud";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";

import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

import {
  addToCart,
  clearCart
} from "./redux/cartSlice";

/* =========================================
   LAZY LOADED COMPONENTS
========================================= */

const FoodDetails = lazy(
  () => import("./pages/FoodDetails")
);

const Checkout = lazy(
  () => import("./pages/Checkout")
);

function App() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [currentOrder, setCurrentOrder] =
    useState(null);

  const [orderHistory, setOrderHistory] =
    useState([]);

  const handleAddToCart = (food) => {
    dispatch(
      addToCart(food)
    );
  };

  const placeOrder = (customer) => {
    const subtotal = cartItems.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

    const tax = subtotal * 0.05;

    const total =
      subtotal + tax;

    const newOrder = {
      id: Date.now(),
      customer,
      items: [...cartItems],
      subtotal,
      tax,
      total,
      status: "Current"
    };

    if (currentOrder) {
      setOrderHistory(
        (history) => [
          ...history,
          {
            ...currentOrder,
            status: "Completed"
          }
        ]
      );
    }

    setCurrentOrder(
      newOrder
    );

    dispatch(
      clearCart()
    );

    return newOrder;
  };

  return (
    <ErrorBoundary>

      <Suspense
        fallback={
          <Loading
            message="Loading page..."
          />
        }
      >

        <Routes>

          {/* =========================
              LOGIN
          ========================= */}

          <Route
            path="/login"
            element={
              <Login />
            }
          />

          {/* =========================
              HOME
          ========================= */}

          <Route
            path="/"
            element={
              <Home />
            }
          />

          {/* =========================
              FOOD MENU
          ========================= */}

          <Route
            path="/menu"
            element={
              <FoodMenu
                addToCart={
                  handleAddToCart
                }
              />
            }
          />

          {/* =========================
              LAZY LOADED FOOD DETAILS
          ========================= */}

          <Route
            path="/food/:id"
            element={
              <FoodDetails
                addToCart={
                  handleAddToCart
                }
              />
            }
          />

          {/* =========================
              EXPERIMENT 3 CRUD
          ========================= */}

          <Route
            path="/food-crud"
            element={
              <ProtectedRoute>
                <FoodCrud />
              </ProtectedRoute>
            }
          />

          {/* =========================
              CART
          ========================= */}

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* =========================
              LAZY LOADED CHECKOUT
          ========================= */}

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout
                  placeOrder={
                    placeOrder
                  }
                />
              </ProtectedRoute>
            }
          />

          {/* =========================
              ORDER CONFIRMATION
          ========================= */}

          <Route
            path="/order-confirmation"
            element={
              <OrderConfirmation />
            }
          />

          {/* =========================
              ORDERS
          ========================= */}

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders
                  currentOrder={
                    currentOrder
                  }
                  orderHistory={
                    orderHistory
                  }
                />
              </ProtectedRoute>
            }
          >

            {/* =========================
                CURRENT ORDER
            ========================= */}

            <Route
              path="current"
              element={
                <div>

                  <h2>
                    Current Order
                  </h2>

                  {currentOrder ? (
                    <>

                      <p>
                        Order ID: #
                        {
                          currentOrder.id
                        }
                      </p>

                      <p>
                        Status:{" "}
                        {
                          currentOrder.status
                        }
                      </p>

                      <p>
                        Subtotal: ₹
                        {currentOrder.subtotal.toFixed(
                          2
                        )}
                      </p>

                      <p>
                        Tax: ₹
                        {currentOrder.tax.toFixed(
                          2
                        )}
                      </p>

                      <p>
                        Total: ₹
                        {currentOrder.total.toFixed(
                          2
                        )}
                      </p>

                      <h3>
                        Items
                      </h3>

                      {currentOrder.items.map(
                        (item) => (
                          <p
                            key={
                              item.id
                            }
                          >
                            {item.name} ×{" "}
                            {
                              item.quantity
                            }
                          </p>
                        )
                      )}

                      <h3>
                        Delivery Details
                      </h3>

                      <p>
                        Name:{" "}
                        {
                          currentOrder
                            .customer
                            .name
                        }
                      </p>

                      <p>
                        Phone:{" "}
                        {
                          currentOrder
                            .customer
                            .phone
                        }
                      </p>

                      <p>
                        Address:{" "}
                        {
                          currentOrder
                            .customer
                            .address
                        }
                      </p>

                      <p>
                        Payment:{" "}
                        {
                          currentOrder
                            .customer
                            .paymentMethod
                        }
                      </p>

                    </>
                  ) : (
                    <p>
                      No current order.
                    </p>
                  )}

                </div>
              }
            />

            {/* =========================
                ORDER HISTORY
            ========================= */}

            <Route
              path="history"
              element={
                <div>

                  <h2>
                    Order History
                  </h2>

                  {orderHistory.length ===
                  0 ? (
                    <p>
                      No previous
                      orders.
                    </p>
                  ) : (
                    orderHistory.map(
                      (order) => (
                        <div
                          key={
                            order.id
                          }
                          className="history-order"
                        >

                          <h3>
                            Order #
                            {
                              order.id
                            }
                          </h3>

                          <p>
                            Status:{" "}
                            {
                              order.status
                            }
                          </p>

                          <p>
                            Customer:{" "}
                            {
                              order.customer
                                .name
                            }
                          </p>

                          <p>
                            Subtotal: ₹
                            {order.subtotal.toFixed(
                              2
                            )}
                          </p>

                          <p>
                            Tax: ₹
                            {order.tax.toFixed(
                              2
                            )}
                          </p>

                          <p>
                            Total: ₹
                            {order.total.toFixed(
                              2
                            )}
                          </p>

                          <h4>
                            Items
                          </h4>

                          {order.items.map(
                            (item) => (
                              <p
                                key={
                                  item.id
                                }
                              >
                                {item.name} ×{" "}
                                {
                                  item.quantity
                                }
                              </p>
                            )
                          )}

                        </div>
                      )
                    )
                  )}

                </div>
              }
            />

          </Route>

        </Routes>

      </Suspense>

    </ErrorBoundary>
  );
}

export default App;