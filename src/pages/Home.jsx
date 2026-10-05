import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-page">

      {/* Reusable Header */}
      <Header />

      {/* Hero Section */}
      <section className="home">
        <div className="home-content">

          <h1>
            Delicious Food,
            <br />
            Delivered To You 🍴
          </h1>

          <p>
            Order your favorite food
            and enjoy delicious meals
            at your doorstep.
          </p>

          <Link
            to="/menu"
            className="order-btn"
          >
            Order Now
          </Link>

        </div>
      </section>

      {/* Reusable Footer */}
      <Footer />

    </div>
  );
}

export default Home;