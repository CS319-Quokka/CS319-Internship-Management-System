import React, { useState, useRef } from "react";
import axios from "axios";

const DragDropFiles = (props) => {
  const [file, setFile] = useState(null);
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

  const handleUpload = async (event) => {
    event.preventDefault();


    console.log("file: ", file)

    if (file) {


    const formData = new FormData();
    //formData.append("reportId", 1); // Replace reportId with the actual report ID
    console.log(file.name);
    formData.append("reportId",1)
    formData.append("fileName", file.name);
    formData.append("fileData", file);
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

export default DragDropFiles;
