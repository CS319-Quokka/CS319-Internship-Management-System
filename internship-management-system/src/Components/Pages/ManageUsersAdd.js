import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Popup from "../Popup"
import "../Styles/Popup.css"
import Button from '@mui/material/Button';



function ManageUsersAdd(props) {
  const methods = useForm();
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCode, setSelectedCode] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //IF SELECTED CODE IS 1 IT IS CS299, IF SELECTED CODE IS 2 IT IS CS399
  const handleSelectedCode = (event) => {
    setSelectedCode(event.target.value);
  };

  const handleAddUser = () => {
     console.log(selectedValue)
     console.log(selectedCode)
  }

  const handleOperation = (data) => {
    console.log("add");
    console.log(data)
  };

  
    

    let courseSelection = null;
    if (selectedValue === "Student") {
      courseSelection = <div >
        

    <label className="input-label">
          <h3 className="input-tag" id="course-tag">Course:</h3>
          <select className="select-menu" id = "course" value = {selectedCode} onChange={handleSelectedCode}>
        <option value="0">Select course:</option>
        <option value="1">CS299</option>
        <option value="2">CS399</option>
      </select>
    
    </label>  
     
    </div>;
    } 

  
  return (

    <div className="add-user">


      {/* {console.log("ROLE: ",props.role )}
      {console.log("COURSE CODE: ",props.code )} */}
      <FormProvider {...methods}>
        <form >
          <label className="input-label">
            <h3 className="input-tag">First Name:</h3>
            <input
              className="input-box"
              type="text"
              {...methods.register("firstName", { required: true })}
            />
          </label>
          <label className="input-label">
            <h3 className="input-tag">Last Name:</h3>
            <input
              className="input-box"
              type="text"
              {...methods.register("lastName", { required: true })}
            />
          </label>
          <label className="input-label">
            <h3 className="input-tag">Email:</h3>
            <input
              className="input-box"
              type="email"
              {...methods.register("email", { required: true })}
            />
          </label>
          <label className="input-label">
            <h3 className="input-tag">Department:</h3>
            <input
              className="input-box"
              type="text"
              {...methods.register("department", { required: true })}
            />
          </label>

          

          {/* {isFormSubmitted && !formState.isValid && (
            <div className="error-message">Please fill out all fields.</div>
          )} */}


          <div className="add-user">

         
                <div className="role">
                <select className = "select-menu" id = "type" value={selectedValue} onChange={handleSelectChange}>
                  <option value="0">Select role:</option>
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Teaching Assistant">Teaching Assistant</option>
                  <option value="Administrative Assistant">Administrative Assistant</option>
                  <option value="Summer Training Coordinator">Summer Training Coordinator</option>
                </select>
                </div> 
          
         </div>
        {courseSelection}
          
        </form>
     

      </FormProvider>
      <Button variant="outlined" onClick={handleAddUser}>ADD USER</Button>
      


    </div>

  );
}

export default ManageUsersAdd;




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
      
