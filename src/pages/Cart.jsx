import {
  useMemo
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  useNavigate
} from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  removeFromCart,
  updateQuantity,
  clearCart
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const {
    subtotal,
    tax,
    total
  } = useMemo(() => {
    const subtotal =
      cartItems.reduce(
        (sum, item) =>
          sum +
          item.price *
            item.quantity,
        0
      );

    const tax =
      subtotal * 0.05;

    const total =
      subtotal + tax;

    return {
      subtotal,
      tax,
      total
    };
  }, [cartItems]);

  const increaseQuantity = (
    item
  ) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity:
          item.quantity + 1
      })
    );
  };

  const decreaseQuantity = (
    item
  ) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity:
          item.quantity - 1
      })
    );
  };

  const handleRemove = (
    id
  ) => {
    dispatch(
      removeFromCart(id)
    );
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (
    cartItems.length === 0
  ) {
    return (
      <div className="page">
        <Header />

        <main
          className="cart-page"
          aria-labelledby="empty-cart-title"
        >
          <div className="empty-cart">
            <h1 id="empty-cart-title">
              Your Cart is Empty 🛒
            </h1>

            <p>
              Add some delicious
              food to continue.
            </p>

            <button
              type="button"
              className="order-btn"
              onClick={() =>
                navigate("/menu")
              }
            >
              Browse Food Menu
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <main
        className="cart-page"
        aria-labelledby="cart-title"
      >
        <div className="cart-header">
          <h1 id="cart-title">
            Your Food Cart 🛒
          </h1>

          <button
            type="button"
            className="remove-btn"
            onClick={
              handleClearCart
            }
            aria-label="Clear all items from cart"
          >
            Clear Cart
          </button>
        </div>

        <div className="cart-container">
          <section
            className="cart-items"
            aria-label="Cart items"
          >
            {cartItems.map(
              (item) => (
                <article
                  className="cart-item"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="cart-item-info">
                    <h2>
                      {item.name}
                    </h2>

                    <p>
                      ₹{item.price}
                    </p>

                    <div
                      className="quantity-controls"
                      aria-label={`Quantity controls for ${item.name}`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(
                            item
                          )
                        }
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>

                      <span
                        aria-label={`Quantity ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(
                            item
                          )
                        }
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() =>
                        handleRemove(
                          item.id
                        )
                      }
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>

                  <div
                    className="cart-item-total"
                    aria-label={`Total for ${item.name}`}
                  >
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </div>
                </article>
              )
            )}
          </section>

          <aside
            className="cart-summary"
            aria-label="Order summary"
          >
            <h2>
              Order Summary
            </h2>

            <div className="summary-row">
              <span>
                Subtotal
              </span>

              <span>
                ₹
                {subtotal.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Tax (5%)
              </span>

              <span>
                ₹
                {tax.toFixed(2)}
              </span>
            </div>

            <hr />

            <div className="summary-total">
              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toFixed(2)}
              </strong>
            </div>

            <button
              type="button"
              className="order-btn"
              onClick={() =>
                navigate(
                  "/checkout"
                )
              }
              aria-label="Proceed to checkout"
            >
              Proceed to Checkout →
            </button>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;