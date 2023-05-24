import React, {useEffect, useState} from "react";
import { useForm, FormProvider } from "react-hook-form";
import Popup from "../Popup"
import "../Styles/Popup.css"
import Button from '@mui/material/Button';
import axios from "axios";
import Typography from "@mui/material/Typography";



function InstructorOptionsList() {
    const [instructorOptions, setInstructorOptions] = useState([]);

    useEffect(() => {
        fetchInstructorOptions()
            .then((options) => setInstructorOptions(options))
            .catch((error) => console.log(error));
    }, []);

    const fetchInstructorOptions = async () => {
        try {
            // Make an API call or database query to retrieve the options
            const response = await axios.get('...'); //link to the API
            const data = response.data;

            // Return the options as an array
            return data.map((instructor) => ({
                value: instructor.id,
                label: instructor.name,
            }));
        } catch (error) {
            throw new Error('Failed to fetch instructors.');
        }
    };

    return (
        <label className="input-label">
            <h3 className="input-tag" id="instructor-tag">Instructor:</h3>
            <select className="select-menu" id="selector">
                <option value="0">Select instructor</option>
                {instructorOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}


function TaOptionsList() {
    const [TaOptions, setTaOptions] = useState([]);

    useEffect(() => {
        fetchTaOptions()
            .then((options) => setTaOptions(options))
            .catch((error) => console.log(error));
    }, []);

    const fetchTaOptions = async () => {
        try {
            const response = await axios.get('...'); //link to the API
            const data = response.data;

            // Return the options as an array
            return data.map((ta) => ({
                value: ta.id,
                label: ta.name,
            }));
        } catch (error) {
            throw new Error('Failed to fetch TAs.');
        }
    };

    return (
        <label className="input-label">
            <h3 className="input-tag" id="ta-tag">Teaching Assistant:</h3>
            <select className="select-menu" id="selector">
                <option value="0">Select TA</option>
                {TaOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}

function StudentOptionsList() {
    const [studentOptions, setStudentOptions] = useState([]);

    useEffect(() => {
        fetchStudentOptions()
            .then((options) => setStudentOptions(options))
            .catch((error) => console.log(error));
    }, []);

    const fetchStudentOptions = async () => {
        try {
            const response = await axios.get('...'); //link to the API
            const data = response.data;

            // Return the options as an array
            return data.map((student) => ({
                value: student.id,
                label: student.name,
            }));
        } catch (error) {
            throw new Error('Failed to fetch students.');
        }
    };


    return (
        <label className="input-label">
            <h3 className="input-tag" id="student-tag">Student:</h3>
            <select className="select-menu" id="selector">
                <option value="0">Select student</option>
                {studentOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}

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
      courseSelection =
          <div >
            <label className="input-label">
                  <h3 className="input-tag" id="course-tag">Course:</h3>
                  <select className="select-menu" id = "selector" value = {selectedCode} onChange={handleSelectedCode}>
                <option value="0">Select course</option>
                <option value="1">CS299</option>
                <option value="2">CS399</option>
              </select>

            </label>
          <InstructorOptionsList/>
          <TaOptionsList/>

    </div>;
    }


  return (

    <div className="add-user">


      {/* {console.log("ROLE: ",props.role )}
      {console.log("COURSE CODE: ",props.code )} */}
      <FormProvider {...methods}>
        <form >
            <h1  >Enter the information of the user to be added</h1>
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

