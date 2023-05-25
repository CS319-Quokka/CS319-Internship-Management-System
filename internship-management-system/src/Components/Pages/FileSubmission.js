import React from "react";
import FileUpload  from "../Dropzone";
import "../Styles/FileSubmission.css"
function FileSubmission(props) {
  // const [images, setImages] = useState([]);

  
  return (
    <div className="page">
      <div className="uploads">
        <div className= "uploadmessage">
          <h2>📁Upload your summer training report here.</h2>
          <br></br>
        </div>
       
       <FileUpload  id = {props.userId}  />
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