import { useState, useRef } from "react";

const DragDropFiles = () => {
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
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("Files", files);
    console.log(formData.getAll())
    // fetch(
    //   "link", {
    //     method: "POST",
    //     body: formData
    //   }  
    // )
  };

  if (files) return (
    <div className="uploads">

      <br></br>
        <ul className="file-name">
            {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li> )}
        </ul>
        
        <br></br>

        <div className="actions">

               <label className="s-text"> Please enter your message here</label> <br></br>
               <br></br>
                <textarea  className = "comment-submission" name = "message" rows="20" cols="70"></textarea>


            <div className="button-layout">
            <button  className = "button" onClick={() => setFiles(null)}>Cancel</button>
            
  
            <button  className = "button" onClick={handleUpload}>Upload</button>
            </div>
           
        </div>
    </div>
  )

  return (
    <>
        <div 
            className="dropzone"
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
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
          <button className = "button" onClick={() => inputRef.current.click()}>Select Files</button>
        </div>
    </>
  );
};

export default DragDropFiles;