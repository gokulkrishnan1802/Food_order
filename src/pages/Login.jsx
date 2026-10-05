import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, loading } = useAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const from =
    location.state?.from?.pathname ||
    "/";

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!username.trim()) {
      setError(
        "Please enter your username."
      );
      return;
    }

    if (!password) {
      setError(
        "Please enter your password."
      );
      return;
    }

    const result = await login(
      username.trim(),
      password
    );

    if (result.success) {
      navigate(from, {
        replace: true
      });
    } else {
      setError(
        result.message ||
          "Login failed."
      );
    }
  };

  return (
    <main className="login-page">

      <div className="login-container">

        <div className="login-card">

          <div className="login-header">

            <h1>
              Login
            </h1>

            <p>
              Enter your credentials
              to continue.
            </p>

          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <form
            className="login-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >

            {/* USERNAME */}

            <div className="form-group">

              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(
                    event.target.value
                  )
                }
                placeholder="Enter your username"
                disabled={loading}
                autoComplete="off"
              />

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter your password"
                  disabled={loading}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  disabled={loading}
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

              <small>
                Password must contain at least
                8 characters, uppercase,
                lowercase, number and special
                character.
              </small>

            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

        </div>

      </div>

    </main>
  );
};

export default Login;