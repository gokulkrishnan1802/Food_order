import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Header = () => {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">

      <Link
        to="/"
        className="logo"
      >
        Food Ordering
      </Link>

      <nav className="nav-menu">

        <Link to="/">
          Home
        </Link>

        <Link to="/menu">
          Menu
        </Link>

        <Link to="/cart">
          Cart
        </Link>

        <Link to="/orders/current">
          Orders
        </Link>

      </nav>

      <div className="header-user">

        {isAuthenticated ? (
          <>
            <span className="user-name">
              Hi,{" "}
              {user?.username ||
                "User"}
            </span>

            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>
        )}

      </div>

    </header>
  );
};

export default Header;