import React, {Component} from 'react'
import '../Styles/Reports.css'
import docpic from '../Styles/docpic.png'

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


class ReportsStudents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "Deniz",
            lastName: "Sun",
            course: "CS299",
            userType: "Student",
            statusA: statusOptions[4],
            statusB: statusOptions[3],
            statusC: statusOptions[2],
            feedbackA:"Company has approved the student's training with a grade of 8.",
            feedbackB:"The report is insufficient in these parts:\n(...) \nPlease revise and resubmit it.",
            feedbackC:"Waiting for revision.",
            gradeA: 8,
            gradeB: '-',
            gradeC: '-',
            prevfilename:"DenizSunReportRevision1.docx",
            prevgradeA: 7,
            prevgradeB: 9,
            prevgradeC: '?',
            prevstatus: "Unsatisfactory. Waiting for revision.",
            prevfeedback: "Your report is insufficient. Try to emphasize your experiences and (...) \n\nUpload a revised version."


        }
    
        }
    

   render(){
    return (
        <div className='reports' >
            <div class="splitscreen">   
                <div class="leftside">
                    <div class="history">
                        <h1><strong>{this.state.firstName} {this.state.lastName}   ( {this.state.userType} ) </strong> </h1>    
                        <h2>Uploaded Reports History</h2>
                        <div class="pastuploads">                           
                            <div className="docpic">
                                <img src={docpic}/>
                                <h3>{this.state.prevfilename}</h3>
                            </div>
                            <div className="prevreport">
                                <h1>The grade distribution of your previous submission:</h1>
                                <br></br>
                                <h4>Grade for Part A: {this.state.prevgradeA}/10</h4>
                                <h4>Grade for Part B: {this.state.prevgradeB}/60</h4>
                                <h4>Grade for Part C: {this.state.prevgradeC}/10</h4>
                                <br></br>
                                <h4>Overall progress: <br></br> {this.state.prevstatus}</h4>


                            </div>
                        </div>
                        <hr></hr>    
                        <div class="evaluation">
                            <h4>Instructor's overall feedback for this submission</h4>
                            <textarea readOnly>{this.state.prevfeedback}</textarea>
                        </div>
                        
                    </div>
                </div>


                <div class="rightside">
                    <div class="reportstatus">
                        <div class="information">
                         
                            <h1>Progress and feedback of your last submitted report for {this.state.course} </h1>
                            <p class="value"></p>
                        </div>
                        <hr></hr>    
                        <div class="parts">
                            <h2>Part A</h2>
                            <h1>Status: {this.state.statusA}<h3>Grade: {this.state.gradeA}/10</h3></h1>
                            <textarea readOnly>{this.state.feedbackA}</textarea>
                        </div>
                        <hr></hr>    
                        <div class="parts">
                            <h2>Part B</h2>
                            <h1>Status: {this.state.statusB}<h3>Grade: {this.state.gradeB}/60</h3></h1>
                            <textarea readOnly>{this.state.feedbackB}</textarea>
                       
                        </div>
                        <hr></hr>    
                        <div class="parts">
                            <h2>Part C</h2>
                            <h1>Status: {this.state.statusC}<h3>Grade: {this.state.gradeC}/10</h3></h1>
                            <textarea readOnly>{this.state.feedbackC}</textarea>
                        </div>
                    </div>                  
                </div>
            </div>
        </div>
       

        
    );
   }       
}
export default ReportsStudents;
