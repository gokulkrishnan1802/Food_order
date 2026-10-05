import {
  useEffect,
  useState
} from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
  getFoodItems,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem
} from "../services/foodApi";

function FoodCrud() {
  const [foods, setFoods] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    operationLoading,
    setOperationLoading
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      cuisine: "",
      rating: "",
      caloriesPerServing: ""
    });

  // =========================
  // GET FOOD ITEMS
  // =========================

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getFoodItems();

      setFoods(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load food items. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD ON PAGE OPEN
  // =========================
  // The asynchronous callback
  // avoids synchronous setState
  // directly inside the effect.
  
  useEffect(() => {
    let cancelled = false;

    const loadFoods =
      async () => {
        try {
          const data =
            await getFoodItems();

          if (!cancelled) {
            setFoods(data);
            setError("");
          }
        } catch (err) {
          console.error(err);

          if (!cancelled) {
            setError(
              "Unable to load food items. Please try again."
            );
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    loadFoods();

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (
    event
  ) => {
    const {
      name,
      value
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value
      })
    );
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      name: "",
      cuisine: "",
      rating: "",
      caloriesPerServing: ""
    });

    setEditingId(null);
  };

  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setError("");
      setMessage("");
      setOperationLoading(
        true
      );

      try {
        const foodData = {
          name: formData.name,
          cuisine:
            formData.cuisine,
          rating:
            Number(
              formData.rating
            ) || 4.5,
          caloriesPerServing:
            Number(
              formData.caloriesPerServing
            ) || 300
        };

        if (editingId) {
          // PUT

          await updateFoodItem(
            editingId,
            foodData
          );

          setMessage(
            "Food item updated successfully."
          );
        } else {
          // POST

          await addFoodItem(
            foodData
          );

          setMessage(
            "Food item added successfully."
          );
        }

        resetForm();

        // Refresh list
        await fetchFoods();
      } catch (err) {
        console.error(err);

        setError(
          editingId
            ? "Unable to update food item."
            : "Unable to add food item."
        );
      } finally {
        setOperationLoading(
          false
        );
      }
    };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (
    food
  ) => {
    setEditingId(food.id);

    setFormData({
      name:
        food.name || "",
      cuisine:
        food.cuisine || "",
      rating:
        food.rating || "",
      caloriesPerServing:
        food.caloriesPerServing ||
        ""
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this food item?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setOperationLoading(
          true
        );

        setError("");
        setMessage("");

        await deleteFoodItem(
          id
        );

        setMessage(
          "Food item deleted successfully."
        );

        // Refresh list
        await fetchFoods();
      } catch (err) {
        console.error(err);

        setError(
          "Unable to delete food item."
        );
      } finally {
        setOperationLoading(
          false
        );
      }
    };

  return (
    <div className="page">
      <Header />

      <main className="crud-page">
        <div className="crud-header">
          <h1>
            Food CRUD Management
          </h1>

          <p>
            Add, update and delete
            food items using REST
            APIs.
          </p>
        </div>

        {/* =========================
            STATUS
        ========================= */}

        {loading && (
          <div
            className="crud-status"
            role="status"
          >
            Loading food items...
          </div>
        )}

        {operationLoading && (
          <div
            className="crud-status"
            role="status"
          >
            Processing API
            operation...
          </div>
        )}

        {error && (
          <div
            className="crud-error"
            role="alert"
          >
            ⚠️ {error}
          </div>
        )}

        {message && (
          <div
            className="crud-success"
            role="status"
          >
            ✓ {message}
          </div>
        )}

        {/* =========================
            FORM
        ========================= */}

        <div className="crud-form-card">
          <h2>
            {editingId
              ? "Update Food Item"
              : "Add New Food Item"}
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <label
              htmlFor="food-name"
              className="sr-only"
            >
              Food name
            </label>

            <input
              id="food-name"
              type="text"
              name="name"
              placeholder="Food name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
            />

            <label
              htmlFor="food-cuisine"
              className="sr-only"
            >
              Cuisine
            </label>

            <input
              id="food-cuisine"
              type="text"
              name="cuisine"
              placeholder="Cuisine"
              value={
                formData.cuisine
              }
              onChange={
                handleChange
              }
              required
            />

            <label
              htmlFor="food-rating"
              className="sr-only"
            >
              Rating
            </label>

            <input
              id="food-rating"
              type="number"
              name="rating"
              placeholder="Rating"
              min="0"
              max="5"
              step="0.1"
              value={
                formData.rating
              }
              onChange={
                handleChange
              }
            />

            <label
              htmlFor="food-calories"
              className="sr-only"
            >
              Calories per serving
            </label>

            <input
              id="food-calories"
              type="number"
              name="caloriesPerServing"
              placeholder="Calories per serving"
              min="1"
              value={
                formData.caloriesPerServing
              }
              onChange={
                handleChange
              }
            />

            <div className="crud-form-buttons">
              <button
                type="submit"
                className="order-btn"
                disabled={
                  operationLoading
                }
              >
                {editingId
                  ? "Update Food"
                  : "Add Food"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="crud-cancel-btn"
                  onClick={
                    resetForm
                  }
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* =========================
            FOOD LIST
        ========================= */}

        {!loading &&
          foods.length > 0 && (
            <section className="crud-list">
              <h2>
                Food Items
              </h2>

              {foods.map(
                (food) => (
                  <article
                    className="crud-food-card"
                    key={food.id}
                  >
                    <div>
                      <h3>
                        {food.name}
                      </h3>

                      <p>
                        Cuisine:{" "}
                        {
                          food.cuisine
                        }
                      </p>

                      <p>
                        Rating:{" "}
                        {
                          food.rating
                        }
                      </p>

                      <p>
                        Calories:{" "}
                        {
                          food.caloriesPerServing
                        }
                      </p>
                    </div>

                    <div className="crud-actions">
                      <button
                        type="button"
                        className="crud-edit-btn"
                        onClick={() =>
                          handleEdit(
                            food
                          )
                        }
                        disabled={
                          operationLoading
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="crud-delete-btn"
                        onClick={() =>
                          handleDelete(
                            food.id
                          )
                        }
                        disabled={
                          operationLoading
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                )
              )}
            </section>
          )}

        {!loading &&
          !error &&
          foods.length ===
            0 && (
            <div className="empty-cart">
              <h2>
                No food items found
              </h2>

              <p>
                Add a food item using
                the form above.
              </p>
            </div>
          )}
      </main>

      <Footer />
    </div>
  );
}

export default FoodCrud;