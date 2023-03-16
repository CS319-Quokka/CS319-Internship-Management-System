import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Components/Pages/Profile";
import Reports from "./Components/Pages/Reports";
import Notifications from "./Components/Pages/Notifications";
import FileSubmission from "./Components/Pages/FileSubmission";
import Sidebar from "./Components/Sidebar";
import "./App.css";

const AppLayout = () => (
  <>
    
    <Outlet />
    <Sidebar />
  </>
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<AppLayout />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/reports" element={<Reports />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "reports",
        element: <Reports />,
      },

      {
        path: "submission",
        element: <FileSubmission />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);