import React, {Component, useState, handleChange} from 'react'
import '../Styles/ReportEvaluation.css'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
        compform: "Check student's grade here:" + "DenizSunCompanyEvaluationForm.pdf",
        gradeOutOf: 10
    },
    {
        part: "B",
        partstatus: statusOptions[3],
        feedback:"The report is insufficient in these parts:\n(...) \nPlease revise and resubmit it.", 
        gradeOutOf: 60
    },
    {
        part: "C",
        partstatus: statusOptions[2],
        feedback:"Waiting for revision.",
        gradeOutOf: 60
    }
]
const downloadAnnotated = () => {
    const link = document.createElement("a");
    //the "download.txt" will be replaced by the link name. (this.state = {annotatedfeedback}) is the file needed. 
    link.download = `annotatedfeed.txt`;
    link.href = "./annotated.txt";
    link.click();
};
function StatusList(){
    const [grades, setGrades] = useState({});

  function handleGradeChange(event, part) {
    const newGrades = { ...grades, [part]: parseInt(event.target.value) };
    setGrades(newGrades);
  }
  var gradeOutOf;
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
                /> / {status.gradeOutOf}      </h2>
               
            </div>
           
            <textarea>{status.feedback}</textarea>
            <hr></hr>
          </li>
        ))}
      </ul>
    );
}
function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
      props.setButtonClicked(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      props.setButtonClicked(false);
    };
    const handleSubmit = () => {
        setOpen(false);
    }
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open Grade Form
        </Button>
        <Dialog fullWidth= "md" open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Entering the grades for {props.studentFirstName} {props.studentLastName}
            </DialogContentText>
    
            <Typography>Part A</Typography>
            <Typography>Company Evaluation Form Grade</Typography>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="CEF"
            type="number"
            variant="standard"
            inputProps={{
            min: 0,
            max: 10,
            align: 'right',
            style: { width: '5ch' },
            }}
            />
            <Typography>Is the work done related to computer engineering?</Typography>
            <Button variant="outlined" color="success"> Yes </Button>
            <Button variant="outlined" color="error"> No </Button>

            <Typography>Is the supervisor a computer engineer or has a similar engineering background?</Typography>
            <Button variant="outlined" color="success"> Yes </Button>
            <Button variant="outlined" color="error"> No </Button>
            <TextField 
             autoFocus
             margin="dense"
             id="name"
             label="Email Address"
             type="email"
             fullWidth
             variant="standard"
             />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
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
            isButtonClicked: false,

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
                    <IconButton onClick={downloadAnnotated} aria-label="download">
                        <DownloadIcon />
                    </IconButton>
                    <Button onClick={downloadAnnotated} variant="text" style={{textTransform: 'none'}}  size="large">{this.state.prevfilename}</Button>
                                                  
                    <div className="prevreport">
                        <h1>Previous Submission Grades</h1>
                        <br></br>
                        <h4>Part A: {this.state.prevGradeA}</h4>
                        <h4>Part B: {this.state.prevGradeB}</h4>
                      
                        <hr></hr>
                        <h4>Overall progress: <br></br> {this.state.prevstatus}</h4>

                    </div>
                
                </div>
                <hr></hr>  
                <div className="evaluation">
                    <h1>Your overall feedback for this submission</h1>
                    <textarea readOnly>{this.state.prevfeedback}</textarea>
                </div>
                
            </div>
            
            <div className="annotatedupload">
                <h2>Upload your annotated feedback here: </h2>
                <FileUploadIcon/>
                <Button variant="contained" component="label" >
                    Upload File
                    <input type="file" hidden />
                </Button>
         
      
            </div>

        
            <div className="reportstatus">
                <div className="information">
                    <h1>The student's current submission for {this.state.course} </h1>                        
                </div>

                <div className= "statuslist"> 
                    <hr></hr>
                    <FormDialog studentFirstName={this.state.studentFirstName} studentLastName={this.state.studentLastName}
                    setButtonClicked={(value) => this.setState({isButtonClicked: value})}/>
                 {  /* <StatusList/> */}
                </div>
                
            </div>                  
        </div>


    
    );
   }       
}

export default ReportEvaluation
