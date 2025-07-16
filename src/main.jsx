import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router";
import AuthProvider from "./Provider/AuthProvider";
import { ThemeProvider } from "./Context/ThemeContext";
import { Toaster } from "react-hot-toast";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// Create a client

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </ThemeProvider>
    </Elements>
  </StrictMode>
);
