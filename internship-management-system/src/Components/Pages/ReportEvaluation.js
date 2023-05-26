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
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';




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
const downloadAnnotated = (fileData,fileName) => {
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
}


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

const getReportFile = async (id, reports, index) => {
  try {
    const response = await axios.get(`http://localhost:8080/report/file/${id}`);
    const reportFile = response.data;

    const feedback = await getFeedbackFile(id);

    reports.push({
      revisionCount: index + 1,
      fileName: reportFile.fileName,
      description: reportFile.reportDescription,
      fileData: reportFile.fileData,
      feedbackData: feedback ? feedback.fileData : null,
      feedbackName: feedback ? feedback.fileName : null
    });

    createDownloadUrl(reportFile.fileData, reportFile.fileName);
    console.log("linko:", link);
    links.push(link);
  } catch (error) {
    console.error("Failed to fetch report file: ", error);
  }
};

const getFeedbackFile = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/feedback/get_feedback_by_report/${id}`);
    const feedbackFile = response.data;

    console.log("feedback data:", feedbackFile);

    return feedbackFile;
  } catch (error) {
    console.error("Failed to fetch feedback file: ", error);
    throw error;
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
    console.log("ALL FEEDBCAKS:", allFeedbacks)

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
          {console.log("BBB:",feedbackHistory[0])}
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
                        <IconButton aria-label="download" onClick={downloadAnnotated(revision.feedbackData,revision.feedbackName)}>
                            <DownloadIcon/>
                        </IconButton>
                        <Button variant="text" onClick={downloadAnnotated(revision.feedbackData,revision.feedbackName)} style={{textTransform: 'none'}} size="large">Feedback</Button>

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
function IconAlerts() {
    return (
        <div>
            <Stack sx={{width: '100%'}} spacing={2}>
                <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success">
                    Assessment scores saved!
                </Alert>
            </Stack>
        </div>
    );
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

function FormDialogA(props) {
  const [openA, setOpenA] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [partAstatus, setPartAstatus] = useState("Unsatisfactory");



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

  const handleIsClicked1 = () => {
      setIsClicked1(true);
  }
    const handleIsClicked2 = () => {
        setIsClicked2(true);
    }

  const handleClickOpenA = () => {
    setOpenA(true);
    props.setButtonClicked(true);
    {console.log("Student id: ", props.studentId)}
  };
  const handleCEFChange = (event) => {
      const cefGrade = event.target.value;
      const areButtonsClicked = isClicked1 && isClicked2; // Check if both buttons are clicked and stay on "Yes"
      console.log("entered part A check")
      if (cefGrade >= 7 && areButtonsClicked) {
          setPartAstatus("Satisfactory");
          console.log("part a success!")
      } else {
          setPartAstatus("Unsatisfactory");
      }
  };

  const handleCloseA = () => {
    setOpenA(false);
    props.setButtonClicked(false);
  };
 const handleSubmitA = () => {
     setOpenA(false);
     // save CEF grades.
 }

  return (

    <div>
      <Button variant="outlined" onClick={handleClickOpenA}>
        Part A
      </Button>
      <Dialog fullWidth open={openA} onClose={handleCloseA}>
        <DialogTitle>Grade Form</DialogTitle>
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
          style: { width: '5ch' }
          }}
          onChange={handleCEFChange}
          />
          <Typography>Is the work done related to computer engineering?</Typography>
          <Button variant={isClicked1 ? "contained" : "outlined"} color="success" onClick={() => setIsClicked1(true)}> Yes </Button>
          <Button variant={isClicked1 ? "outlined" : "contained"} color="error" onClick={() => setIsClicked1(false)}> No </Button>
          <Typography>Is the supervisor a computer engineer or has a similar engineering background?</Typography>
          <Button variant={isClicked2 ? "contained" : "outlined"} color="success" onClick={() => setIsClicked2(true)}> Yes </Button>
          <Button variant={isClicked2 ? "outlined" : "contained"} color="error" onClick={() => setIsClicked2(false)}> No </Button>

          <hr></hr>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseA}>Cancel</Button>
          <Button  onClick={() => {
        //    <Alert severity="success">Grade form is filled!</Alert>
            handleSubmitA();
          }}
          >Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function FormDialogB(props) {
    const [openB, setOpenB] = useState(false);
    const [isClicked1, setIsClicked1] = useState(false);
    const [buttonNameB, setButtonNameB] = useState("");
    const [isClicked2, setIsClicked2] = useState(false);
    const [partBstatus, setPartBstatus] = useState("Unsatisfactory");
    const [isSatisfactoryB, setIsSatisfactoryB] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    const handleSubmitB = () => {


        console.log("Student id: ", props.studentId, "Deadline:", selectedDate)
        const reportData = {
            studentId: props.studentId,
            deadline: selectedDate
        };


        axios.post("http://localhost:8080/report", reportData)
            .then((response) => {
                console.log("Report created successfully");
                console.log( "report: ",response.data);


            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });

        setOpenB(false);

    }


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

    const handleClickOpenB = () => {
        setOpenB(true);
        props.setButtonClicked(true);
        {console.log("Student id: ", props.studentId)}
    };
    const handleSatisfactoryClick = () => {
        setIsSatisfactoryB(false);
    };

    const handleCloseB = () => {
        setOpenB(false);
        props.setButtonClicked(false);
    };

    const handleRevisionRequiredClick = () => {
        setIsSatisfactoryB(true);
    };
    return (

        <div>
            <Button variant="outlined" onClick={handleClickOpenB}>
                Part B
            </Button>
            <Dialog fullWidth open={openB} onClose={handleCloseB}>
                <DialogTitle>Grade Form</DialogTitle>
                <DialogContent>
                    <Typography sx={{fontWeight: 'bold'}}>Part B - Report</Typography>
                    <Button
                        variant={isSatisfactoryB ? 'outlined' : 'contained'}
                        color="success"
                        onClick={handleSatisfactoryClick}
                        sx={{marginRight: '10px'}}
                    > Satisfactory </Button>
                    <Button
                        variant={isSatisfactoryB ? 'contained' : 'outlined'}
                        color="secondary"
                        onClick={handleRevisionRequiredClick}
                    >Revision Required</Button>
                    {isSatisfactoryB && (
                        <div>
                            <Typography>Enter the due date for the resubmission.</Typography>
                            <DateComponent/>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseB}>Cancel</Button>
                    <Button onClick={handleSubmitB}> Submit
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}

function FormDialogC(props){
    const [openC, setOpenC] = useState(false);
    const [input1, setInput1] = useState(0);
    const [input2, setInput2] = useState(0);
    const [input3, setInput3] = useState(0);
    const [input4, setInput4] = useState(0);
    const [input5, setInput5] = useState(0);
    const [input6, setInput6] = useState(0);
    const [input7, setInput7] = useState(0);
    const [total, setTotal] = useState(0);


    const handleChange = (event) => {
        const { id, value } = event.target;
        const intValue = parseInt(value, 10);
        switch (id) {
            case "input1":
                setInput1(intValue);
                break;
            case "input2":
                setInput2(intValue);
                break;
            case "input3":
                setInput3(intValue);
                break;
            case "input4":
                setInput4(intValue);
                break;
            case "input5":
                setInput5(intValue);
                break;
            case "input6":
                setInput6(intValue);
                break;
            case "input7":
                setInput7(intValue);
            default:
                break;
        }
    };

    useEffect(() => {
        const sum = input1 + input2 + input3 + input4 + input5 + input6;
        setTotal(sum);
    }, [input1, input2, input3, input4, input5, input6 ]);

/*
    useEffect(() => {
        const getInformation = async () => {
        //    const studentId = 3;
            try {
                const response = await axios.get(`http://localhost:8080/report/students_all_reports/${studentId}`);
                console.log("reports:", response.data.length);


            } catch (error) {
                console.error(error);
            }
        };

        getInformation();
    }, []);
