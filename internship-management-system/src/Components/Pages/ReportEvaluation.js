import React, {Component, useState, handleChange} from 'react'
import axios from 'axios';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';


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

const downloadAnnotated = () => {
    const link = document.createElement("a");
    //the "download.txt" will be replaced by the link name. (this.state = {annotatedfeedback}) is the file needed. 
    link.download = `annotatedfeed.txt`;
    link.href = "./annotated.txt";
    link.click();
};
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [feedbackId, setFeedbackId] = useState('');


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleFeedbackIdChange = (event) => {
    setFeedbackId(event.target.value);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('studentId', studentId);
    formData.append('feedbackId', feedbackId);
    axios.post('http://localhost:8080/report', formData)
      .then((response) => {
        // Handle success response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
}
{
    /*
     <div>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Student ID" value={studentId} onChange={handleStudentIdChange} />
      <input type="text" placeholder="Feedback ID" value={feedbackId} onChange={handleFeedbackIdChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
    */
}
function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    
  const [isSatisfactory, setIsSatisfactory] = useState(false);

  const handleSatisfactoryClick = () => {
    setIsSatisfactory(false);
  };

  const handleRevisionRequiredClick = () => {
    setIsSatisfactory(true);
  };
  
  
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
            <DialogContentText sx ={{fontWeight: 'bold'}}>
              Entering the grades for {props.studentFirstName} {props.studentLastName}
            </DialogContentText>
    
            <Typography sx ={{fontWeight: 'bold'}}>Part A - Work Place</Typography>
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
      
            <div>
      <Typography sx={{ fontWeight: 'bold' }}>Part B - Report</Typography>
      <Button
        variant={isSatisfactory ? 'outlined' : 'contained'}
        color="success"
        onClick={handleSatisfactoryClick}
        sx={{ marginRight: '10px' }}
      >
        Satisfactory
      </Button>
      <Button
        variant={isSatisfactory ? 'contained' : 'outlined'}
        color="secondary"
        onClick={handleRevisionRequiredClick}
      >
        Revision Required
      </Button>
      {isSatisfactory && (
        <div>
          <Typography>If revision is requested, enter the due date for the resubmission.</Typography>
          <DateComponent />
        </div>
      )}
    </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button  onClick={() => {
          //    <Alert severity="success">Grade form is filled!</Alert>
              handleSubmit();
            }}
            >Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
function DateComponent() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Due Date" />
      </LocalizationProvider>
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

                    <hr></hr>
                    <FormDialog studentFirstName={this.state.studentFirstName} studentLastName={this.state.studentLastName}
                    setButtonClicked={(value) => this.setState({isButtonClicked: value})}/>
                
            </div>
        </div>


    
    );
       
   }
}

export default ReportEvaluation
