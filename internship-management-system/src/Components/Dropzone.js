import React, { useState, useRef ,  useEffect } from "react";
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


function FileUpload(props) {
  const [message, setMessage] = React.useState("");

  return (
    <div>
      
      <DragDropFiles id = {props.id} message={message} setMessage={setMessage} />
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

  const handleSelectFile = (event) => {

    event.preventDefault();
    event.stopPropagation();
    
  };

  const handleDropFile = (event) => {
    console.log("HERE2")
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
        const response = await axios.get(`http://localhost:8080/get_all_users/${props.id}`);
        const info = response.data[0];
        // Process the received data as needed
        console.log(info.id);
        setId(info.id)
      } catch (error) {
        console.error(error);
      }
    };

    getInformation();
  }, [props.id]);
  const handleUpload = async (event) => {
    event.preventDefault();


    console.log("file: ", file)

    if (file) {


    const formData = new FormData();

    console.log(file.name);
    console.log("id: " , userId);

    const response1 = await axios.get(`http://localhost:8080/report/students_all_reports/${userId}`);

    console.log("repo id:", response1.data);
    const reportId = response1.data[response1.data.length - 1].id;

    console.log("MESSAGE: ", props.message)

    formData.append("studentId", userId); // Replace studentId with the actual student ID
    formData.append("reportId", reportId); // Replace reportId with the actual report ID
    formData.append("fileData", file);
    formData.append("reportDescription",props.message)

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
        console.log("success");
        console.log(response.data);
      } catch (error) {
        // Handle error
        console.log("fail");
        console.error(error);
      }
    }
  };

  // const handleDescriptionChange = (event) => {
  //   setDescription(event.target.value);
  // };

  if (file)
    return (
      <div className="upload-confirm">
        <h2>Uploading the following file:</h2>
        <p>{file.name}</p>
        <br></br>
        <TextareaValidator message={props.message} setMessage={props.setMessage} />

        {/* <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        /> */}
{/* 
        {props.afterUpload && props.afterUpload({ file, description })} */}

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
          accept="application/pdf, .doc, .docx"
          ref={inputRef}
        />
        {/* <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        /> */}
        <button className="button" onClick={() => inputRef.current.click()}>
          Select File
        </button>
      </div>
    </>
  );
};

export default FileUpload;
