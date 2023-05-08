import React, {Component, useState, handleChange} from 'react'
import '../Styles/ReportEvaluation.css'
import docpic from '../Images/docdownload.png'

const statusOptions = ["Submitted", 
                       "Assigned to Grader",
                       "Under Evaluation", 
                       "Revision Required",
                       "Satisfactory", 
                       "Unsatisfactory",
                       "Pending Company Form Approval",
                                                           ]
    /*
    {value: 'submitted', label: 'Submitted'},
    {value: 'assigned', label: 'Assigned'},
    {value: 'under_evaluation', label: 'Under Evaluation'},
    {value: 'under_revision', label: 'Under Revision'},
    {value: 'satisfactory', label: 'Satisfactory'},
    {value: 'unsatisfactory', label: 'Unsatisfactory'}
    */



    {/** feedback textbox is editable. will be sent to the database*/}
const currentSubmission = [
    {
        part: "A",
        partstatus: statusOptions[6],
        feedback:"Company has approved the student's training with a grade of 8.",
        compform: "Check student's grade here:" + "DenizSunCompanyEvaluationForm.pdf"
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
    const [grades, setGrades] = useState({});

  function handleGradeChange(event, part) {
    const newGrades = { ...grades, [part]: parseInt(event.target.value) };
    setGrades(newGrades);
  }
    return (
      <ul>
        {currentSubmission.map(status => (
          <li key={status.part}>
            <h2>Part {status.part}</h2>
            <h2>Status: {status.partstatus}</h2>
            <p>{status.compform}</p>
            <div className="gradeentry">
                <h2>Enter Grade:  <input type="number" value={grades[status.part] || ''}
                onChange={event => handleGradeChange(event, status.part)}
                /> /10</h2>
               
            </div>
           
            <textarea>{status.feedback}</textarea>
            <hr></hr>
          </li>
        ))}
      </ul>
    );
}
class ReportEvaluation extends Component {
    
    constructor(props) {
        
        super(props)
        this.state = {
            studentFirstName: "Deniz",
            studentLastName: "Sun",
            course: "CS299",
            userType: "Student",
            prevGradeA: statusOptions[4],
            prevGradeB: "17",
            prevGradeC: "22",
            prevfilename:"DenizSunReportRevision1.docx",
            prevstatus: "Unsatisfactory. Waiting for revision.",
            prevfeedback: "Your report is insufficient. Try to emphasize your experiences and (...) \n\nUpload a revised version.",
            annotatedfeedback: "DenizSunFeedback1.pdf"

        }    
     
    }
    
    

   render(){
    return (
        <div className='reportevaluation' >
              <div className="history">
                <div className="information">
                    <h1>Viewing the submission history of: {this.state.studentFirstName} {this.state.studentLastName} </h1>    
                </div>
                <div className="pastuploads">                           
                    <div className="docpic">
                        <img src={docpic}/>
                        <h3>{this.state.prevfilename}</h3>
                    </div>
                    <div className="prevreport">
                        <h1>The grade distribution of the previous submission:</h1>
                        <br></br>
                        <h4>Grade for Part A: {this.state.prevGradeA}</h4>
                        <h4>Grade for Part B: {this.state.prevGradeB}/60</h4>
                        <h4>Grade for Part C: {this.state.prevGradeC}/60</h4>
                        <hr></hr>
                        <h4>Overall progress: <br></br> {this.state.prevstatus}</h4>

                    </div>
                    <hr></hr>  
                </div>
                
                <div className="evaluation">
                    <h1>Your overall feedback for this submission</h1>
                    <textarea readOnly>{this.state.prevfeedback}</textarea>
                </div>
                
            </div>
            
            <div className="annotatedupload">
                <h2>Upload your annotated feedback here: </h2>
                <div className="docpic">
                    <img src={docpic}/>
                    <h3>{this.state.annotatedfeedback}</h3>
                </div>
                       
            </div>

        
            <div className="reportstatus">
                <div className="information">
                    <h1>The student's current submisison for {this.state.course} </h1>                        
                </div>

                <div className= "statuslist"> 
                    <hr></hr>
                    <StatusList/>
                </div>
                
            </div>                  
        </div>


    
    );
   }       
}

export default ReportEvaluation
