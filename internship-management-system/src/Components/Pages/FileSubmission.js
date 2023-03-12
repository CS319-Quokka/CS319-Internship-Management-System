import React from "react";
import Dropzone from "../Dropzone";
import "../Styles/FileSubmission.css"
function FileSubmission() {
  // const [images, setImages] = useState([]);
  return (
    <div className="file-menu">
      <div className="file-submission">
        <div className="text">
             <h1 className="text">Upload your internship report here</h1>
        </div>
       
        <Dropzone />
      </div>
     
            
      </div>
  );
}
export default FileSubmission;