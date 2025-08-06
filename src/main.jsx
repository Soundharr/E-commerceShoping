// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div
      style={{
        background: "linear-gradient(135deg, #c8beb1, #A9D39E)", // Gradient from #c8beb1 to #A9D39E
        minHeight: "100vh", // Full viewport height
      }}
    >
      <App />
    </div>
  </Provider>
);
