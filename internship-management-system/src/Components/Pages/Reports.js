import React, {Component} from 'react'
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
    /*
    {value: 'submitted', label: 'Submitted'},
    {value: 'assigned', label: 'Assigned'},
    {value: 'under_evaluation', label: 'Under Evaluation'},
    {value: 'under_revision', label: 'Under Revision'},
    {value: 'satisfactory', label: 'Satisfactory'},
    {value: 'unsatisfactory', label: 'Unsatisfactory'}
    */

const downloadAnnotated = () => {
    const link = document.createElement("a");
    //the "download.txt" will be replaced by the link name. (this.state = {annotatedFeedback}) is the file needed. 
    link.download = `annotatedfeed.txt`;
    link.href = "./annotated.txt";
    link.click();
};
const downloadPrevious = () => {
    const link = document.createElement("a");
    //the "download.txt" will be replaced by the link name. (this.state = {prevfilename}) is the file needed. 
    link.download = `prevreport.txt`;
    link.href = "./prevreport.txt";
    link.click();
};
const downloadCurrent = () => {
    const link = document.createElement("a");
    //the "download.txt" will be replaced by the link name. (this.state = {prevfilename}) is the file needed.
    link.download = `currentReport.txt`;
    link.href = "./currentReport.txt";
    link.click();
};
const revisionHistory = [
    {
        revisionCount: "1",
        prevFileName: "DenizSunReportRevision1.pdf",
        prevStatus: "Unsatisfactory. Waiting for revision.",
        prevFeedback: "Your report is insufficient. Try to emphasize your experiences and (...) \n\nUpload a revised version.",
        annotatedFeedback: "DenizSunFeedback1.pdf",
        studentComment: "I barely uploaded on time. :) "

    },
    {
        revisionCount: "2",
        prevFileName:"DenizSunReportRevision2.pdf",
        prevStatus: "Unsatisfactory. Waiting for revision.",
        prevFeedback: "Better but fix the format.",
        annotatedFeedback: "DenizSunFeedback2.pdf",
        studentComment: "I hope this is better."

    },
    {
        revisionCount: "3",
        prevFileName: "DenizSunReportRevision3.pdf",
        prevStatus: "Unsatisfactory. Waiting for revision.",
        prevFeedback: "Nice :)",
        annotatedFeedback: "DenizSunFeedback3.pdf",
        studentComment: "I have fixed the format. Please check again."
    }
]


function RevisionList() {
    return (
        <ul>
            {revisionHistory.map(revision => (
                <div className="prevreport">
                    <li key={revision.revisionCount}>
                        <hr></hr>
                        <h2>◾Revision : {revision.revisionCount}</h2>
                        <p>The report you submitted for this revision:</p>
                        <IconButton aria-label="download" onClick={downloadCurrent}>
                            <DownloadIcon/>
                        </IconButton>
                        <Button variant="text" onClick={downloadCurrent} style={{textTransform: 'none'}} size="large">{revision.prevFileName}</Button>

                        <Typography>Your comments:</Typography>
                        <textarea readOnly>{revision.studentComment}</textarea>

                        <b><br></br>◾The grade distribution of this submission◾</b>
                        <br></br>
                        <p>Overall progress: {revision.prevStatus}</p>
                        <b><br></br>Instructor's feedback for this submission</b>
                        <textarea readOnly>{revision.prevFeedback}</textarea>
                        <b>Instructor's annotated feedback for this submission<br></br></b>
                        <IconButton aria-label="download" onClick={downloadAnnotated}>
                            <DownloadIcon/>
                        </IconButton>
                        <Button variant="text" onClick={downloadAnnotated} style={{textTransform: 'none'}} size="large">{revision.annotatedFeedback}</Button>
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
            firstName: "Deniz",
            lastName: "Sun",
            course: "CS299",
            userType: "Student",
            feedbackB:"Good job.",
            annotatedFeedback: "DenizSunFeedback.pdf",
            overallStatus: statusOptions[2],
            partAstatus: statusOptions[4],
            currentReport: "DenizSunReport.pdf"
        }
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
                       <RevisionList/>
                   </div>
                </div>
                <div className="reportstatus">
                    <div className="information">
                        <h1>Progress and feedback of your current report for {this.state.course} </h1>
                    </div>
                    <hr></hr>
                    <b>The report you submitted is: </b>
                    <IconButton onClick={downloadCurrent} aria-label="download">
                        <DownloadIcon />
                    </IconButton>
                    <Button onClick={downloadCurrent} variant="text" style={{textTransform: 'none'}}  size="large">{this.state.currentReport}</Button>

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
                    <IconButton onClick={downloadAnnotated} aria-label="download">
                        <DownloadIcon />
                    </IconButton>
                    <Button onClick={downloadAnnotated} variant="text" style={{textTransform: 'none'}}  size="large">{this.state.annotatedFeedback}</Button>
                </div>                  
            </div>
    );
   }       
}
export default ReportsStudents;
