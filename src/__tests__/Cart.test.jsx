import {
  describe,
  test,
  expect
} from "@jest/globals";

import {
  render,
  screen
} from "@testing-library/react";

import userEvent from
  "@testing-library/user-event";

import {
  MemoryRouter
} from "react-router-dom";

import {
  Provider
} from "react-redux";

import {
  configureStore
} from "@reduxjs/toolkit";

import cartReducer from "../redux/cartSlice";

import Cart from "../pages/Cart";

import {
  AuthProvider
} from "../context/AuthContext.jsx";

const createTestStore =
  (items) =>
    configureStore({
      reducer: {
        cart: cartReducer
      },

      preloadedState: {
        cart: {
          items
        }
      }
    });

const renderCart =
  (items) => {
    const store =
      createTestStore(
        items
      );

    return render(
      <Provider
        store={store}
      >
        <MemoryRouter>
          <AuthProvider>
            <Cart />
          </AuthProvider>
        </MemoryRouter>
      </Provider>
    );
  };

const chickenBiryani = {
  id: 1,
  name: "Chicken Biryani",
  price: 200,
  image: "biryani.jpg",
  quantity: 2
};

const pizza = {
  id: 2,
  name: "Margherita Pizza",
  price: 300,
  image: "pizza.jpg",
  quantity: 1
};

describe(
  "Cart Component",
  () => {
    test(
      "renders cart items and summary",
      () => {
        renderCart([
          chickenBiryani,
          pizza
        ]);

        expect(
          screen.getByRole(
            "heading",
            {
              name: "Your Food Cart 🛒"
            }
          )
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "Chicken Biryani"
          )
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "Margherita Pizza"
          )
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "₹700.00"
          )
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "₹35.00"
          )
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "₹735.00"
          )
        ).toBeInTheDocument();
      }
    );

    test(
      "increases quantity using accessible button",
      async () => {
        const user =
          userEvent.setup();

        renderCart([
          chickenBiryani
        ]);

        const increaseButton =
          screen.getByRole(
            "button",
            {
              name:
                "Increase quantity of Chicken Biryani"
            }
          );

        await user.click(
          increaseButton
        );

        expect(
          screen.getByLabelText(
            "Quantity 3"
          )
        ).toBeInTheDocument();
      }
    );

    test(
      "updates quantity using minus button",
      async () => {
        const user =
          userEvent.setup();

        renderCart([
          {
            ...chickenBiryani,
            quantity: 2
          },
          pizza
        ]);

        const decreaseButton =
          screen.getByRole(
            "button",
            {
              name:
                "Decrease quantity of Chicken Biryani"
            }
          );

        await user.click(
          decreaseButton
        );

        const chickenItem =
          screen
            .getByRole(
              "heading",
              {
                name:
                  "Chicken Biryani"
              }
            )
            .closest(
              ".cart-item"
            );

        expect(
          chickenItem.querySelector(
            '[aria-label="Quantity 1"]'
          )
        ).toBeInTheDocument();
      }
    );

    test(
      "removes an item from cart",
      async () => {
        const user =
          userEvent.setup();

        renderCart([
          chickenBiryani,
          pizza
        ]);

        const removeButton =
          screen.getByRole(
            "button",
            {
              name:
                "Remove Chicken Biryani from cart"
            }
          );

        await user.click(
          removeButton
        );

        expect(
          screen.queryByRole(
            "heading",
            {
              name:
                "Chicken Biryani"
            }
          )
        ).not.toBeInTheDocument();

        expect(
          screen.getByRole(
            "heading",
            {
              name:
                "Margherita Pizza"
            }
          )
        ).toBeInTheDocument();
      }
    );

    test(
      "clear cart button removes all items",
      async () => {
        const user =
          userEvent.setup();

        renderCart([
          chickenBiryani,
          pizza
        ]);

        const clearButton =
          screen.getByRole(
            "button",
            {
              name:
                "Clear all items from cart"
            }
          );

        await user.click(
          clearButton
        );

        expect(
          screen.getByRole(
            "heading",
            {
              name:
                "Your Cart is Empty 🛒"
            }
          )
        ).toBeInTheDocument();
      }
    );

    test(
      "renders accessible cart controls",
      () => {
        renderCart([
          chickenBiryani,
          pizza
        ]);

        expect(
          screen.getByRole(
            "button",
            {
              name:
                "Increase quantity of Chicken Biryani"
            }
          )
        ).toBeInTheDocument();

        expect(
          screen.getByRole(
            "button",
            {
              name:
                "Decrease quantity of Chicken Biryani"
            }
          )
        ).toBeInTheDocument();

        expect(
          screen.getByRole(
            "button",
            {
              name:
                "Remove Chicken Biryani from cart"
            }
          )
        ).toBeInTheDocument();
      }
    );
  }
);