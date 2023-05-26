import React, {Component, useState, handleChange, useEffect,  useContext } from 'react'
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
import { useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext';




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
        prevFileName:"DenizSunReportRevision3.pdf",
        prevStatus: "Unsatisfactory. Waiting for revision.",
        prevFeedback: "Nice :)",
        annotatedFeedback: "DenizSunFeedback3.pdf",
        studentComment: "I have fixed the format. Please check again."

    }
]



function RevisionList() {

const [studentId, setStudentId] = useState('');
const location = useLocation();
const [link,setLink] = useState("");
const [links,setLinks] = useState([]);
const [reportFile,setReportFile] = useState(null)
const [reportHistory,setReportHistory] = useState([])
const [feedbackHistory,setFeedbackHistory] = useState([])
const userContext = useContext(UserContext);


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



useEffect(() => {
  console.log("BUNUN IDSI: ",userContext.userId)
  setStudentId(userContext.userId);
}, [userContext.userId]);

useEffect(() => {
  if (studentId) {
    getAllReports();
  }
}, [studentId]);



const createDownloadUrl = (fileData,fileName) =>{
  // Create a Blob object from the file data

  console.log("HERE DOWNLOAD")
  const blob = new Blob([fileData]);

  // Create a URL for the blob object
  const url = URL.createObjectURL(blob);

   // Create a temporary link element
   const newLink = document.createElement('a');
   newLink.href = url;
   newLink.download = fileName;

   console.log("here:",newLink)
   setLink(newLink)
   links.push(newLink)

}

const getReportFile = async (id, reports,index) => {
  try {

    const response = await axios.get(`http://localhost:8080/report/file/${id}`);
    const reportFile = response.data;

    

    reports.push({
      revisionCount:index +1,
      fileName: reportFile.fileName,
      description:reportFile.reportDescription,
      fileData:reportFile.fileData
    });

    // Call the downloadCurrent function with the file data and name
    createDownloadUrl(reportFile.fileData, reportFile.fileName);
    console.log("linko:",link)
    links.push(link)
  } catch (error) {
    console.error("Failed to fetch report file: ", error);
  }
    
};

const getFeedbackFile = async (id, feedbacks) => {
  try {

    const response = await axios.get(`http://localhost:8080/feedback/get_feedback_by_report/${id}`);
    const feedbackFile = response.data;
    
    console.log("feedback data:", feedbackFile)

    feedbacks.push({
      fileName: feedbackFile.fileName,
      description:feedbackFile.reportDescription,
      fileData:feedbackFile.fileData
    });

   
  } catch (error) {
    console.error("Failed to fetch feedback file: ", error);
  }
    
};

const getAllReports = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/report/students_all_reports/${studentId}`);
    const info = response.data;
    console.log("REPORTS: ", info);


    const response2 = await axios.get(`http://localhost:8080/report/file/active/${studentId}`);
    const info2 = response2.data;
    console.log("ACTIVE REPORT: ", info2);


    var reportIdList = [];

    var allReports = [];

    var allFeedbacks = [];

    //get every report except the last one (report history)
    for (var i = 0; i < info.length ; i++) {
      console.log(i, "th report: ", info[i].id);
      reportIdList.push(info[i].id)
      getReportFile(reportIdList[i],allReports,i)
      getFeedbackFile(reportIdList[i],allFeedbacks)
     
    }



    console.log("ids: ", reportIdList)

    
    //console.log("1:", reportFile)
    //getReportFile(reportIdList[1],allReports)
    //console.log("2:", reportFile)


    console.log("ALL REPOS:", allReports)
    
    setReportHistory(allReports)
    setFeedbackHistory(allFeedbacks)

    // const reports = allReports.map((report,index) => ({
    //   revisionCount: index + 1,
    //   fileName: report.fileName,
    //   description:report.reportDescription
    // }));
   


  } catch (error) {
    console.log(error);
  }
};


    return (
        <ul>
          {console.log("AAA:",reportHistory)}
            {reportHistory.map((revision,index) => (
                <div className="prevreport">
                    <li key={index}>
                        <hr></hr>
                        <h2>Revision : {revision.revisionCount}</h2>
                        <p>The student's submission for this revision:</p>
                        <IconButton aria-label="download" onClick={downloadPrevious(revision.fileData,revision.fileName)}>
                            <DownloadIcon/>
                        </IconButton>
                        <Button variant="text" onClick={downloadPrevious(revision.fileData,revision.fileName)} style={{textTransform: 'none'}} size="large">{revision.fileName}</Button>
                        <Typography>Student's comments:</Typography>
                        <textarea readOnly>{revision.description}</textarea>

                        <b><br></br>◾The grade distribution of this submission◾</b>
                        <br></br>
                        <p>Overall progress: {}</p>
                        <b><br></br>Your feedback for this submission</b>
                        <textarea readOnly>{}</textarea>
                        <b>Your annotated feedback for this submission<br></br></b>
                        <IconButton aria-label="download" onClick={downloadAnnotated}>
                            <DownloadIcon/>
                        </IconButton>
                        <Button variant="text" onClick={downloadAnnotated} style={{textTransform: 'none'}} size="large">{}</Button>

                    </li>
                </div>
            ))}
        </ul>
    );
}



