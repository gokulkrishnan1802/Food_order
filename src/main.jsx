import {
  StrictMode
} from "react";

import {
  createRoot
} from "react-dom/client";

import {
  BrowserRouter
} from "react-router-dom";

import {
  Provider
} from "react-redux";

import "./index.css";
import "./App.css";

import App from "./App.jsx";

import {
  AuthProvider
} from "./context/AuthContext.jsx";

import store from "./redux/store";

createRoot(
  document.getElementById(
    "root"
  )
).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

/* =========================
   PWA SERVICE WORKER
========================= */

if (
  "serviceWorker" in navigator
) {
  window.addEventListener(
    "load",
    () => {
      navigator.serviceWorker
        .register(
          "/service-worker.js"
        )
        .then(() => {
          console.log(
            "Service Worker registered successfully."
          );
        })
        .catch((error) => {
          console.error(
            "Service Worker registration failed:",
            error
          );
        });
    }
  );
}