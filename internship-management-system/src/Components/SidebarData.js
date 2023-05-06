import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Profile",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },

  {
    title: "File Submission",
    path: "/submission",
    icon : <AiIcons.AiOutlineUpload />,
    cName: "nav-text",

  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <IoIcons.IoIosNotificationsOutline />,
    cName: "nav-text",
  },

 
   
  
];