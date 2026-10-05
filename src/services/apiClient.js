import axios from "axios";

const apiClient =
  axios.create({
    baseURL:
      "https://dummyjson.com",

    headers: {
      "Content-Type":
        "application/json"
    },

    timeout: 10000
  });

/* =========================
   REQUEST INTERCEPTOR
========================= */

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "authToken"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) =>
    Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */

apiClient.interceptors.response.use(
  (response) =>
    response,

  (error) => {
    if (
      error.response?.status ===
      401
    ) {
      console.warn(
        "Authentication token expired or invalid."
      );

      localStorage.removeItem(
        "authToken"
      );

      localStorage.removeItem(
        "authUser"
      );

      window.dispatchEvent(
        new Event(
          "auth-expired"
        )
      );
    }

    if (
      error.response?.status >=
      500
    ) {
      console.error(
        "Server error occurred."
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default apiClient;