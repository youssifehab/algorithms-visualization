import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Graph } from "./Pages/Graph.tsx";
import { Array } from "./Pages/Array.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/graph",
        element: <Graph />,
      },
      {
        path: "/array/sorting",
        element: <Array />,
      },
      {
        path: "/array/searching",
        element: <Array />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