const downloadAnnotated = () => {
    const link = document.createElement("a");
    //the "download.txt" will be replaced by the link name. (this.state = {annotatedFeedback}) is the file needed.
    link.download = `${this.state.studentFirstName}${this.state.studentLastName}annotatedFeedback.txt`;
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
  const [isSatisfactory, setIsSatisfactory] = useState(false);

  useEffect(() => {
    const getInformation = async () => {
      const studentId = 3;
      try {
        const response = await axios.get(`http://localhost:8080/report/students_all_reports/${studentId}`);
        console.log("reports:", response.data.length);

       
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
    {console.log("Student id: ", props.studentId)}
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
          >Revision Required</Button>
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
      super(props);
      this.state = {
        studentFirstName: "",
        studentLastName: "",
        course: "",
        studentId:null,
        prevGradeA: statusOptions[4],
        prevGradeB: statusOptions[4],
        isButtonClicked: false,
        currentReport: "",
        currentComment: "",
        currentFile: null,
        fileData:null,
        reportId:null
      };
      this.downloadCurrent = this.downloadCurrent.bind(this);
    }

    static contextType = UserContext;
    componentDidMount() {
     
      console.log("STUDENT IDDDD:",this.context.userId)
      const id = this.context.userId

      this.setState({studentId:id})
      this.getCurrentStudent(id);
      this.getActiveReport(id);

      console.log("WORKS AGA. ", this.state.fileData)
  }
  
  downloadCurrent = () =>{

    const fileData = this.state.fileData
    const fileName = this.state.currentReport

    console.log("data: ", fileData)
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
  


    getCurrentStudent = async (id) => {

      const {studentId} = this.state;
      try {
       
        const response2 = await axios.get(`http://localhost:8080/${id}`);
        const studentInfo = response2.data;
        console.log("ACTIVE STUDENT: ", studentInfo);

        this.setState({
          studentFirstName: studentInfo.userAccount.firstName,
          studentLastName: studentInfo.userAccount.lastName,
          course: studentInfo.courseCode,

        })
  
    
      } catch (error) {
        console.log(error);
      }

    }
    getActiveReport = async (id) => {
      try {
       
        const response2 = await axios.get(`http://localhost:8080/report/file/active/${id}`);
        const info2 = response2.data;
        console.log("ACTIVE REPORT: ", info2);

        this.setState({
          currentReport: info2.fileName,
          currentComment: info2.reportDescription,
          fileData:info2.fileData,
          reportId:info2.reportId
        }, () => {
          console.log("repo:",this.state.currentReport);
          console.log("commenti:",this.state.currentComment);
          //console.log("commenti:",this.state.fileData);
          
        });
  
    
      } catch (error) {
        console.log(error);
      }
    };

    handleFileChange = (event) => {
      const file = event.target.files[0];
      this.setState({currentFile:file})
    };

    sendFeedback = async (event) => {


      event.preventDefault();
      const feedbackData = {
        senderId: this.props.userId,
        reportId: this.state.reportId,
        feedbackDescription: "asd",
        uploadDate: new Date().toISOString(), // Set the appropriate date format
      };
    
      axios.post("http://localhost:8080/feedback", feedbackData)
        .then((response) => {
          console.log("Feedback created successfully");
          console.log( "feedback: ",response.data);
    
          const feedbackId = response.data;
          
    
          const formData = new FormData();
          formData.append('studentId', this.state.studentId);
          console.log("student id:", this.state.studentId)
          formData.append('fileData', this.state.currentFile);
          console.log("file:", this.state.currentFile)
          formData.append('feedbackDescription', "asd");
          console.log("feedback id:",feedbackId)
          formData.append('feedbackId', feedbackId);
    
          axios.post("http://localhost:8080/feedback/file", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((response) => {
              console.log("File uploaded successfully");
              console.log(response.data);
            })
            .catch((error) => {
              // Handle error
              console.error(error);
            });
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
      
    };
    
  
   
    

  
    render() {
      return (
        <div className="reportevaluation">
          <div className="history">
            <div className="information">
              <h1>
                Viewing the submission history of: {this.state.studentFirstName} {this.state.studentLastName}
              </h1>
              <hr></hr>
            </div>
            <div className="prevlist">
              <h1>Previous Revisions</h1>
              <RevisionList />
            </div>
          </div>
          <hr></hr>
          <div className="reportstatus">
            <div className="information">
              <h1>The student's current submission for {this.state.course}</h1>
              <br></br>
              <IconButton  onClick={() => this.downloadCurrent()} aria-label="download">
                <DownloadIcon />
              </IconButton>
              <Button
                 onClick={() => this.downloadCurrent()}
                variant="text"
                style={{ textTransform: "none" }}
                size="large"
              >
                {this.state.currentReport}
              </Button>
              <Typography>Student's comments:</Typography>
              <textarea readOnly value={this.state.currentComment || ''}></textarea>
              <hr></hr>
              <h1>REPORT ASSESSMENT</h1>
            </div>
            <Typography>
              {
                <Button
                  onClick={downloadCEF}
                  variant="text"
                  style={{ textTransform: "none" }}
                  size="large"
                >
                  Click here
                </Button>
              } to download the student's company evaluation form.
            </Typography>
            <Typography>To enter the student's grades, use the Grade Form</Typography>
            <FormDialog
              studentFirstName={this.state.studentFirstName}
              studentLastName={this.state.studentLastName}
              setButtonClicked={(value) => this.setState({ isButtonClicked: value })}
            />
            <div className="texteditor">
              <TextareaValidator />
            </div>
            <div className="annotatedupload">
              <h2>Upload annotated feedback here: </h2>
              <FileUploadIcon />
              <Button variant="contained" hidden onChange={this.handleFileChange} component="label">
                Upload File
                <input type="file" hidden />
              </Button>
              {this.state.currentFile && (
              <div>
                <h2>Selected File:</h2>
                <p>{this.state.currentFile.name}</p>
                <p>Size: {this.state.currentFile.size} bytes</p>
                <p>Type: {this.state.currentFile.type}</p>
                {/* Additional information or display logic */}
                <Button
                onClick={this.sendFeedback}
                variant='contained'
                color="success"
                sx={{ marginRight: '10px' }}
              > Send feedback </Button>
              </div>
            )}
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default ReportEvaluation;
  