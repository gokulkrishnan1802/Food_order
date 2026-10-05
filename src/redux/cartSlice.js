import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  const savedCart =
    localStorage.getItem("cartItems");

  if (!savedCart) {
    return [];
  }

  try {
    const parsedCart =
      JSON.parse(savedCart);

    return Array.isArray(parsedCart)
      ? parsedCart
      : [];
  } catch {
    localStorage.removeItem("cartItems");
    return [];
  }
};

const initialState = {
  items: getInitialCart()
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const food = action.payload;

      const existingItem =
        state.items.find(
          (item) => item.id === food.id
        );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...food,
          quantity: 1
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items =
        state.items.filter(
          (item) =>
            item.id !== action.payload
        );
    },

    updateQuantity: (
      state,
      action
    ) => {
      const {
        id,
        quantity
      } = action.payload;

      const item =
        state.items.find(
          (item) =>
            item.id === id
        );

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        state.items =
          state.items.filter(
            (item) =>
              item.id !== id
          );
      } else {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;