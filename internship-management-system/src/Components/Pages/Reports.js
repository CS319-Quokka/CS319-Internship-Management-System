import React, {Component, useState, useEffect} from 'react'
import axios from 'axios';
import '../Styles/Reports.css'
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {AnnouncementData} from "../NotificationData";

const statusOptions = ["Submitted", 
                       "Assigned to Grader",
                       "Under Evaluation", 
                       "Revision Required",
                       "Satisfactory", 
                       "Unsatisfactory",
                       "Pending Company Approval"                    ]


function RevisionList(props) {

    const [reportHistory,setReportHistory] = useState([])
    const [studentId,setStudentId] = useState(null);


    const downloadPrevious = (fileData, fileName) => {
        return () => {
          const binaryString = window.atob(fileData);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes.buffer]);
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      };

      const getAllReports = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/report/students_all_reports/${studentId}`);
          const info = response.data;
      
          const response2 = await axios.get(`http://localhost:8080/report/file/active/${studentId}`);
          const info2 = response2.data;
      
          const reportIdList = info.slice(0, -1).map((report) => report.id);
          const allReports = await Promise.all(reportIdList.map((id, index) => getReportFile(id, index)));
      
          setReportHistory(allReports);
        } catch (error) {
          console.log(error);
        }
      };
      
      const getReportFile = async (id, index) => {
        try {
          const response = await axios.get(`http://localhost:8080/report/file/${id}`);
          const reportFile = response.data;
      
          const feedback = await getFeedbackFile(id);
      
          return {
            revisionCount: index + 1,
            fileName: reportFile.fileName,
            description: reportFile.reportDescription,
            fileData: reportFile.fileData,
            feedbackData: feedback && feedback.fileData ? feedback.fileData : null,
            feedbackName: feedback && feedback.fileName ? feedback.fileName : null,
          };
        } catch (error) {
          console.error("Failed to fetch report file: ", error);
          return null;
        }
      };
      
      
      const getFeedbackFile = async (id) => {
        try {
          const response = await axios.get(`http://localhost:8080/feedback/get_feedback_by_report/${id}`);
          const feedbackFile = response.data;
      
      
          return feedbackFile;
        } catch (error) {
          console.error("Failed to fetch feedback file: ", error);
          throw error;
        }
      };
      

      const downloadAnnotated = (fileData,fileName) => {
        return () => {
      
          const binaryString = window.atob(fileData);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes.buffer]);
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      }

 

      useEffect(() => {
        const fetchData = async () => {
          try {
            const studentResponse = await axios.get(`http://localhost:8080/get_all_users/${props.id}`);
            const studentInfo = studentResponse.data[0].id;
            setStudentId(studentInfo);
          } catch (error) {
            console.error("Failed to fetch student data: ", error);
          }
        };
      
        fetchData();
      }, [props.id]);
      
      
      useEffect(() => {
        if (studentId) {
          getAllReports();
        }
      }, [studentId]);
      
   
      return (
        <ul>
          {reportHistory.map((revision) => (
            <div className="prevreport" key={revision.revisionCount}>
              <li>
                <hr />
                <h2>◾Revision: {revision.revisionCount}</h2>
                <p>The report you submitted for this revision:</p>
                <IconButton
                  aria-label="download"
                  onClick={
                    downloadPrevious(revision.fileData, revision.fileName)
                  }
                >
                  <DownloadIcon />
                </IconButton>
                <Button
                  variant="text"
                  onClick={
                    downloadPrevious(revision.fileData, revision.fileName)
                  }
                  style={{ textTransform: "none" }}
                  size="large"
                >
                  {revision.fileName}
                </Button>
      
                <Typography>Your comments:</Typography>
                <textarea readOnly>{revision.description}</textarea>
      
                <b>
                  <br />
                  ◾The grade distribution of this submission◾
                </b>
                <br />
                <p>Overall progress:</p>
                <b>
                  <br />
                  Instructor's feedback for this submission
                </b>
                <textarea readOnly>{/* Add instructor feedback here */}</textarea>
                <b>Instructor's annotated feedback for this submission</b>
                <IconButton
                  aria-label="download"
                  onClick={
                    downloadAnnotated(revision.feedbackData, revision.feedbackName)
                  }
                >
                  <DownloadIcon />
                </IconButton>
                <Button
                  variant="text"
                  onClick={
                    downloadAnnotated(revision.feedbackData, revision.feedbackName)
                  }
                  style={{ textTransform: "none" }}
                  size="large"
                >
                  {revision.feedbackName}
                </Button>
              </li>
            </div>
          ))}
        </ul>
      );
}      

