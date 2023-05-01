import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StudentData } from "../StudentData";
import DisplayList from "./DisplayList";
import "../Styles/StudentList.css";
class StudentList extends Component {
  
  render() {
    return (
      <div className="student-list">
        <DisplayList data={StudentData} displayFields={['name', 'class', 'status']} />
      </div>
    );
  }
}

export default StudentList;