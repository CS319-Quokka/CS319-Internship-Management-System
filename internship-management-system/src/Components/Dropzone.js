import React, { useState, useRef ,  useEffect,useContext } from "react";
import axios from "axios";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/joy/Box";
import IconButton from "@mui/material/IconButton";
import FormatBold from "@mui/icons-material/FormatBold";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Check from "@mui/icons-material/Check";
import FormatItalic from "@mui/icons-material/FormatItalic";
import { UserContext } from './UserContext';


function FileUpload(props) {
  const [message, setMessage] = React.useState("");

  return (
    <div>

      <DragDropFiles fromStudent = {props.fromStudent} isUsersSheet = {props.isUsersSheet} isCompanyForm = {props.isCompanyForm} id = {props.id} message={message} setMessage={setMessage} />
    </div>
  );
}


function TextareaValidator(props) {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMessageChange = (event) => {
        props.setMessage(event.target.value);
    };


  return (
      <FormControl>
        <FormLabel>Comments</FormLabel>
        <Textarea
            placeholder="Type your message here..."
            minRows={3}
            required
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


const DragDropFiles = (props) => {
  const [file, setFile] = useState(null);
  const [userId, setId] = useState("");
  //const [description, setDescription] = useState("");
  const inputRef = useRef();
  const [uploadSubmitted, setUploadSubmitted] = useState(false); // Track upload status
  const userContext = useContext(UserContext);
  const [studentState,setStatus] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

  const [formUploaded,setFormUploaded] = useState(false);
  const [fullName,setFullName] = useState("");


    const handleSelectFile = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDropFile = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFile(event.dataTransfer.files[0]);
  };

  const changeHandler = (event) => {
    event.preventDefault();
    setFile(event.target.files[0])
  }

  useEffect(() => {
    const getInformation = async () => {
      try {
        console.log("SEARCH WITH ID:", props.id)
        console.log("IS IT FROM STUDENT:", props.fromStudent)
  
        let info; // Define 'info' outside the if-else blocks
  
        if(props.fromStudent){
          const response = await axios.get(`http://localhost:8080/get_all_users/${props.id}`);
          console.log("s:", response.data[0])
          info = response.data[0];
          setStatus(info.status)
        } else {
          const response = await axios.get(`http://localhost:8080/${props.id}`);
          info = response.data;
          setStatus(info.status)
        }
        console.log("INFO PLS:", info)
  
        const fullName = info.userAccount.firstName + " " + info.userAccount.lastName;
        setFullName(fullName);
  
        //check if the company form is uploaded for the corresponding student
        const cefResponse = await axios.get(`http://localhost:8080/report/get_company_form_by_student/${props.id}`);
        const cefInfo = cefResponse.data;
  
        if(cefInfo.fileData != null){
          setFormUploaded(true);
        }
  
        setId(info.id)
      } catch (error) {
        console.error(error);
      }
    };
  
    if (props.id) {
      getInformation();
    }
  
    // Auto-hide the alerts after a few seconds
    const timer = setTimeout(() => {
      setShowErrorAlert(false);
      setShowSuccessAlert(false);
    }, 5000);
  
    return () => clearTimeout(timer);
  }, [props.id, showErrorAlert, showSuccessAlert]);
  

  //separate the uploads: company form or report
  const handleUpload = (event) => {
    console.log("isUsersSheet:", props.isUsersSheet);
    console.log("isCompanyForm:", props.isCompanyForm);
    if(props.isUsersSheet) {
      handleUsersSheetUpload(event);
    }
    else if (props.isCompanyForm) {
      handleCompanyFormUpload(event);
    } 
    else {
      handleReportUpload(event);
    }
  }

  const handleUsersSheetUpload = async (event) =>{
    event.preventDefault();
    if (file) {
    const formData = new FormData();
    formData.append("file", file);
      try {
        const response = await axios.post(
          "http://localhost:8080/account/addAccounts",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Handle success response
        console.log("success");
          setUploadSubmitted(true);
          console.log(response.data);
      } catch (error) {
        // Handle error
        console.log("fail");
        if (error.response) {
          console.log('Error status', error.response.status);
          console.log('Error details', error.response.data);
      } else {
          console.error(error);
      }
      }
    }

  }

  //administrative assistant will upload the company form for a student
  const handleCompanyFormUpload = async (event) =>{
    event.preventDefault();
    const studentId = userContext.userId;
    if (file) {
    const formData = new FormData();
    formData.append("studentId", studentId); 
    formData.append("fileData", file);
      try {
        const response = await axios.post(
          "http://localhost:8080/report/company_form",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Handle success response
        console.log("success");
          setUploadSubmitted(true);
          console.log(response.data);
      } catch (error) {
        // Handle error
        console.log("fail");
        if (error.response) {
          console.log('Error status', error.response.status);
          console.log('Error details', error.response.data);
      } else {
          console.error(error);
      }
      }
    }

  }

  //upload an internship report
  const handleReportUpload = async (event) => {

    event.preventDefault();


    if (file) {
    const formData = new FormData();
    const response1 = await axios.get(`http://localhost:8080/report/students_all_reports/${userId}`);
    const reportId = response1.data[response1.data.length - 1].id;
    let uploadDate = new Date().toISOString();

    formData.append("studentId", userId); // Replace studentId with the actual student ID
    formData.append("reportId", reportId); // Replace reportId with the actual report ID
    formData.append("fileData", file);
    formData.append("reportDescription",props.message)
    formData.append("uploadDate", uploadDate)

      try {
        const response = await axios.post(
          "http://localhost:8080/report/file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Handle success response
          setUploadSubmitted(true);
          setSuccessMessage("Report successfully uploaded.");
          setShowSuccessAlert(true);
      } catch (error) {

        if (error.response) {
          setErrorMessage("Error status: " + error.response.status + "\nError details: " + error.response.data);
          setShowErrorAlert(true);

      } else {
            setErrorMessage("An error occurred :(");
            setShowErrorAlert(true);
      }
      }
    }
  };

  if (file && !uploadSubmitted) {
      return (
          <div className="upload-confirm">
              <h2>Uploading the following file:</h2>
              <p>{file.name}</p>
              <br></br>
              {!props.isUsersSheet &&!props.isCompanyForm &&
                <TextareaValidator setMessage = {props.setMessage}/>
              }
              {props.isCompanyForm &&
              <div>
               <h2>For the student:</h2>

                <em>{fullName}</em>
               </div>


              }


              <div className="button-layout">
                  <button className="button" onClick={() => setFile(null)}>
                      Cancel
                  </button>
                  <button className="button" onClick={handleUpload}>
                      Upload
                  </button>
              </div>
          </div>
      );
  }
  if( (props.isUsersSheet) && uploadSubmitted) {
    return(
      <div className="upload-confirm">
          <h2>You have uploaded a file.</h2>
      </div>

    );
  }

  if ( (!props.isUsersSheet) && (!props.isCompanyForm) && (uploadSubmitted || !(studentState == "Waiting to upload report"))) {
   console.log("EX 1")
   console.log("upload sub:", uploadSubmitted)
   console.log("state:", studentState)
    return(
        <div className="upload-confirm">
            <h2>You have uploaded a report.</h2>
        </div>

      );
  }

  if ((!props.isUsersSheet) && (props.isCompanyForm) && (uploadSubmitted || (formUploaded == true))) {
    console.log("EX 2")
    return(
      <div className="upload-confirm">
          <h2>You have uploaded a report.</h2>
      </div>

    );
}

  return (
    <>
      <div
        id="dropzone"
       onDragOver={(event) => handleSelectFile(event)}
        onDrop={(event) => handleDropFile(event)}
      >
        <h2>Drag and Drop File to Upload</h2>
        <h3>Or</h3>
        <input
          type="file"
          onChange={(event) => changeHandler(event)}
          hidden
          accept="application/pdf, .doc, .docx, .xls, .xlsx"
          ref={inputRef}
        />
        <button className="button" onClick={() => inputRef.current.click()}>
          Select File
        </button>
      </div>
    </>
  );
};

export default FileUpload;
