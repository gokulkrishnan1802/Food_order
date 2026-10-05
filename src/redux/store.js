import {
  configureStore
} from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import foodReducer from "./foodSlice";

// =========================
// CART PERSISTENCE MIDDLEWARE
// =========================

const cartMiddleware =
  (store) => (next) => (action) => {

    const result = next(action);

    if (
      typeof action.type === "string" &&
      action.type.startsWith("cart/")
    ) {
      const cartItems =
        store.getState().cart.items;

      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
      );

      console.log(
        "Cart Action:",
        action.type
      );
    }

    return result;
  };

// =========================
// STORE
// =========================

const store = configureStore({
  reducer: {
    cart: cartReducer,
    food: foodReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartMiddleware
    )
});

export default store;