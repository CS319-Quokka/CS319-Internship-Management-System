import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GraderData } from "../GraderData";
import DisplayList from "./DisplayList";
import "../Styles/List.css";
import "../Styles/InstructorProgress.css";


class GraderProgress extends Component {
  
  render() {
    
    return (
      <div className="main">
        <DisplayList data={GraderData} displayFields={['name', 'department','assigned', 'progress']} />
        
      </div>
    );
  }
}

export default GraderProgress;