import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserData } from "../UserData";
import DisplayList from "./DisplayList";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  
  render() {
    const { showMenu } = this.state;
    return (
      
      <div className="maincontainer">
        
        <DisplayList data={UserData} displayFields={['name', 'role', 'department']} />
        <div className="add"><button className="button">+</button>{showMenu && (
          <div className="menu">
            <ul>
              <li onClick={this.handleNewUserClick}>New User</li>
              <li onClick={this.handleExistingUserClick}>Existing User</li>
            </ul>
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default StudentList;