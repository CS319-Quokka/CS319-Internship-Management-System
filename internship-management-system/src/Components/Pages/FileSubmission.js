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
        {/* <Dropzone afterUpload = {
             <div className="actions">
             <label className="s-text"> 🗨 Please enter your message here</label> 
       
             <textarea  className = "comment-submission" name = "message" rows="20" cols="70"></textarea>
             
             
           </div>
        } /> */}
      </div>
     
            
      </div>
  );
}
export default FileSubmission;