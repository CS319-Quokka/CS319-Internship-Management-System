import React, {Component, useState, handleChange, useEffect} from 'react'
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
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';




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
                        <h2>Revision : {revision.revisionCount}</h2>
                        <p>The student's submission for this revision:</p>
                        <IconButton aria-label="download" onClick={downloadPrevious}>
                            <DownloadIcon/>
                        </IconButton>
                        <Button variant="text" onClick={downloadPrevious} style={{textTransform: 'none'}} size="large">{revision.prevfilename}</Button>

                        <b><br></br>◾The grade distribution of this submission◾</b>
                        <br></br>
                        <p>Overall progress: {revision.prevstatus}</p>
                        <b><br></br>Your feedback for this submission</b>
                        <textarea readOnly>{revision.prevfeedback}</textarea>
                        <b>Your annotated feedback for this submission<br></br></b>
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

const downloadPrevious = () => {
    const link = document.createElement("a");
    //the "download.txt" will be replaced by the link name. (this.state = {prevfilename}) is the file needed.
    link.download = `prevreport.txt`;
    link.href = "./prevreport.txt";
    link.click();
};

const downloadAnnotated = () => {
    const link = document.createElement("a");
    //the "download.txt" will be replaced by the link name. (this.state = {annotatedfeedback}) is the file needed. 
    link.download = `${this.state.studentFirstName}${this.state.studentLastName}AnnotatedFeedback.txt`;
    link.href = "./annotated.txt";
    link.click();
};
const downloadCEF = () => {
    const link = document.createElement("a");
    link.download = `companyevaluationform.txt`;
    link.href = "./companyevaluationform.txt";
    link.click();
}
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
    formData.append('studentId', studentId);
    formData.append('fileData', selectedFile);
    formData.append('feedbackDescription', "asd");
    formData.append('feedbackId', feedbackId);
    axios.post("http://localhost:8080/feedback/file",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })  //????
      .then((response) => {
        console.log("success");
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
}
function TextareaValidator() {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <FormControl>
      <FormLabel>Feedback comments</FormLabel>
      <Textarea
        placeholder="Type your feedback comments here..."
        minRows={3}
        endDecorator={
        <Box
          sx={{
            display: 'flex',
            gap: 'var(--Textarea-paddingBlock)',
            pt: 'var(--Textarea-paddingBlock)',
            borderTop: '1px solid',
            borderColor: 'divider',
            flex: 'auto',
          }}
        >
          <IconButton
            variant="plain"
            color="neutral"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <FormatBold />
            <KeyboardArrowDown fontSize="md" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            size="sm"
            placement="bottom-start"
            sx={{ '--ListItemDecorator-size': '24px' }}
          >
            {['200', 'normal', 'bold'].map((weight) => (
              <MenuItem
                key={weight}
                selected={fontWeight === weight}
                onClick={() => {
                  setFontWeight(weight);
                  setAnchorEl(null);
                }}
                sx={{ fontWeight: weight }}
              >
                <ListItemDecorator>
                  {fontWeight === weight && <Check fontSize="sm" />}
                </ListItemDecorator>
                {weight === '200' ? 'lighter' : weight}
              </MenuItem>
            ))}
          </Menu>
          <IconButton
            variant={italic ? 'soft' : 'plain'}
            color={italic ? 'primary' : 'neutral'}
            aria-pressed={italic}
            onClick={() => setItalic((bool) => !bool)}
          >
            <FormatItalic />
          </IconButton>
          <Button sx={{ ml: 'auto' }}>Send</Button>
        </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? 'italic' : 'initial',
        }}
      />
    </FormControl>
  );
}
function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [buttonName,setButtonName] = useState("");
    
  const [isSatisfactory, setIsSatisfactory] = useState(false);

  useEffect(() => {
    const getInformation = async () => {
      const studentId = 3;
      try {
        const response = await axios.get(`http://localhost:8080/report/students_all_reports/${studentId}`);
        console.log("reports:", response.data.length);

        const numOfReport = response.data.length;
        if(numOfReport == 0){
          setButtonName("Create Submission")
        }

        else{
          setButtonName("Revision Required")
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    getInformation();
  }, []);


  const handleSatisfactoryClick = () => {
    setIsSatisfactory(false);
  };

  const handleRevisionRequiredClick = () => {
    setIsSatisfactory(true);
  };
  const handleIsClicked = () => {
      setIsClicked(true);
  }
  
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
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Grade Form</DialogTitle>
        <DialogContentText sx ={{fontWeight: 'bold'}}>
            Entering the grades for {props.studentFirstName} {props.studentLastName}
        </DialogContentText>
        <DialogContent>
        
          <Typography sx ={{fontWeight: 'bold'}}>Part A - Work Place</Typography>
          <Typography>Company Evaluation Form Grade</Typography>
          <TextField
          required
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
          <hr></hr>
          <Typography sx={{ fontWeight: 'bold' }}>Part B - Report</Typography>
          <Button
            variant={isSatisfactory ? 'outlined' : 'contained'}
            color="success"
            onClick={handleSatisfactoryClick}
            sx={{ marginRight: '10px' }}
          > Satisfactory </Button>
          <Button
            variant={isSatisfactory ? 'contained' : 'outlined'}
            color="secondary"
            onClick={handleRevisionRequiredClick}
          > {buttonName}</Button>
          {isSatisfactory && (
            <div>
              <Typography>Enter the due date for the resubmission.</Typography>
              <DateComponent />
            </div>
          )}
          <hr></hr>
          <Typography sx={{ fontWeight: 'bold' }}>Part C - Final version of the report</Typography>
          <Typography>Assessment score of Evaluation of the Work </Typography>
          <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="score"
          type="number"
          variant="standard"
          inputProps={{
          min: 0,
          max: 10,
          align: 'right',
          style: { width: '6ch' },
          }}
          />
          <Typography>Sum of the assessment scores of Evaluation of the Work </Typography>
          <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="score"
          type="number"
          variant="standard"
          inputProps={{
          min: 0,
          max: 60,
          align: 'right',
          style: { width: '6ch' },
          }}
          />
          <Typography>The assessment score of Evaluation of the report  </Typography>
          <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="score"
          type="number"
          variant="standard"
          inputProps={{
          min: 0,
          max: 10,
          align: 'right',
          style: { width: '6ch' },
          }}
          />

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
            prevGradeA: statusOptions[4],
            prevGradeB: statusOptions[4],
            isButtonClicked: false,
        }
    }
   render(){
    return (
        <div className='reportevaluation' >
              <div className="history">
                  <div className="information">
                      <h1>Viewing the submission history of: {this.state.studentFirstName} {this.state.studentLastName} </h1>
                        <hr></hr>
                  </div>
                  <div className="prevlist">
                      <h1>Previous Revisions</h1>
                      <RevisionList/>
                  </div>
              </div>
              <hr></hr>
            <div className="reportstatus">
                <div className="information">
                    <h1>The student's current submission for {this.state.course} </h1>
                    <br></br>
                    <hr></hr>
                </div>
                    <Typography>{
                        <Button onClick={downloadCEF} variant="text" style={{textTransform: 'none'}}  size="large">Click here</Button>
                      } 
                      to download the student's company evaluation form.</Typography>  
                    <br></br>
                    <Typography>To enter the student's grades, use the Grade Form</Typography>
                    <FormDialog studentFirstName={this.state.studentFirstName} studentLastName={this.state.studentLastName}
                    setButtonClicked={(value) => this.setState({isButtonClicked: value})}/>
                <div className="texteditor">
                  <TextareaValidator/>
                </div>
                <div className="annotatedupload">
                    <h2>Upload annotated feedback here: </h2>
                      <FileUploadIcon/>
                    <Button variant="contained" component="label" >
                        Upload File
                        <input type="file" hidden />
                    </Button>
                </div>
            </div>
        </div>
    );
       
   }
}

export default ReportEvaluation
