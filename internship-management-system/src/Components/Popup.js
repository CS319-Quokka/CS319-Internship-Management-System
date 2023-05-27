import React ,{useState, useEffect, useContext} from "react";
import "./Styles/Popup.css"
import Button from '@mui/material/Button';
import axios from 'axios';
import { UserContext } from './UserContext';


const Popup = (props) => {
  const userContext = useContext(UserContext);

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCode, setSelectedCode] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSelectedCode = (event) => {
    setSelectedCode(event.target.value);
  };

  const handleAddUser = () => {
     props.handleSelected(selectedValue,selectedCode)
  }

  const handleOperation = (data) => {
    console.log("add");
    console.log(data)
  };

  
    console.log("CURRENT ID:",userContext.userId )
/*
    let courseSelection = null;
    if (selectedValue === "Student") {
      courseSelection = <div >
        <label className="input-label">
              <h3 className="input-tag" id="course-tag">Course:</h3>
              <select className="select-menu" id = "course">
            <option value="0">Select course:</option>
            <option value="1">CS299</option>
            <option value="2">CS399</option>
          </select>

        </label>


      </div>;
    } 
  */
  
  return (
    
    <div className="popup-window">
      
      <div className="popup-header"><h1 className="popup-tag"><span className="tag">{props.tag}</span>{props.name}

      <button className="button" id= "exit" onClick={props.handleClose}>x</button>
      </h1>
      
      </div>
      <div className="window">




        <span className="buttons">
           {props.contents}
        {props.button}

       
       
        </span>
        
      </div>
    </div>
  );
};

export default Popup;