*/

    const handleClickOpenC = () => {
        setOpenC(true);
        props.setButtonClicked(true);
        {console.log("Student id: ", props.studentId)}
    };
    const handleCloseC = () => {
        setOpenC(false);
        props.setButtonClicked(false);
    };
    const handleSubmitC = () => {
        setOpenC(false);
    }

    return (

        <div>
            <Button variant="outlined" onClick={handleClickOpenC}>
                Part C
            </Button>
            <Dialog fullWidth open={openC} onClose={handleCloseC}>
                <DialogTitle>Grade Form</DialogTitle>
                <DialogContent>
                    <Typography sx={{fontWeight: 'bold'}}>Part C - Final version of the report</Typography>
                    <Typography>(1) Able to perform work at the level expected from a summer training in the area of computer engineering. (this is the evaluation of all the work done in the summer training)</Typography>
                    <Textarea placeholder="On what page(s) of the report is the evidence of this found?"> </Textarea>
                    <TextField required autoFocus margin="dense" id="input1" label="(1)" type="number" variant="standard"
                            inputProps={{
                            min: 0,
                            max: 10,
                            align: 'right',
                            style: { width: '5ch' }
                            }}
                           value={input1} onChange={handleChange}
                    />
                    <hr></hr>
                    <Typography>(2) Solves complex engineering problems by applying principles of engineering, science, and mathematics.</Typography>
                    <Textarea placeholder="On what page(s) of the report is the evidence of this found?"> </Textarea>
                    <TextField required autoFocus margin="dense" id="input2" label="(2)" type="number" variant="standard"
                               inputProps={{
                                   min: 0,
                                   max: 10,
                                   align: 'right',
                                   style: { width: '5ch' }
                               }}
                               value={input2} onChange={handleChange}
                    />
                    <hr></hr>
                    <Typography>(3) Recognizes ethical and professional responsibilities in engineering situations.</Typography>
                    <Textarea placeholder="On what page(s) of the report is the evidence of this found?"> </Textarea>
                    <TextField required autoFocus margin="dense" id="input3" label="(3)" type="number" variant="standard"
                               inputProps={{
                                   min: 0,
                                   max: 10,
                                   align: 'right',
                                   style: { width: '5ch' }
                               }}
                               value={input3} onChange={handleChange}
                    />
                    <hr></hr>
                    <Typography>(4) Able to make informed judgments that consider the impact of engineering solutions in global, economic, environmental, and societal contexts. </Typography>
                    <Textarea placeholder="On what page(s) of the report is the evidence of this found?"> </Textarea>
                    <TextField required autoFocus margin="dense" id="input4" label="(4)" type="number" variant="standard"
                               inputProps={{
                                   min: 0,
                                   max: 10,
                                   align: 'right',
                                   style: { width: '5ch' }
                               }}
                               value={input4} onChange={handleChange}
                    />
                    <hr></hr>
                    <Typography>(5) Able to acquire new knowledge using appropriate learning strategy or strategies.  </Typography>
                    <Textarea placeholder="On what page(s) of the report is the evidence of this found?"> </Textarea>
                    <TextField required autoFocus margin="dense" id="input5" label="(5)" type="number" variant="standard"
                               inputProps={{
                                   min: 0,
                                   max: 10,
                                   align: 'right',
                                   style: { width: '5ch' }
                               }}
                               value={input5} onChange={handleChange}
                    />
                    <hr></hr>
                    <Typography>(6) Able to apply new knowledge as needed.  </Typography>
                    <Textarea placeholder="On what page(s) of the report is the evidence of this found?"> </Textarea>
                    <TextField required autoFocus margin="dense" id="input6" label="(6)" type="number" variant="standard"
                               inputProps={{
                                   min: 0,
                                   max: 10,
                                   align: 'right',
                                   style: { width: '5ch' }
                               }}
                               value={input6} onChange={handleChange}
                    />
                    <Typography>Able to prepare reports with high standards in terms of content, organization, style and language (the Summer Training report itself is to be evaluated) </Typography>
                    <Textarea placeholder="On what page(s) of the report is the counter evidence of this found?"> </Textarea>
                    <TextField required autoFocus margin="dense" id="input7" label="input7" type="number" variant="standard"
                               inputProps={{
                                   min: 0,
                                   max: 10,
                                   align: 'right',
                                   style: { width: '5ch' }
                               }}
                               value={input7} onChange={handleChange}
                    />
                    {/* /to-do: SATISFACTORY CONDITIONS */}

                    <Typography>Assessment score of Evaluation of the Work: {input1}/10</Typography>
                    {/* input1 >= 7*/}
                    <Typography>Sum of the assessment scores of Evaluation of the Work: {total - input1}/50</Typography>
                    {/* total-input1 >= 25*/}
                    <Typography>The assessment score of Evaluation of the report: {input7}/10</Typography>
                    {/* input7 >= 7*/}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseC}>Cancel</Button>
                    <Button  onClick={() => {
                        //    <Alert severity="success">Grade form is filled!</Alert>
                        handleSubmitC();
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
        reportId:null,
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

      console.log("uploaded a feedback")

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
            <Typography>Part A - Enter the Company Evaluation Form Assessment </Typography>
            <FormDialogA
              studentId = {this.state.studentId}
              studentFirstName={this.state.studentFirstName}
              studentLastName={this.state.studentLastName}
              setButtonClicked={(value) => this.setState({ isButtonClicked: value })}
            />
              <Typography>Part B - Enter the Report Assessment </Typography>
              <FormDialogB
                  studentId = {this.state.studentId}
               studentFirstName={this.state.studentFirstName}
               studentLastName={this.state.studentLastName}
               setButtonClicked={(value) => this.setState({ isButtonClicked: value })}
            />
              <Typography>Part C - Enter the Overall Assessment </Typography>
              <FormDialogC
                  studentId = {this.state.studentId}
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
  