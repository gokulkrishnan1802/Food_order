import { useEffect, useState } from "react";

import { AuthContext } from "./authContext";
import { loginUser } from "../services/authApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("authUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken");
  });

  const [loading, setLoading] =
    useState(false);

  // =========================
  // LOGIN
  // =========================

  const login = async (
    username,
    password
  ) => {
    setLoading(true);

    try {
      const data = await loginUser(
        username,
        password
      );

      const receivedToken =
        data.accessToken ||
        data.token;

      if (!receivedToken) {
        throw new Error(
          "Authentication token was not received."
        );
      }

      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image
      };

      localStorage.setItem(
        "authToken",
        receivedToken
      );

      localStorage.setItem(
        "authUser",
        JSON.stringify(userData)
      );

      setToken(receivedToken);
      setUser(userData);

      return {
        success: true,
        user: userData
      };
    } catch (error) {
      console.error(
        "Login failed:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your credentials."
      };
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem(
      "authToken"
    );

    localStorage.removeItem(
      "authUser"
    );

    setToken(null);
    setUser(null);
  };

  // =========================
  // HANDLE EXPIRED TOKEN
  // =========================

  useEffect(() => {
    const handleAuthExpired = () => {
      logout();
    };

    window.addEventListener(
      "auth-expired",
      handleAuthExpired
    );

    return () => {
      window.removeEventListener(
        "auth-expired",
        handleAuthExpired
      );
    };
  }, []);

  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token),
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};