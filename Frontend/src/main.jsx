// -------------------------------------------------------------------
// App entry point — mounts React into the #root element of index.html.
// `App` wraps the application in <BrowserRouter> (see App.jsx), so all
// navigation hooks/components below can use react-router.
// -------------------------------------------------------------------
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "./index.css"; // styling is handled by inline styles (styles.jsx)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
