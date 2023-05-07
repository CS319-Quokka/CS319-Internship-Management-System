import React, {Component} from 'react'
import '../Styles/Reports.css'
import docpic from '../Images/docdownload.png'

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
    
const currentSubmission = [
    {
        part: "A",
        partstatus: statusOptions[4],
        feedback:"Company has approved the student's training with a grade of 8."
    },
    {
        part: "B",
        partstatus: statusOptions[3],
        feedback:"The report is insufficient in these parts:\n(...) \nPlease revise and resubmit it."
    },
    {
        part: "C",
        partstatus: statusOptions[2],
        feedback:"Waiting for revision."
    }
]
function StatusList(){
    return (
      <ul>
        {currentSubmission.map(status => (
          <li key={status.part}>
            <h2>Part {status.part}</h2>
            <h1>Status: {status.partstatus}</h1>
            <textarea readOnly>{status.feedback}</textarea>
            <hr></hr>
          </li>
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
            prevfilename:"DenizSunReportRevision1.docx",
            prevstatus: "Unsatisfactory. Waiting for revision.",
            prevfeedback: "Your report is insufficient. Try to emphasize your experiences and (...) \n\nUpload a revised version.",
            annotatedfeedback: "DenizSunFeedback1.pdf"

        }
    
        }
    

   render(){
    return (
        <div className='reportspage' >
              <div className="history">
                    <h1><strong>{this.state.firstName} {this.state.lastName}   ( {this.state.userType} ) </strong> </h1>    
                    <h1>Uploaded Reports History</h1>
                    <div className="pastuploads">                           
                        <div className="docpic">
                            <img src={docpic}/>
                            <h3>{this.state.prevfilename}</h3>
                        </div>
                        <div className="prevreport">
                            <h1>The grade distribution of your previous submission:</h1>
                            <br></br>
                       
                            <h4>Overall progress: <br></br> {this.state.prevstatus}</h4>

                        </div>
                        <hr></hr>  
                    </div>
                 
                    <div className="evaluation">
                        <h1>Instructor's overall feedback for this submission</h1>
                        <textarea readOnly>{this.state.prevfeedback}</textarea>
                    </div>
                    
                </div>
            


          
                <div className="reportstatus">
                    <div className="information">
                        <h1>Progress and feedback of your last submitted report for {this.state.course} </h1>                        
                    </div>

                    <div className= "statuslist"> 
                        <hr></hr>
                        <StatusList/>
                    </div>
                    <h2>Instructor's annotated feedback: </h2>
                    <div className="docpic">
                            <img src={docpic}/>
                            <h3>{this.state.annotatedfeedback}</h3>
                    </div>
                    

                
                    
                  
                </div>                  
            </div>


        
    );
   }       
}
export default ReportsStudents;
