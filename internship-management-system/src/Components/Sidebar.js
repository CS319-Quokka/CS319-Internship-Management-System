import React, { Component, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Styles/Sidebar.css";
import * as FiIcons from "react-icons/fi";
import { IconContext } from "react-icons";

class Sidebar extends Component{
  
  constructor(props) {
      super(props)
      this.state = "Profile"
      this.userType = "administrative-assistant"
  }    


  

  render(){

    const handleLogout = (title) => {
      console.log("LOGOUT");
    };
    console.log(this.userType);
    // Find the sidebar data for the current user type
    const data = SidebarData.find(
      (item) => item.userType === this.userType
    );

    if(data){
      
    return (
      <>
        <IconContext.Provider value={{ color: "undefined" }}>
          
          <nav className={"sidebar"}>
            <ul className="menu-items" >
              
            {data?.items.map((item, index) => {
                const isActive = item.title === this.state.activePage;
                console.log(this.state.activePage)
                const className = isActive ? "menu-item-active" : "menu-item";
                return (
                  <li key={index} className={className}>
                    <Link
                      to={item.path}
                      onClick={() => {
                        this.setState({ activePage: item.title });
                      }}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );

              })}
              <Link className="logout"
                      onClick={() => {
                        this.handleLogout();
                      }}
                    >
                      {<FiIcons.FiLogOut/>}
                      <span>{"Logout"}</span>
               </Link>

              
             
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );

    }

  }
 
}

export default Sidebar;