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
    //the "download.txt" will be replaced by the link name. (this.state = {annotatedfeedback}) is the file needed. 
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
const revisionHistory = [
    {
        revisionCount: "1",
        prevfilename: "DenizSunReportRevision1.pdf",
        prevstatus: "Unsatisfactory. Waiting for revision.",
        prevfeedback: "Your report is insufficient. Try to emphasize your experiences and (...) \n\nUpload a revised version.",
        annotatedfeedback: "DenizSunFeedback1.pdf",

    },
    {
        revisionCount: "2",
        prevfilename:"DenizSunReportRevision2.pdf",
        prevstatus: "Unsatisfactory. Waiting for revision.",
        prevfeedback: "Better but fix the format.",
        annotatedfeedback: "DenizSunFeedback2.pdf",

    },
    {
        revisionCount: "3",
        prevfilename:"DenizSunReportRevision3.pdf",
        prevstatus: "Unsatisfactory. Waiting for revision.",
        prevfeedback: "Nice :)",
        annotatedfeedback: "DenizSunFeedback3.pdf"

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
                        <IconButton aria-label="download" onClick={downloadPrevious}>
                            <DownloadIcon/>
                        </IconButton>
                        <Button variant="text" onClick={downloadPrevious} style={{textTransform: 'none'}} size="large">{revision.prevfilename}</Button>

                        <b><br></br>◾The grade distribution of this submission◾</b>
                        <br></br>
                        <p>Overall progress: {revision.prevstatus}</p>
                        <b><br></br>Instructor's feedback for this submission</b>
                        <textarea readOnly>{revision.prevfeedback}</textarea>
                        <b>Instructor's annotated feedback for this submission<br></br></b>
                        <IconButton aria-label="download" onClick={downloadAnnotated}>
                            <DownloadIcon/>
                        </IconButton>
                        <Button variant="text" onClick={downloadAnnotated} style={{textTransform: 'none'}} size="large">{revision.annotatedfeedback}</Button>

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
            feedbackB:"The report is insufficient in these parts:\n(...) \nPlease revise and resubmit it.",
            annotatedfeedback: "DenizSunFeedback.pdf",
            overallstatus: statusOptions[2],
            partAstatus: statusOptions[4],
            

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
                    <b>Part A ~ Work Place</b>
                    <p >Status: {this.state.partAstatus}</p>
                    <hr></hr>  
                    <b>Part B ~ Report</b>
                    <p>Feedback on your report: </p>
                    <textarea readOnly>{this.state.feedbackB}</textarea>
                    <hr></hr>
                   <b>Part C ~ Final version of the report</b>
                   <p>Overall Status: {this.state.overallstatus} </p>
                    <b><br></br>Instructor's annotated feedback</b>
                    <br></br>
                    <IconButton onClick={downloadAnnotated} aria-label="download">
                        <DownloadIcon />
                    </IconButton>
                    <Button onClick={downloadAnnotated} variant="text" style={{textTransform: 'none'}}  size="large">{this.state.annotatedfeedback}</Button>
                </div>                  
            </div>
    );
   }       
}
export default ReportsStudents;
