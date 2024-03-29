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


function RevisionList() {

const [studentId, setStudentId] = useState('');
const location = useLocation();
const [link,setLink] = useState("");
const [links,setLinks] = useState([]);
const [reportFile,setReportFile] = useState(null)
const [reportHistory,setReportHistory] = useState([])
const [feedbackHistory,setFeedbackHistory] = useState([])
const [status,setStatus] = useState("");
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
  setStudentId(userContext.userId);
}, [userContext.userId]);

useEffect(() => {
  if (studentId) {
    getAllReports();
  }
}, [studentId]);



const createDownloadUrl = (fileData,fileName) =>{
  // Create a Blob object from the file data

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
    const feedbackDesc = await getFeedbackDescription(id)

    reports.push({
      revisionCount: index + 1,
      fileName: reportFile.fileName,
      description: reportFile.reportDescription,
      fileData: reportFile.fileData,
      feedbackData: feedback ? feedback.fileData : null,
      feedbackName: feedback ? feedback.fileName : null,
      feedbackDescription: feedbackDesc
    });

    createDownloadUrl(reportFile.fileData, reportFile.fileName);
    console.log("linko:", link);
    links.push(link);
  } catch (error) {
    console.error("Failed to fetch report file: ", error);
  }
};

const getFeedbackDescription = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/feedback/description/${id}`);
    const feedback = response.data;

    console.log("FEEDBACK DESC: ",feedback)


    return feedback;
  } catch (error) {
    console.error("Failed to fetch feedback: ", error);
    throw error;
  }
};

const getFeedbackFile = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/feedback/get_feedback_by_report/${id}`);
    const feedbackFile = response.data;


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
    console.log("REPORTS: ", info[0]);


    const response2 = await axios.get(`http://localhost:8080/report/file/active/${studentId}`);
    const info2 = response2.data;

    const response3 = await axios.get(`http://localhost:8080/student/${studentId}/get_all_status`);
    const info3 = response3.data;
    setStatus(info3.statusB)


    var reportIdList = [];

    var allReports = [];

    var allFeedbacks = [];

    //get every report except the last one (report history)
    for (var i = 0; i < info.length -1; i++) {
      console.log(i, "th report: ", info[i].id);
      reportIdList.push(info[i].id)
      getReportFile(reportIdList[i],allReports,i)
    }


    if(info3.statusB == "Feedback Given"){
      console.log("GIVEN FEEDBACK" )
      var index = info.length-1;
      reportIdList.push(info[index].id)
      getReportFile(reportIdList[index],allReports,index)

    }
    console.log("ids: ", reportIdList)

    console.log("ALL REPOS:", allReports)
    console.log("ALL FEEDBCAKS:", allFeedbacks)

    setReportHistory(allReports)
    setFeedbackHistory(allFeedbacks)
  } catch (error) {
    console.log(error);
  }
};


    return (
      
        <ul>
          {reportHistory.length == 0 &&
          <div>
            <br></br>
            <h4><em>There is no history available</em></h4>
            
          </div>
          }
          {console.log("AA:", reportHistory)}
            {reportHistory
            .sort((a, b) => a.revisionCount - b.revisionCount) 
            .map((revision,index) => (
                <div className="prevreport">
                    <li key={revision.revisionCount}>
                        <hr></hr>
                        <h2>Revision : {revision.revisionCount}</h2>
                        <p>The student's submission for this revision:</p>
                        <IconButton aria-label="download" onClick={downloadPrevious(revision.fileData,revision.fileName)}>
                            <DownloadIcon/>
                        </IconButton>
                        <Button variant="text" onClick={downloadPrevious(revision.fileData,revision.fileName)} style={{textTransform: 'none'}} size="large">{revision.fileName}</Button>
                        <Typography>Student's comments:</Typography>
                        <textarea readOnly value={revision.description}></textarea>

                        <b><br></br>◾The grade distribution of this submission◾</b>
                        <br></br>
                        <p>Overall progress: {}</p>
                        <b><br></br>Your feedback for this submission</b>
                       <textarea readOnly value={revision.feedbackDescription}></textarea>
                        <b>Your annotated feedback for this submission<br></br></b>
                        {!(revision.feedbackData) &&
                        <p>Not available</p>
                        }

                        {revision.feedbackData &&
                            <div>
                                <IconButton aria-label="download" onClick={downloadAnnotated(revision.feedbackData,revision.feedbackName)}>
                                <DownloadIcon/>
                                </IconButton>
                                <Button variant="text" onClick={downloadAnnotated(revision.feedbackData,revision.feedbackName)} style={{textTransform: 'none'}} size="large">{revision.feedbackName}</Button>
                            </div>
                        }
                 
                    </li>
                </div>
            ))}
        </ul>
    );
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
function TextareaValidator(props) {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const sendFeedbackComment = async (event) => {
    event.preventDefault();
    console.log("SENDING FC")

      const feedbackData = {
        senderId: props.userId,
        studentId:props.studentId,
        reportId: props.reportId,
        feedbackDescription: props.message,
        uploadDate: new Date().toISOString(), // Set the appropriate date format
      };

      axios.post("http://localhost:8080/feedback", feedbackData)
      .then((response) => {
        console.log(response);
        props.setSentFeedback(true)
      })
      .catch((error) => {
        console.log(error);
      });
};


  const handleMessageChange = (event) => {
    props.setMessage(event.target.value);
};

  
  return (
    <FormControl>
      {!props.feedbackSent &&

      <div>
        
      <FormLabel>Feedback comments</FormLabel>
      <Textarea
        placeholder="Type your feedback comments here..."
        minRows={3}
        onChange={handleMessageChange}
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
          <Button onClick = {sendFeedbackComment} sx={{ ml: 'auto' }}>Send</Button>
        </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? 'italic' : 'initial',
        }}
      />

      </div>
      }
    </FormControl>
  );
}

