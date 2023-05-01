import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Profile from "./Components/Pages/Profile";
import Reports from "./Components/Pages/Reports";
import Notifications from "./Components/Pages/Notifications";
import FileSubmission from "./Components/Pages/FileSubmission";
import ReportEvaluation from "./Components/Pages/ReportEvaluation";
import Statistics from "./Components/Pages/Statistics";
import StudentList from "./Components/Pages/StudentList";
import GraderProgress from "./Components/Pages/GraderProgress";
import Login from "./Components/Pages/Login";
import CompanyForms from "./Components/Pages/CompanyForms";
import ManageUsers from "./Components/Pages/ManageUsers";
import Sidebar from "./Components/Sidebar";
import "./App.css";

const App = () => {
  const [logged, setIsLoggedIn] = useState(false);

  const handleSubmit = () => {
    setIsLoggedIn(true);
  };

  const router = createBrowserRouter([
    {
      element: <AppLayout logged={logged} />,
      children: [
        {
          path: "login",
          element: <Login onLogin={handleSubmit} />,
        },
        {
          path: "/",
          element: <Profile />,
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
          path: "students",
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

  return (
    <>
      {logged ? (
        <RouterProvider router={router} />
      ) : (
        <Login onLogin={handleSubmit} />
      )}
    </>
  );
};

const AppLayout = ({ logged }) => (
  <>
    {logged && <Sidebar />}
    <Outlet />
  </>
);

createRoot(document.getElementById("root")).render(<App />);
