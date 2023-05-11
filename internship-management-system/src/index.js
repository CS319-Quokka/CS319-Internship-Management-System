import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Profile from "./Components/Pages/Profile";
import Reports from "./Components/Pages/Reports";
import StudentNotifications from "./Components/Pages/StudentNotifications";
import InstructorNotifications from "./Components/Pages/InstructorNotifications"
import FileSubmission from "./Components/Pages/FileSubmission";
import ReportEvaluation from "./Components/Pages/ReportEvaluation";
import Statistics from "./Components/Pages/Statistics";
import StudentList from "./Components/Pages/StudentList";
import GraderProgress from "./Components/Pages/GraderProgress";
import Login from "./Components/Pages/Login";
import StudentOperations from "./Components/Pages/StudentOperations";
import ManageUsers from "./Components/Pages/ManageUsers";
import Sidebar from "./Components/Sidebar";
import FAQ from "./Components/Pages/FAQ"

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
          path: "studentnotifications",
          element: <StudentNotifications />,
        },
        {
          path: "instructornotifications",
          element: <InstructorNotifications />,
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
          element: <StudentOperations />,
        },
        {
          path: "graders",
          element: <GraderProgress />,
        },
        {
          path: "manage",
          element: <ManageUsers />,
        },
        {
          path: 'faq',
          element: <FAQ />
        }
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