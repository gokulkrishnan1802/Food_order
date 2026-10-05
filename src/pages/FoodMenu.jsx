import {
  useEffect,
  useMemo,
  useCallback,
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FoodCard from "../components/FoodCard";
import Loading from "../components/Loading";

import {
  fetchFoodItems
} from "../redux/foodSlice";

function FoodMenu({
  addToCart
}) {
  const dispatch = useDispatch();

  const {
    items: foodItems,
    loading,
    error
  } = useSelector(
    (state) => state.food
  );

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  useEffect(() => {
    if (
      foodItems.length === 0
    ) {
      dispatch(
        fetchFoodItems()
      );
    }
  }, [
    dispatch,
    foodItems.length
  ]);

  const categories = useMemo(() => {
    const uniqueCategories =
      [
        ...new Set(
          foodItems.map(
            (food) =>
              food.cuisine
          )
        )
      ];

    return [
      "All",
      ...uniqueCategories
    ];
  }, [foodItems]);

  const filteredFoods =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return foodItems.filter(
        (food) => {
          const matchesSearch =
            food.name
              .toLowerCase()
              .includes(
                normalizedSearch
              );

          const matchesCategory =
            category === "All" ||
            food.cuisine ===
              category;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      foodItems,
      search,
      category
    ]);

  const formatFood =
    useCallback(
      (food) => ({
        id: food.id,
        name: food.name,
        category:
          food.cuisine,
        price: Math.round(
          food.caloriesPerServing *
            2
        ),
        rating: food.rating,
        image: food.image,
        description:
          food.instructions?.[0] ||
          "Delicious food.",
        ingredients:
          food.ingredients?.join(
            ", "
          ) ||
          "Fresh ingredients"
      }),
      []
    );

  return (
    <div className="page">
      <Header />

      <main
        className="food-menu"
        aria-labelledby="menu-title"
      >
        <div className="menu-header">
          <h1 id="menu-title">
            Our Food Menu 🍴
          </h1>

          <p>
            Choose your favorite
            food.
          </p>
        </div>

        <div
          className="menu-controls"
          role="search"
          aria-label="Food search and filters"
        >
          <label
            htmlFor="food-search"
            className="sr-only"
          >
            Search food
          </label>

          <input
            id="food-search"
            type="search"
            placeholder="Search food..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            autoComplete="off"
          />

          <label
            htmlFor="food-category"
            className="sr-only"
          >
            Filter by category
          </label>

          <select
            id="food-category"
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value
              )
            }
          >
            {categories.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>
        </div>

        {loading && (
          <Loading
            message="Loading food items..."
          />
        )}

        {!loading &&
          error && (
            <div
              className="error-card"
              role="alert"
            >
              <h2>
                ⚠️ Food Loading Error
              </h2>

              <p>
                Unable to load food
                items.
              </p>

              <button
                type="button"
                className="order-btn"
                onClick={() =>
                  dispatch(
                    fetchFoodItems()
                  )
                }
              >
                Try Again
              </button>
            </div>
          )}

        {!loading &&
          !error &&
          filteredFoods.length >
            0 && (
            <div
              className="food-grid"
              aria-live="polite"
            >
              {filteredFoods.map(
                (food) => (
                  <FoodCard
                    key={food.id}
                    food={formatFood(
                      food
                    )}
                    addToCart={
                      addToCart
                    }
                  />
                )
              )}
            </div>
          )}

        {!loading &&
          !error &&
          filteredFoods.length ===
            0 && (
            <div
              className="empty-cart"
              role="status"
            >
              <h2>
                No food items found 😕
              </h2>

              <p>
                Try another search
                or category.
              </p>
            </div>
          )}
      </main>

      <Footer />
    </div>
  );
}

export default FoodMenu;