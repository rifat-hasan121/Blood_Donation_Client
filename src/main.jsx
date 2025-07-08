import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router";
import AuthProvider from "./Provider/AuthProvider";
import { ThemeProvider } from "./Context/ThemeContext";
import { Toaster } from "react-hot-toast";

// Create a client

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