function FormDialogA(props) {
  const [openA, setOpenA] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [partA,setPartA] = useState("Undetermined")



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
          setPartA("Satisfactory");
          console.log("part a success!")
      } else {
          setPartA("Unsatisfactory");
          console.log("UNSATIS")
      }
  };

  const handleCloseA = () => {
    setOpenA(false);
    props.setButtonClicked(false);
  };
 const handleSubmitA = () => {
  console.log("PRESSING:", partA)
    if(partA != "Undetermined"){
      
     props.setPartAstatus(partA)

    }
     setOpenA(false);
     // save CEF grades.
 }

  return (

    <div>
      {props.partAstatus == "Undetermined" &&
      <div>
         <Button variant="outlined" onClick={handleClickOpenA}>
          Part A
        </Button>

      </div>
      }
     
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
    const [buttonName,setButtonName] = useState("");

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    
    useEffect(() => {
      const fetchReports = async () => {
        if (props.studentId) {
          try {
            const response = await axios.get(`http://localhost:8080/report/students_all_reports/${props.studentId}`);
            const info = response.data;
            if(info.length == 0){
              setButtonName("Ask for initial report")
            }
            else{
              setButtonName("Revision Required")
            }
          } catch (error) {
            console.error('Failed to fetch reports: ', error);
          }
        }
      };
    
      fetchReports();
    }, [props.studentId]);
    
    
    const handleSubmitB = async() => {


      if(isSatisfactoryB){

        console.log("Student id: ", props.studentId, "Deadline:", selectedDate)
        const reportData = {
            studentId: props.studentId,
            deadline: selectedDate
        };


        axios.post("http://localhost:8080/report", reportData)
            .then((response) => {
                console.log("Report created successfully");


            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });

      }

      else{
        let newStatus = "Satisfactory";
        console.log("status: ", newStatus)

        let url = `http://localhost:8080/student/${props.studentId}/status`;

        try {
            const response = await axios.put(url, newStatus,{
              headers: {
                'Content-Type': 'text/plain'
            }
            });

            // Handle response data here
            console.log('Success:', response.data);
        } catch (error) {
            // Handle errors here
            console.log('Error:', error);
        }
            //change the state to satis
      }
  

        setOpenB(false);

    }



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
          {props.partBstatus != "Satisfactory" &&
             <Button variant="outlined" onClick={handleClickOpenB}>
             Part B
            </Button>
          }
           
            <Dialog fullWidth open={openB} onClose={handleCloseB}>
                <DialogTitle>Grade Form</DialogTitle>
                <DialogContent>
                    <Typography sx={{fontWeight: 'bold'}}>Part B - Report</Typography>
                    <Button
                        variant={isSatisfactoryB ?  'outlined':'contained' }
                        color="success"
                        onClick={handleSatisfactoryClick}
                        sx={{marginRight: '10px'}}
                    > Satisfactory </Button>
                    <Button
                        variant={isSatisfactoryB ?  'contained':'outlined'}
                        color="secondary"
                        onClick={handleRevisionRequiredClick}
                    >{buttonName}</Button>
                    {isSatisfactoryB && (
                        <div>
                            <Typography>Enter the due date for the submission.</Typography>
                            <DateComponent selectedDate = {selectedDate} setSelectedDate = {handleDateSelection}/>
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
        if(input1 >= 7 && total-input1 >= 25 && input7 >= 7 ){
          console.log("SATIS C")
          props.setPartCstatus("Satisfactory")
        }
        else{
          console.log("UNSATIS C")
          props.setPartCstatus("Unsatifactory")
        }
        setOpenC(false);
    }

    return (

        <div>
          {props.partCstatus == "Undetermined" &&
          <Button variant="outlined" onClick={handleClickOpenC}>
          Part C
         </Button>
          }
            
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
                    <TextField required autoFocus margin="dense" id="input7" label="(7)" type="number" variant="standard"
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
function DateComponent(props) {
  const [error, setError] = React.useState(null);

  const handleDateChange = (date) => {
    
    if(date.isBefore(new Date(), 'day')){
      setError('Selected date cannot be before today');
  } else {
      props.setSelectedDate(date);
      setError(null);
      console.log(date);
  }
    console.log(date); // you can see the selected date in the console
};

return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
          label="Due Date" 
          value={props.selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
      />
      {error && (
          <Box sx={{ mt: 2 }}>
              <Alert severity="error">{error}</Alert>
          </Box>
      )}
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
        status:"",
        companyFormData:null,
        companyFormName:"",
        currentFile: null,
        fileData:null,
        reportId:null,
        message: "",
        feedbackSent:false,
        partAstatus:"",
        partCstatus:""
      };
      this.downloadCurrent = this.downloadCurrent.bind(this);
      this.setMessage = this.setMessage.bind(this);
    }

    static contextType = UserContext;
    componentDidMount() {
     
      const id = this.context.userId

      this.setState({studentId:id})
      this.getCurrentStudent(id);
      this.getActiveReport(id);
      this.getAllStatus(id);

  }

  getAllStatus = async (studentId) => {
    try {
        const response = await axios.get(`http://localhost:8080/student/${studentId}/get_all_status`);

        if (response.status === 200) {
            const statusResponse = response.data;

            // set all the states from the backend
            this.setState({
              partAstatus: statusResponse.statusA,
              status: statusResponse.statusB,
              partCstatus: statusResponse.statusC,
            });
        } else {
            console.error("Error fetching status.");
        }
    } catch (error) {
        console.error(error);
    }
}

  setPartAstatus = async(status) => {
    try {
        const response = await axios.put(`http://localhost:8080/student/${this.state.studentId}/statusA`, status, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });

        if (response.status === 200) {
            this.setState({ partAstatus: status });
        } else {
            console.error("Error updating status");
        }
    } catch (error) {
        console.error(error);
    }
}

setPartCstatus = async(status) => {
  try {
      const response = await axios.put(`http://localhost:8080/student/${this.state.studentId}/statusC`, status, {
          headers: {
              'Content-Type': 'text/plain'
          }
      });

      if (response.status === 200) {
          this.setState({ partCstatus: status });
      } else {
          console.error("Error updating status");
      }
  } catch (error) {
      console.error(error);
  }
}

  setMessage(message){
    this.setState({message:message})
  }
  
  downloadCurrent = () =>{

    const fileData = this.state.fileData
    const fileName = this.state.currentReport

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


        const cefResponse = await axios.get(`http://localhost:8080/report/get_company_form_by_student/${id}`);
        const cefInfo = cefResponse.data;

        this.setState({
          studentFirstName: studentInfo.userAccount.firstName,
          studentLastName: studentInfo.userAccount.lastName,
          course: studentInfo.courseCode,
          companyFormData: cefInfo.fileData,
          companyFormName:cefInfo.fileName,
          status: studentInfo.status
        })
      } catch (error) {
        console.log(error);
      }

    }
    getActiveReport = async (id) => {
      try {
       
        const response2 = await axios.get(`http://localhost:8080/report/file/active/${id}`);
        const info2 = response2.data;
        this.setState({
          currentReport: info2.fileName,
          currentComment: info2.reportDescription,
          fileData:info2.fileData,
          reportId:info2.reportId
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
        studentId:this.state.studentId,
        reportId: this.state.reportId,
        feedbackDescription: this.state.message,
        uploadDate: new Date().toISOString(), // Set the appropriate date format
      };

      console.log("uploaded a feedback")

      axios.post("http://localhost:8080/feedback", feedbackData)
        .then((response) => {
          console.log("Feedback created successfully");

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
              this.setSentFeedback({feedbackSent:true})
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
    
setSentFeedback = (status) =>{
  this.setState({feedbackSent:status})
}
 downloadCEF = () => {
  const fileData = this.state.companyFormData
  const fileName = this.state.companyFormName;

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
  link.setAttribute('download',fileName ); // the right file extension 
  document.body.appendChild(link);
  link.click();
 
}

    render() {
      console.log("PARTA:", this.state.partAstatus , "PARTB:" , this.state.status , "PARTC:", this.state.partCstatus)
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
              {
                (this.state.status == "Report Uploaded" &&  !this.state.feedbackSent)&&
                <div>

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

                </div>

              }
              
              {
                 (this.state.status != "Report Uploaded"  || this.state.feedbackSent) && 
                 <div>
                  <br></br>
                  <h4><em>There is no active report for the student</em></h4>
                 </div>
                
              }
              <hr></hr>
              <h1>REPORT ASSESSMENT</h1>
              <br></br>
            </div>
            <Typography>

              {this.state.companyFormData &&
               <div>
               {
                 <Button
                   onClick={() => this.downloadCEF()}
                   variant="text"
                   style={{ textTransform: "none" }}
                   size="large"
                 >
                   Click here
                 </Button>
               } to download the student's company evaluation form.</div>
              }
             {!this.state.companyFormData &&
             <p>Company form for this student is not uploaded yet.</p>
             }
            </Typography>
            {this.state.companyFormData &&
            <div>

            <Typography>To enter the student's grades, use the Grade Form</Typography>
            {this.state.partAstatus == "Undetermined" &&
              <Typography>Part A - Enter the Company Evaluation Form Assessment </Typography>
            } 
             {this.state.partAstatus != "Undetermined" &&
              
              <div>
                <br></br>
                <Typography>Part A is {this.state.partAstatus}</Typography>
                <br></br>
              </div>
            } 
            
            <FormDialogA
              partAstatus = {this.state.partAstatus}
              setPartAstatus = {this.setPartAstatus}
              studentId = {this.state.studentId}
              studentFirstName={this.state.studentFirstName}
              studentLastName={this.state.studentLastName}
              setButtonClicked={(value) => this.setState({ isButtonClicked: value })}
            />

            </div>
            }

            {this.state.status != "Satisfactory" &&
             <Typography>Part B - Enter the Report Assessment </Typography>
            }

            {this.state.status == "Satisfactory" &&
              <div>
              <br></br>
              <Typography>Part B is SATISFACTORY</Typography>
              <br></br>
            </div>
            }
           
           
              
              <FormDialogB
               partBstatus = {this.state.status}
               studentId = {this.state.studentId}
               studentFirstName={this.state.studentFirstName}
               studentLastName={this.state.studentLastName}
               setButtonClicked={(value) => this.setState({ isButtonClicked: value })}
            />
            {this.state.partCstatus == "Undetermined" &&
             <Typography>Part C - Enter the Overall Assessment </Typography>
            }
            
            {this.state.partCstatus != "Undetermined" &&
               <div>
               <br></br>
               <Typography>Part C is {this.state.partCstatus}</Typography>
               <br></br>
             </div>
            }
             
              <FormDialogC
                  partCstatus = {this.state.partCstatus}
                  setPartCstatus = {this.setPartCstatus}
                  studentId = {this.state.studentId}
                  studentFirstName={this.state.studentFirstName}
                  studentLastName={this.state.studentLastName}
                  setButtonClicked={(value) => this.setState({ isButtonClicked: value })}
              />


                {this.state.status == "Report Uploaded" &&  (!this.state.feedbackSent) &&
                <div>

            <div className="texteditor">
              <TextareaValidator feedbackSent = {this.state.feedbackSent} setSentFeedback = {this.setSentFeedback} setMessage = {this.setMessage} message = {this.state.message} studentId = {this.state.studentId} userId = {this.props.userId}  reportId = {this.state.reportId}/>
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
                }
          
          </div>
        </div>
      );
    }
  }
  
  export default ReportEvaluation;
  