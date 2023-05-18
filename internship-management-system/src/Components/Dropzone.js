import { useState, useRef } from "react";
import "./Styles/FileSubmission.css"
import axios from "axios";
const DragDropFiles = (props) => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files)
  };
  
  // send files to the server // learn from my other video
  const handleUpload = async(event) => {

    event.preventDefault();
   
    axios.post('http://localhost:8080/report', null)
      .then((response) => {
        // Handle success response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    
  };

  if (files) return (
    <div className="upload-confirm">
      <h2>Uploading the following file(s):</h2>
        <ul className="file-name">
            {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li> )}
        </ul>


        {props.afterUpload}

        <div className="button-layout">
               <button  className = "button" onClick={() => setFiles(null)}>Cancel</button>
               <button  className = "button" onClick={handleUpload}>Upload</button>
             </div>

     
    </div>
  )

  return (
    <>
        <div id = "dropzone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
          <h2>Drag and Drop Files to Upload</h2>
          <h3>Or</h3>
          <input 
            type="file"
            multiple
            onChange={(event) => setFiles(event.target.files)}
            hidden
            accept="application/pdf, .doc, .docx"
            ref={inputRef}
          />
          <button className = "button" onClick={() => inputRef.current.click()}>Select Files</button>
        </div>
    </>
  );
};

export default DragDropFiles;