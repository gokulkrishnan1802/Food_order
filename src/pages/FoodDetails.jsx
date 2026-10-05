import {
  Link,
  useParams
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import {
  getFoodItemById
} from "../services/foodApi";

function FoodDetails({ addToCart }) {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getFoodItemById(id);

        setFood({
          id: data.id,
          name: data.name,
          category: data.cuisine,
          price: Math.round(
            data.caloriesPerServing * 2
          ),
          rating: data.rating,
          image: data.image,
          description:
            data.instructions?.join(" ") ||
            "Delicious food prepared with fresh ingredients.",
          ingredients:
            data.ingredients?.join(", ") ||
            "Fresh ingredients"
        });

      } catch (err) {
        console.error(
          "Food Details API Error:",
          err
        );

        setError(
          "Unable to load food details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="page">

        <Header />

        <section className="food-details">

          <Loading
            message="Loading food details..."
          />

        </section>

        <Footer />

      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="page">

        <Header />

        <section className="food-details">

          <div className="details-card">

            <div className="details-content">

              <h2>
                ⚠️ Food Item Not Found
              </h2>

              <p>
                {error ||
                  "The requested food item could not be found."}
              </p>

              <Link
                to="/menu"
                className="back-category-btn"
              >
                ← Back to Menu
              </Link>

            </div>

          </div>

        </section>

        <Footer />

      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(food);
  };

  return (
    <div className="page">

      <Header />

      <section className="food-details">

        <div className="details-card">

          <div className="details-image">

            <img
              src={food.image}
              alt={food.name}
            />

          </div>

          <div className="details-content">

            <span className="details-category">
              {food.category}
            </span>

            <h1>
              {food.name}
            </h1>

            <p className="details-rating">
              ⭐ {food.rating}
            </p>

            <p className="details-description">
              {food.description}
            </p>

            <p>
              <strong>
                Ingredients:
              </strong>

              <br />

              {food.ingredients}
            </p>

            <h2 className="details-price">
              ₹{food.price}
            </h2>

            <button
              className="add-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart 🛒
            </button>

            <br />

            <Link
              to="/cart"
              className="back-category-btn"
            >
              Go to Cart →
            </Link>

            <br />

            <Link
              to="/menu"
              className="back-category-btn"
            >
              ← Back to Menu
            </Link>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default FoodDetails;