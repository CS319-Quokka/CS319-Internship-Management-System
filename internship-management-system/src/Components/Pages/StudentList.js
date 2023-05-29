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
        studentNameList:[],
        linkName: ""
    }
  }
    componentDidMount() {
        this.getAllStudents();
    }
    getDeadline = async (studentId) => {
      try {
        const response = await axios.get(`http://localhost:8080/report/deadline/active/${studentId}`);
        const deadline = response.data.deadline; // Or response.data if the returned deadline is direct.
        console.log("Deadline:", deadline);
        return deadline;
      } catch (error) {
        console.error(error);
        return null; // return null or any default value when an error occurred
      }
    };
    
    getAllStudents = async () =>{

        const id = this.props.userId;

        const response = await axios.get(`http://localhost:8080/get_all_users/${id}`);

        const info = response.data[0]

        const response2 = await axios.get(`http://localhost:8080/student?instructorId=${info.id}`);

        const studentInfo = response2.data;
         var name = [];

         for (var i = 0; i < studentInfo.length; i++) {

          var fullName = studentInfo[i].userAccount.firstName + " " + studentInfo[i].userAccount.lastName;
          var studentType = studentInfo[i].role;
          var courseCode = studentInfo[i].courseCode;
          var grader = studentInfo[i].instructor.firstName;
          var department = studentInfo[i].userAccount.department;
          var studentStatus = studentInfo[i].status;
          var companyForm = studentInfo[i].companyEvaluationForm;
          var studentId = studentInfo[i].id
          var deadline = "";
          let readableDeadline = "Not Applicable"


          try {
            const deadlineResponse = await this.getDeadline(studentId);
            
            if(deadlineResponse != null && (studentStatus ==  "Waiting to upload report") ){
              let deadline = new Date(deadlineResponse);
              readableDeadline = deadline.toLocaleString();

            }
            
          
          } catch(error) {
            console.error('Failed to fetch data for deadline: ', error);
          }
          


          name.push({
            name: fullName,
            type: studentType,
            class: courseCode,
            grader: grader,
            department: department,
            status: studentStatus,
            form: companyForm,
            id:studentId,
            deadline:readableDeadline
          });
        }


         if (info.role === "Teaching Assistant") {
             this.setState({ linkName: "/teachingassistantfeedback"});
         }
         else if (info.role === "Instructor") {
             this.setState({linkName: "/evaluation"});
         }
         this.setState({ studentNameList: name });
    }

  
  render() {
    const studentNameList = this.state.studentNameList;
    const history = this.props;
    return (
      <div className="student-list">
        <DisplayList link = {this.state.linkName}  data={studentNameList} displayFields={['name','class', 'status', 'deadline']} />
      </div>
    );
  }
}

export default StudentList;