import React, {Component} from 'react'
import '../Styles/Reports.css'
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

class ReportsStudents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "Deniz",
            lastName: "Sun",
            course: "CS299",
            userType: "Student",
            feedbackB:"The report is insufficient in these parts:\n(...) \nPlease revise and resubmit it.",
            prevfilename:"DenizSunReportRevision1.docx",
            prevstatus: "Unsatisfactory. Waiting for revision.",
            prevfeedback: "Your report is insufficient. Try to emphasize your experiences and (...) \n\nUpload a revised version.",
            annotatedfeedback: "DenizSunFeedback1.pdf",
            overallstatus: statusOptions[2],
            partAstatus: statusOptions[4]
            

        }
    
        }
    

   render(){
    return (
        <div className='reportspage' >
              <div className="history">
                    <h1><strong>{this.state.firstName} {this.state.lastName}   ( {this.state.userType} ) </strong> </h1>    
                    <h1>Uploaded Reports History</h1>
                    <div className="pastuploads">                           
                        
                        <IconButton aria-label="download" onClick={downloadPrevious}>
                            <DownloadIcon/>
                        </IconButton>
                            <Button variant="text" onClick={downloadPrevious} style={{textTransform: 'none'}} size="large">{this.state.prevfilename}</Button>

                      
                        <div className="prevreport">
                            <h1>The grade distribution of the previous submission</h1>
                            <br></br>
                            <h2>Overall progress: <br></br> {this.state.prevstatus}</h2>

                        </div>
                        <hr></hr>  
                    </div>
                 
                    <div className="evaluation">
                        <h1>Instructor's overall feedback for the previous submission</h1>
                        <textarea readOnly>{this.state.prevfeedback}</textarea>
                    </div>
                    
                </div>
            


          
                <div className="reportstatus">
                    <div className="information">
                        <h1>Progress and feedback of your current report for {this.state.course} </h1>
                                             
                    </div>
                    <hr></hr>   
                    <h2>Part A</h2>
                    <h2 >Status: {this.state.partAstatus}</h2>

                    <hr></hr>  
                    <h2>Part B</h2>
                    <h2>Feedback on your report: </h2>
                    <textarea readOnly>{this.state.feedbackB}</textarea>


                    
                    <hr></hr>
                    
                   <h2>Part C</h2> 
                   <h2>Overall Status: {this.state.overallstatus}</h2>
                   
                    <h2>Instructor's annotated feedback: </h2>
                 
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