class ReportsStudents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            course: "",
            userType: "",
            feedbackB:".",
            annotatedFeedback: "",
            overallStatus: statusOptions[2],
            partAstatus: statusOptions[4],
            currentReport: "",
            currentComment: "",
            fileData:null,
            reportId:null,
            studentId:null

        }
    }

    componentDidMount() {
      const fetchData = async () => {
        try {
          const id1 = this.props.userId; 
          const accountResponse = await axios.get(`http://localhost:8080/account/get_account/${id1}`);
          const userAccount = accountResponse.data;
    
          console.log("inst:", userAccount);
    
          const response = await axios.get(`http://localhost:8080/get_all_users/${id1}`);
          const info = response.data[0];
    
          const id = info.id;


          this.setState({
            firstName: userAccount.firstName,
            lastName: userAccount.lastName,
            userType: info.role,
            course: info.courseCode,

          })
    
          this.setState({ studentId: id });
          this.getActiveReport(id);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
    }
    

    
    
    getActiveReport = async (id) => {
      try {
       
        const response2 = await axios.get(`http://localhost:8080/report/file/active/${id}`);
        const info2 = response2.data;

        const feedback = await this.getFeedbackFile(info2.reportId);
        this.setState({
          currentReport: info2.fileName,
          currentComment: info2.reportDescription,
          fileData:info2.fileData,
          reportId:info2.reportId,
          feedbackData: feedback && feedback.fileData ? feedback.fileData : null,
          feedbackName: feedback && feedback.fileName ? feedback.fileName : null,
        });
  
    
      } catch (error) {
        console.log(error);
      }
    };
    getFeedbackFile = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/feedback/get_feedback_by_report/${id}`);
        const feedbackFile = response.data;
    
    
        return feedbackFile;
      } catch (error) {
        console.error("Failed to fetch feedback file: ", error);
        throw error;
      }
    };

    downloadCurrent = () =>{

      const fileData = this.state.fileData
      const fileName = this.state.currentReport
  
      if (typeof fileData !== "string" || !(/^[A-Za-z0-9+/=]*$/g.test(fileData))) {
        console.error("Invalid base64 string");
        return;
      }
    
      const byteCharacters = atob(fileData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // Use the right file extension here
      document.body.appendChild(link);
      link.click();
      
    }

    downloadAnnotated= () =>{

      const fileData = this.state.feedbackData
      const fileName = this.state.feedbackName
  
      if (typeof fileData !== "string" || !(/^[A-Za-z0-9+/=]*$/g.test(fileData))) {
        console.error("Invalid base64 string");
        return;
      }
    
      const byteCharacters = atob(fileData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // Use the right file extension here
      document.body.appendChild(link);
      link.click();
      
    }
    
   render(){
    return (
        
        <div className='reportspage' >
              <div className="history">
                  <div className="information">
                      <h1><strong>{this.state.firstName} {this.state.lastName}   ( {this.state.userType} ) </strong> </h1>
                      <hr></hr>
                  </div>

                   <div className="prevlist">
                       <h1>Uploaded Reports History</h1>
                       <RevisionList id = {this.props.userId}/>
                   </div>
                </div>
                <div className="reportstatus">
                    <div className="information">
                        <h1>Progress and feedback of your current report for {this.state.course} </h1>
                    </div>
                    <hr></hr>
                    <b>The report you submitted is: </b>
                    <IconButton onClick={() => this.downloadCurrent()} aria-label="download">
                        <DownloadIcon />
                    </IconButton>
                    <Button onClick={() => this.downloadCurrent()} variant="text" style={{textTransform: 'none'}}  size="large">{this.state.currentReport}</Button>

                    <hr></hr>   
                    <b>Part A ~ Work Place</b>
                    <p >Status: {this.state.partAstatus}</p>
                    <hr></hr>  
                    <b>Part B ~ Report</b>
                    <p>Feedback on your report: </p>
                    <textarea readOnly>{this.state.feedbackB}</textarea>
                    <hr></hr>
                   <b>Part C ~ Final version of the report</b>
                   <p>Overall Status: {this.state.overallStatus} </p>
                    <b><br></br>Instructor's annotated feedback</b>
                    <br></br>
                    <IconButton onClick={() => this.downloadAnnotated()} aria-label="download">
                        <DownloadIcon />
                    </IconButton>
                    <Button onClick={() => this.downloadAnnotated()} variant="text" style={{textTransform: 'none'}}  size="large">{this.state.feedbackName}</Button>
                </div>                  
            </div>
    );
   }       
}
export default ReportsStudents;
