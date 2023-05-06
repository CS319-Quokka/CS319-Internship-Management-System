import React from "react";
import Dropzone from "../Dropzone";
import "../Styles/FileSubmission.css"
function FileSubmission() {
  // const [images, setImages] = useState([]);
  return (
    <div className="page">
      <div className="uploads">
        <div className= "uploadmessage">
          <h2>📁Upload your summer training report here.</h2>
          <br></br>
        </div>
       
        <Dropzone />
      </div>
     
            
      </div>
  );
}
export default FileSubmission;