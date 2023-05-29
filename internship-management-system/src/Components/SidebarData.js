import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
export const SidebarData = [

  {
    userType : "Student",
    items:[
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
        path: "/studentnotifications",
        icon: <IoIcons.IoIosNotificationsOutline />,
        cName: "nav-text",
      },
    
      
      
    ],
    
  },
  {
    userType : "Instructor",
    items:[
    { 
      title: "Profile",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
  
   
    {
      title: "Notifications",
      path: "/instructornotifications",
      icon: <IoIcons.IoIosNotificationsOutline />,
      cName: "nav-text",
    },
    {
      title: "Student List",
      path: "/students",
      icon: <AiIcons.AiOutlineUser />,
      cName: "nav-text",
    },
    {
      title: "Statistics",
      path: "/statistics",
      icon: <GiIcons.GiProgression />,
      cName: "nav-text",
    },
   
      
    ],
  },
  {
    userType : "Administrative Assistant",
    items:[
    { 
      title: "Profile",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
  
    
    {
      title: "Notifications",
      path: "/announcements",
      icon: <IoIcons.IoIosNotificationsOutline />,
      cName: "nav-text",
    },
    {
      title: "Manage Users",
      path: "/manage",
      icon : <MdIcons.MdManageAccounts />,
      cName: "nav-text",
  
    },
    {
      title: "Grader Progress",
      path: "/graders",
      icon: <FaIcons.FaChalkboardTeacher />,
      cName: "nav-text",
    },
    {
      title: "Statistics",
      path: "/statistics",
      icon: <GiIcons.GiProgression />,
      cName: "nav-text",
    },
    {
      title: "Student Operations",
      path: "/forms",
      icon: <AiIcons.AiOutlineMail />,
      cName: "nav-text",
    },
   
      
    ],
  },

  {
    userType : "Teaching Assistant",
    items:[
    { 
      title: "Profile",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
  
    
    {
      title: "Notifications",
      path: "/announcements",
      icon: <IoIcons.IoIosNotificationsOutline />,
      cName: "nav-text",
    },

    {
      title: "Student List",
      path: "/students",
      icon: <AiIcons.AiOutlineUser />,
      cName: "nav-text",
    },
   
   
   
      
    ],
  },
  {
    userType : "Summer Training Coordinator",
    items:[
    { 
      title: "Profile",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
  
    
    {
      title: "Notifications",
      path: "/announcements",
      icon: <IoIcons.IoIosNotificationsOutline />,
      cName: "nav-text",
    },
  
    {
      title: "Statistics",
      path: "/statistics",
      icon: <GiIcons.GiProgression />,
      cName: "nav-text",
    },
    
      
    ],
  },
  
  {
    userType : "admin",
    items:[
    { 
      title: "Profile",
      path: "/",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
  
    
    {
      title: "Notifications",
      path: "/notifications",
      icon: <IoIcons.IoIosNotificationsOutline />,
      cName: "nav-text",
    },
  
    {
      title: "Manage Users",
      path: "/manage",
      icon : <MdIcons.MdManageAccounts />,
      cName: "nav-text",
  
    },
    
      
    ],
  },
  

 
   
  
];