import React ,{useState} from "react";
import "./Styles/Popup.css"

import { useForm } from 'react-hook-form';
const Popup = (props) => {

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  

  const handleOperation = (data) => {
    console.log("add");
    console.log(data)
  };
  

  
    console.log("here")

    let courseSelection = null;
    if (selectedValue === "1") {
      courseSelection = <div >

    <label className="input-label">
          <h3 className="input-tag" id="course-tag">Course:</h3>
          <select class="select-menu" id = "course">
        <option value="0">Select course:</option>
        <option value="1">CS299</option>
        <option value="2">CS399</option>
      </select>
    
    </label>  
     
    </div>;
    } 
    
  
  return (
    
    <div className="popup-window">
      
      <div className="popup-header"><h1 className="popup-tag"><span className="tag">Manage Users:</span>{props.name}
      {props.isAdd &&
            <div class="role">
            <select className = "select-menu" id = "type" value={selectedValue} onChange={handleSelectChange}>
              <option value="0">Select role:</option>
              <option value="1">Student</option>
              <option value="2">Instructor</option>
              <option value="3">Teaching Assistant</option>
              <option value="4">Administrative Assistant</option>
              <option value="5">Summer Training Coordinator</option>
            </select>
            </div> 
      }
      
      </h1>
      
      </div>
      <div className="window">
      <div className="add-user">
        {/* <ManageUsersAdd/> */}
      {/* <FormProvider {...methods}>
                  <form>
              <label className="input-label">
                <h3 className="input-tag">First Name:</h3>
                <input className="input-box" type="text" />
              </label>
              <label className="input-label">
              <h3 className="input-tag">Last Name:</h3>
                <input  className="input-box" type="text" />
              </label>
              <label className="input-label">
              <h3 className="input-tag">Email:</h3>
                
                <input className="input-box" type="email" />
              </label>
              <label className="input-label">
              <h3 className="input-tag">Department:</h3>
              
                <input  className="input-box" type="department" />
              </label>
              {courseSelection}
            </form>
            </FormProvider> */}
            
            {props.contents}
            {courseSelection}
         </div>
        
       
        <span className="buttons">
        {props.button}
       
        <button className="button" onClick={props.handleClose}>Cancel</button>
        </span>
        
      </div>
    </div>
  );
};

export default Popup;