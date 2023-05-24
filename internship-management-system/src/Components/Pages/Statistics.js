import React, { Component } from 'react';
import '../Styles/Statistics.css';
import {GraderData} from "../GraderData"
import {StudentData} from "../StudentData"
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));
function InstructorList() {
  return (
    <ul>
      {GraderData.map(instructor => (
        <li key={instructor.name}>
          <p>Instructor: {instructor.name}</p>
          <p>Assigned Student Count: {instructor.assigned}</p>
          <p>Graded Reports Status: {instructor.progress}</p>
            <BorderLinearProgress variant="determinate" value={instructor.progress} />
          <hr></hr>
        </li>
      ))}
    </ul>
  );
}
function checkForm (form) {
  if (form === "Uploaded") {
    return "green";
  }
  else if (form === "Not Uploaded") {
    return "red";
  }
  else
      return "black";
}

function StudentList() {
  return (
    <ul>
      {StudentData.map(student => (
        <li key={student.name}>
          <p>Student: {student.name}</p>
          <p>Grader: {student.grader}</p>
          <p>Status: {student.status}</p>
          <p style={{ color: checkForm(student.form) }}>Report:{student.form}</p>

          <hr></hr>
        </li>
      ))}
    </ul>
  );
}
class Statistics extends Component {

  studentParts = [{title: "Part A", value: 127, color: "indigo"},
                  {title: "Part B", value: 54, color: "blue"},
                  {title: "Part C", value: 37, color: "pink"}];

  constructor(props){
    super(props)
    this.state = {
      cef_satisfactory: 127,
      cef_unsatisfactory: 18,
      cef_pending: 45,
      overall_satisfactory: 87,
      overall_unsatisfactory: 34,
      overall_pending: 69,
      value: 80
    };
  }
  render() {
    const {  cef_satisfactory, cef_unsatisfactory, cef_pending,
      overall_satisfactory,       overall_unsatisfactory, overall_pending } = this.state;

    return (
    <div className="statspage">
      <div className="maincontainer">
          <h3>Evaluation Statistics</h3>
        <div className="instructorstatus">
          <h2>Instructor Status</h2>
          <div className="statlist">
            <InstructorList/>
          </div>
          
        </div>
        <div className="studentstatus">
          <h2>Student Status</h2>
          <div className= "statlist">
            <StudentList/>
          </div>
          
        </div>
        <div className="gradestatus">
          <h2>Grading Status</h2>
        
          <div className="gradingprogress">
            <div className="cef">
              <h2>Company Evaluation Forms</h2>
              <br></br>
              <p style={{color: "green"}}>Satisfactory: {this.state.cef_satisfactory} </p>
              <p style={{color: "red"}}>Unsatisfactory: {this.state.cef_unsatisfactory}</p>
              <p>Pending Form: {this.state.cef_pending} </p>
            </div>
           
            <div className="overall">
            <hr></hr>
              <h2>Overall</h2>
              <br></br>
              <p style={{color: "green"}} >Satisfactory: {this.state.overall_satisfactory} </p>
              <p style={{color: "red"}}>Unsatisfactory: {this.state.overall_unsatisfactory}</p>
              <p>Under Evaluation: {this.state.overall_pending} </p>
            </div>
          
           
    
          </div>
       
          {/*
          <PieChart
          animate
          animationDuration={40}
          animationEasing="ease-in"
          center={[50, 50]}
          data={this.studentParts}
          lineWidth={15}
          lengthAngle={360}
          paddingAngle={0}
          radius={50}
          rounded
          startAngle={0}
          viewBoxSize={[200, 200]}
          labelStyle={{
            fontSize: "6px",
            fontColor: "FFFFFA",
            fontWeight: "500",
            fontFamily: "monospace"
          }}
        
          label={(data) => data.dataEntry.title}
          labelPosition={70}
        
        />
        */}
            </div>
        </div>
      </div>
    );
  }
}

export default Statistics;
