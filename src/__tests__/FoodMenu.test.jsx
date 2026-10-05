import {
  render,
  screen
} from "@testing-library/react";

import userEvent from
  "@testing-library/user-event";

import {
  Provider
} from "react-redux";

import {
  configureStore
} from "@reduxjs/toolkit";

import {
  MemoryRouter
} from "react-router-dom";

import {
  describe,
  test,
  expect,
  jest
} from "@jest/globals";

import FoodMenu from
  "../pages/FoodMenu";

import foodReducer from
  "../redux/foodSlice";

jest.mock(
  "../components/Header",
  () => () => (
    <header>Header</header>
  )
);

jest.mock(
  "../components/Footer",
  () => () => (
    <footer>Footer</footer>
  )
);

jest.mock(
  "../components/Loading",
  () => ({ message }) => (
    <div>{message}</div>
  )
);

function createTestStore(
  foodItems
) {
  return configureStore({
    reducer: {
      food: foodReducer
    },
    preloadedState: {
      food: {
        items: foodItems,
        loading: false,
        error: ""
      }
    }
  });
}

const foods = [
  {
    id: 1,
    name: "Chicken Biryani",
    cuisine: "Indian",
    caloriesPerServing: 300,
    rating: 4.8,
    image: "biryani.jpg",
    ingredients: [
      "Chicken",
      "Rice"
    ],
    instructions: [
      "Cook the biryani"
    ]
  },
  {
    id: 2,
    name: "Margherita Pizza",
    cuisine: "Italian",
    caloriesPerServing: 250,
    rating: 4.6,
    image: "pizza.jpg",
    ingredients: [
      "Cheese",
      "Tomato"
    ],
    instructions: [
      "Bake the pizza"
    ]
  },
  {
    id: 3,
    name: "Chicken Curry",
    cuisine: "Indian",
    caloriesPerServing: 280,
    rating: 4.7,
    image: "curry.jpg",
    ingredients: [
      "Chicken"
    ],
    instructions: [
      "Cook the curry"
    ]
  }
];

function renderFoodMenu() {
  const store =
    createTestStore(foods);

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <FoodMenu
          addToCart={jest.fn()}
        />
      </MemoryRouter>
    </Provider>
  );
}

describe("FoodMenu Component", () => {
  test("renders food items correctly", () => {
    renderFoodMenu();

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
        "Chicken Curry"
      )
    ).toBeInTheDocument();
  });

  test("renders search input and category filter", () => {
    renderFoodMenu();

    expect(
      screen.getByPlaceholderText(
        "Search food..."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole(
        "combobox"
      )
    ).toBeInTheDocument();
  });

  test("filters food using search", async () => {
    const user =
      userEvent.setup();

    renderFoodMenu();

    const searchInput =
      screen.getByPlaceholderText(
        "Search food..."
      );

    await user.type(
      searchInput,
      "pizza"
    );

    expect(
      screen.getByText(
        "Margherita Pizza"
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Chicken Biryani"
      )
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        "Chicken Curry"
      )
    ).not.toBeInTheDocument();
  });

  test("filters food by category", async () => {
    const user =
      userEvent.setup();

    renderFoodMenu();

    const categorySelect =
      screen.getByRole(
        "combobox"
      );

    await user.selectOptions(
      categorySelect,
      "Indian"
    );

    expect(
      screen.getByText(
        "Chicken Biryani"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Chicken Curry"
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Margherita Pizza"
      )
    ).not.toBeInTheDocument();
  });

  test("shows empty message when no food matches", async () => {
    const user =
      userEvent.setup();

    renderFoodMenu();

    const searchInput =
      screen.getByPlaceholderText(
        "Search food..."
      );

    await user.type(
      searchInput,
      "burger"
    );

    expect(
      screen.getByText(
        "No food items found 😕"
      )
    ).toBeInTheDocument();
  });
});