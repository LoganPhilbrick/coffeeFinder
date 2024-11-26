import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Details from "./pages/Details";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "details/:id",
        element: <Details />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>
        <h1 style={{ marginTop: "50vh" }}>404 Not Found</h1>
      </div>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Router} />);
