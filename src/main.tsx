import "./styles/index.css";
import "./styles/App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./routes/router.tsx";
import { CartProvider } from "./contexts/cart";
import ErrorBoundary from "./components/error-boundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <Router />
      </CartProvider>
    </ErrorBoundary>
  </StrictMode>
);
