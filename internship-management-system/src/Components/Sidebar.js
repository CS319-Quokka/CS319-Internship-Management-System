import React, { Component, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";

class Sidebar extends Component{
  
  constructor(props) {
      super(props)
      this.state = "Profile"
  }    



  render(){

    return (
      <>
        <IconContext.Provider value={{ color: "undefined" }}>
          
          <nav className={"sidebar"}>
            <ul className="menu-items" >
              
            {SidebarData.map((item, index) => {
                const isActive = item.title === this.state.activePage;
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
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );

  }
 
}

export default Sidebar;