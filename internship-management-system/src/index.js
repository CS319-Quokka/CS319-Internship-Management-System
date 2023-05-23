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
import AdminAssNotifications from "./Components/Pages/AdminAssNotifications";
import "./App.css";


const App = () => {
  const [logged, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleSubmit = (type, id) => {
    setIsLoggedIn(true);
    setUserType(type);
    setUserId(id)
    console.log("type:" ,type);
    console.log("id: ", id)
  };


  const router = createBrowserRouter([
    {
      element: <AppLayout logged={logged} userType={userType} onLogin={(userType, userId) => { setUserType(userType); setUserId(userId); }} />,

      children: [
        {
          path: "login",
          element: <Login onLogin={handleSubmit} userType={userType} userId = {userId}/>,
        },
        {
          path: "/",
          element: <Profile userId = {userId} />,
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
          path: "adminassnotifications",
          element: <AdminAssNotifications />,
        },
        {
          path: "reports",
          element: <Reports />,
        },

        {
          path: "submission",
          element: <FileSubmission userId = {userId}/>,
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
          element: <StudentList userId = {userId}/>,
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

            <Login onLogin={handleSubmit} userType={userType} userId = {userId} />
        )}
      </>
  );
};

const AppLayout = ({ logged, userType,userId }) => (
    <>
      {logged && <Sidebar userType = {userType} userId = {userId} />}
      <Outlet />
    </>
);

createRoot(document.getElementById("root")).render(<App />);