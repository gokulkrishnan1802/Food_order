import {
  memo
} from "react";

import {
  Link
} from "react-router-dom";

function FoodCard({
  food,
  addToCart
}) {
  const handleAddToCart = () => {
    addToCart(food);
  };

  return (
    <article
      className="food-card"
      aria-label={`${food.name} food item`}
    >
      <div className="food-image">
        <Link
          to={`/food/${food.id}`}
          aria-label={`View details for ${food.name}`}
        >
          <img
            src={food.image}
            alt={food.name}
            loading="lazy"
            decoding="async"
          />
        </Link>
      </div>

      <div className="food-info">
        <h3>{food.name}</h3>

        <p className="food-category">
          {food.category}
        </p>

        <p className="food-price">
          ₹{food.price}
        </p>

        <p
          className="food-rating"
          aria-label={`Rating ${food.rating} out of 5`}
        >
          ⭐ {food.rating}
        </p>

        <Link
          to={`/food/${food.id}`}
          className="view-details-btn"
          aria-label={`View details for ${food.name}`}
        >
          View Details
        </Link>

        <button
          type="button"
          className="add-cart-btn"
          onClick={handleAddToCart}
          aria-label={`Add ${food.name} to cart`}
        >
          Add to Cart 🛒
        </button>
      </div>
    </article>
  );
}

export default memo(FoodCard);