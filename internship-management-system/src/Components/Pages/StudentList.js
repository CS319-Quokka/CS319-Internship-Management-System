import React, { useEffect, useState, setState } from 'react';
import axios from 'axios';
import {Component } from "react";
import { Link } from "react-router-dom";
import { StudentData } from "../StudentData";
import DisplayList from "./DisplayList";
import "../Styles/StudentList.css";

class StudentList extends Component {

  
  constructor(props) {
    super(props)

    this.state = {
        studentNameList:[]
    }
}


componentDidMount() {
    this.getAllStudents();
}



getAllStudents = async () =>{

    console.log("ID",this.props.userId)
    const id = this.props.userId;

    const response = await axios.get(`http://localhost:8080/get_all_users/${id}`);

    const info = response.data[0]
    console.log(info.id);


    const response2 = await axios.get(`http://localhost:8080/student?instructorId=${info.id}`);

    const studentInfo = response2.data;

    console.log(studentInfo)

    
  
     var name = [];

     for (var i = 0; i < studentInfo.length; i++) {
      console.log(i, "th student: ", studentInfo[i].id);
    
      var fullName = studentInfo[i].userAccount.firstName + " " + studentInfo[i].userAccount.lastName;
      var studentType = studentInfo[i].role;
      var courseCode = studentInfo[i].courseCode;
      var grader = studentInfo[i].instructor.firstName;
      var department = studentInfo[i].userAccount.department;
      var studentStatus = studentInfo[i].status;
      var companyForm = studentInfo[i].companyEvaluationForm;
      var studentId = studentInfo[i].id
    

      name.push({
        name: fullName,
        type: studentType,
        class: courseCode,
        grader: grader,
        department: department,
        status: studentStatus,
        form: companyForm,
        id:studentId
      });
    }
    
     console.log("list: ", name);

     this.setState({ studentNameList: name });
  
}

  
  render() {
    const studentNameList = this.state.studentNameList;
    const history = this.props;
    console.log("student list: ", studentNameList);
    return (
      <div className="student-list">
        {console.log("list for students: ", studentNameList)}
        <DisplayList  data={studentNameList} displayFields={['name','class', 'status']} />
      </div>
    );
  }
}

export default StudentList;