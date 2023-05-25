import React, {useEffect, useState} from "react";
import { useForm, FormProvider } from "react-hook-form";
import Popup from "../Popup"
import "../Styles/Popup.css"
import Button from '@mui/material/Button';
import axios from "axios";
import Typography from "@mui/material/Typography";
import {TaOptionsList} from './FetchUserList';
import {InstructorOptionsList} from "./FetchUserList";

function ManageUsersAdd(props) {
    const methods = useForm();
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedCode, setSelectedCode] = useState("");

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    //values are CS299 and CS399
    const handleSelectedCode = (event) => {
        setSelectedCode(event.target.value);
    };

    const handleAddUser = async () => {
        console.log("selectedValue:", selectedValue);
        console.log("selectedCode:", selectedCode);

        const formData = {
            firstName: methods.getValues("firstName"),
            lastName: methods.getValues("lastName"),
            email: methods.getValues("email"),
            department: methods.getValues("department"),
            role: selectedValue,
            courseCode: selectedCode
        };

        console.log("formData:", formData);

        const addAccountResponse = await axios.post("http://localhost:8080/account", formData);
        if (addAccountResponse.data.email !== formData.email) {
            console.log("account with this email already exists");
            // TODO: already has an account add new user role to account
        } else {

            console.log(addAccountResponse.data); // Handle the response if needed

            console.log("User Account created successfully.");


        }

        const accountResponse = await axios.get(`http://localhost:8080/account/get_account_by_email/${formData.email}`);

        const userData = {
            accountId: accountResponse.data.id
            // courseCode: selectedCode,
            // instructorId: methods.get
            // teachingAssistantId: methods.get
            // companyName: methods.get
        };


        if (selectedValue === "Administrative Assistant") {
            const addAdministrativeAssistantResponse = await axios.post("http://localhost:8080/administrative_assistant", userData);
            // TODO
            if (addAdministrativeAssistantResponse.data.role !== formData.role) {
                console.log("Error: Administrative Assistant not added");
            } else {
                console.log(addAdministrativeAssistantResponse.data); // Handle the response if needed
                console.log("Administrative Assistant added successfully.");
            }
        } else if (selectedValue === "Instructor") {
            const addInstructorResponse = await axios.post("http://localhost:8080/instructor", userData);

            if (addInstructorResponse.data.role !== formData.role) {
                console.log("Error: Instructor not added");
            } else {
                console.log(addInstructorResponse.data); // Handle the response if needed
                console.log("Instructor added successfully.");
            }
        } else if (selectedValue === "Teaching Assistant") {
            const addTeachingAssistantResponse = await axios.post("http://localhost:8080/teaching_assistant", userData);
            if (addTeachingAssistantResponse.data.role !== formData.role) {
                console.log("Error: Teaching Assistant not added");
            } else {
                console.log(addTeachingAssistantResponse.data); // Handle the response if needed
                console.log("Teaching Assistant added successfully.");
            }

        } else if (selectedValue === "Student") {
            // TODO
        } else if (selectedValue === "Summer Training Coordinator") {
            const addSummerTrainingCoordinatorResponse = await axios.post("http://localhost:8080/summer_training_coordinator", userData);
            if (addSummerTrainingCoordinatorResponse.data.role !== formData.role) {
                console.log("Error: Summer Training Coordinator not added");
            } else {
                console.log(addSummerTrainingCoordinatorResponse.data); // Handle the response if needed
                console.log("Summer Training Coordinator added successfully.");
            }
        } else {
            console.log("Error: Invalid role");
        }


        // Reset the form
        methods.reset();

    };

    const handleOperation = (data) => {
        console.log("add");
        console.log(data)
    };

    let courseSelection = null;
    if (selectedValue === "Student") {
        courseSelection =
            <div>
                <label className="input-label">
                    <h3 className="input-tag" id="course-tag">Course:</h3>
                    <select className="select-menu" id="selector" value={selectedCode} onChange={handleSelectedCode}>
                        <option value="0">Select course</option>
                        {
                            /*
                            the department selection is not working. and the values can be switched to {departmentCode + 299 .. }
                             instead of 1 and 2. if that's how they are stored, it might fix the issue but idk
                             about the department value part.
                             */
                        }
                        <option value="1">{methods.getValues("department")}299</option>
                        <option value="2">{methods.getValues("department")}399</option>
                    </select>

                </label>
                <InstructorOptionsList methods={methods} />
                <TaOptionsList methods={methods} />
            </div>;
    }

  return (

    <div className="add-user">


      {/* {console.log("ROLE: ",props.role )}
      {console.log("COURSE CODE: ",props.code )} */}
      <FormProvider {...methods}>
        <form >
            <h1>Enter the information of the user to be added</h1>
            <hr></hr>
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
        <div className="add-button">
            <Button variant="outlined" onClick={handleAddUser}>ADD USER</Button>
        </div>


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

