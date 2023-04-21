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
import ReportEvaluation from "./Components/Pages/ReportEvaluation";
import Statistics from "./Components/Pages/Statistics";
import StudentList from "./Components/Pages/StudentList";
import GraderProgress from "./Components/Pages/GraderProgress";
import CompanyForms from "./Components/Pages/CompanyForms";
import ManageUsers from "./Components/Pages/ManageUsers";
import Sidebar from "./Components/Sidebar";
import "./App.css";

const AppLayout = () => (
  <>
    
    <Outlet />
    <Sidebar />
  </>
);

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
      {
        path: "evaluation",
        element: <ReportEvaluation />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "list",
        element: <StudentList />,
      },
      {
        path: "forms",
        element: <CompanyForms />,
      },
      {
        path: "graders",
        element: <GraderProgress />,
      },
      {
        path: "manage",
        element: <ManageUsers />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);