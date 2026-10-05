import {
  describe,
  test,
  expect,
  jest
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

import FoodCard from "../components/FoodCard";

const food = {
  id: 1,
  name: "Chicken Biryani",
  category: "Indian",
  price: 250,
  rating: 4.8,
  image: "biryani.jpg",
  description:
    "Delicious chicken biryani",
  ingredients:
    "Chicken, Rice, Spices"
};

describe(
  "FoodCard Component",
  () => {
    test(
      "renders food information correctly",
      () => {
        const addToCart =
          jest.fn();

        render(
          <MemoryRouter>
            <FoodCard
              food={food}
              addToCart={
                addToCart
              }
            />
          </MemoryRouter>
        );

        expect(
          screen.getByRole(
            "heading",
            {
              name: "Chicken Biryani"
            }
          )
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "Indian"
          )
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "₹250"
          )
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "⭐ 4.8"
          )
        ).toBeInTheDocument();
      }
    );

    test(
      "renders View Details link",
      () => {
        const addToCart =
          jest.fn();

        render(
          <MemoryRouter>
            <FoodCard
              food={food}
              addToCart={
                addToCart
              }
            />
          </MemoryRouter>
        );

        const links =
          screen.getAllByRole(
            "link",
            {
              name: /View details for Chicken Biryani/i
            }
          );

        expect(
          links.length
        ).toBe(2);

        expect(
          links[1]
        ).toHaveAttribute(
          "href",
          "/food/1"
        );
      }
    );

    test(
      "calls addToCart when Add to Cart is clicked",
      async () => {
        const user =
          userEvent.setup();

        const addToCart =
          jest.fn();

        render(
          <MemoryRouter>
            <FoodCard
              food={food}
              addToCart={
                addToCart
              }
            />
          </MemoryRouter>
        );

        const button =
          screen.getByRole(
            "button",
            {
              name: /Add Chicken Biryani to cart/i
            }
          );

        await user.click(
          button
        );

        expect(
          addToCart
        ).toHaveBeenCalledTimes(
          1
        );

        expect(
          addToCart
        ).toHaveBeenCalledWith(
          food
        );
      }
    );

    test(
      "renders accessible image",
      () => {
        const addToCart =
          jest.fn();

        render(
          <MemoryRouter>
            <FoodCard
              food={food}
              addToCart={
                addToCart
              }
            />
          </MemoryRouter>
        );

        const image =
          screen.getByRole(
            "img",
            {
              name: "Chicken Biryani"
            }
          );

        expect(
          image
        ).toBeInTheDocument();

        expect(
          image
        ).toHaveAttribute(
          "loading",
          "lazy"
        );

        expect(
          image
        ).toHaveAttribute(
          "decoding",
          "async"
        );
      }
    );
  }
);