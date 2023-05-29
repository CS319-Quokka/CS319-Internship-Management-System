import React, {useEffect, useState} from "react";
import { useForm, FormProvider } from "react-hook-form";
import Popup from "../Popup"
import "../Styles/Popup.css"
import Button from '@mui/material/Button';
import axios from "axios";
import Typography from "@mui/material/Typography";
import {Alert, AlertTitle} from "@mui/material";



function InstructorOptionsList({ methods }) {
    const [instructorOptions, setInstructorOptions] = useState([]);

	const department = methods.watch("department");

    useEffect(() => {
        fetchInstructorOptions()
            .then((options) => setInstructorOptions(options))
            .catch((error) => console.log(error));
    }, [department]);

    const fetchInstructorOptions = async () => {
        try {

            const response = await axios.get(`http://localhost:8080/instructor?department=${department}`); //link to the API
            const instructors = response.data;

			 const instructorOptions = await Promise.all(instructors.map(async (instructor) => {
				console.log("instructor.userAccount.id: ", instructor.userAccount.id);
				const accountResponse = await axios.get(`http://localhost:8080/account/get_account/${instructor.userAccount.id}`);
				const account = accountResponse.data;

				return {
					value: instructor.id,
					label: `${account.firstName} ${account.lastName}`,
				};
			}));

			return instructorOptions;

        } catch (error) {
            throw new Error('Failed to fetch instructors.');
        }
    };

    return (
        <label className="input-label">
            <h3 className="input-tag" id="instructor-tag">Instructor:</h3>
            <select className="select-menu" id="selector" {...methods.register("instructorId")}>
                <option value="0">Select instructor</option>
                {instructorOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}


function TaOptionsList({ methods }) {
    const [TaOptions, setTaOptions] = useState([]);

	const department = methods.watch("department");

    useEffect(() => {
        fetchTaOptions()
            .then((options) => setTaOptions(options))
            .catch((error) => console.log(error));
    }, [department]);

    const fetchTaOptions = async () => {
        try {

            const response = await axios.get(`http://localhost:8080/teaching_assistant?department=${department}`); //link to the API
            const teachingAssistants = response.data;

			const teachingAssistantOptions = await Promise.all(teachingAssistants.map(async (teachingAssistant) => {

				const accountResponse = await axios.get(`http://localhost:8080/account/get_account/${teachingAssistant.userAccount.id}`);
				const account = accountResponse.data;

				return {
					value: teachingAssistant.id,
					label: `${account.firstName} ${account.lastName}`,
				};
			}));

			// Return the options as an array
			return teachingAssistantOptions;

            // // Return the options as an array
            // return data.map((ta) => ({
            //     value: ta.id,
            //     label: ta.name,
            // }));
        } catch (error) {
            throw new Error('Failed to fetch TAs.');
        }
    };

    return (
        <label className="input-label">
            <h3 className="input-tag" id="ta-tag">Teaching Assistant:</h3>
            <select className="select-menu" id="selector" {...methods.register("teachingAssistantId")}>
                <option value="0">Select TA</option>
                {TaOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}

function StudentOptionsList() {
	const methods = useForm();
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

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
    useEffect(() => {
        // Auto-hide the alerts after a few seconds
        const timer = setTimeout(() => {
            setShowErrorAlert(false);
            setShowSuccessAlert(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [showErrorAlert, showSuccessAlert]);

  //IF SELECTED CODE IS 1 IT IS CS299, IF SELECTED CODE IS 2 IT IS CS399
  const handleSelectedCode = (event) => {
    setSelectedCode(event.target.value);
  };

  const handleAddUser = async () => {

    const formData = {
        firstName: methods.getValues("firstName"),
        lastName: methods.getValues("lastName"),
        email: methods.getValues("email"),
        department: methods.getValues("department"),
        role: selectedValue,
        courseCode: selectedCode
    };

    const addAccountResponse = await axios.post("http://localhost:8080/account", formData);
    if ( addAccountResponse.data.email !== formData.email) {
        setErrorMessage("Account with this email already exists.");
        setShowErrorAlert(true);
		// TODO: already has an account add new user role to account
    }
    else {
        setSuccessMessage("User Account created successfully.");
        setShowSuccessAlert(true);
    }

	const accountResponse = await axios.get(`http://localhost:8080/account/get_account_by_email/${formData.email}`);

	const userData = {
        accountId: accountResponse.data.id,
        courseCode: selectedCode,
		instructorId: methods.get,
		teachingAssistantId: methods.get
	};

    if(selectedValue === "Administrative Assistant"){
		const addAdministrativeAssistantResponse = await axios.post("http://localhost:8080/administrative_assistant", userData);
		// TODO
		if ( addAdministrativeAssistantResponse.data.role !== formData.role) {
            setErrorMessage("Error: Administrative Assistant not added.");
            setShowErrorAlert(true);
		}
		else {
		    console.log(addAdministrativeAssistantResponse.data); // Handle the response if needed
            setSuccessMessage("Administrative Assistant added successfully.");
            setShowSuccessAlert(true);
		}
	}
	else if(selectedValue === "Instructor"){
		const addInstructorResponse = await axios.post("http://localhost:8080/instructor", userData);

		if ( addInstructorResponse.data.role !== formData.role) {
            setErrorMessage("Error: Instructor not added.");
            setShowErrorAlert(true);
		}
		else {
		console.log(addInstructorResponse.data); // Handle the response if needed
            setSuccessMessage("Instructor added successfully.");
            setShowSuccessAlert(true);
		}
	}
	else if(selectedValue === "Teaching Assistant"){
		const addTeachingAssistantResponse = await axios.post("http://localhost:8080/teaching_assistant", userData);
		if ( addTeachingAssistantResponse.data.role !== formData.role) {
            setErrorMessage("Error: Teaching Assistant not added.");
            setShowErrorAlert(true);
		}
		else {
		console.log(addTeachingAssistantResponse.data); // Handle the response if needed
            setSuccessMessage("Teaching Assistant added successfully.");
            setShowSuccessAlert(true);
		}

	}
	else if(selectedValue === "Student"){
        var courseCode = methods.getValues("department") + "299";
        if(selectedCode === "2"){
            courseCode = methods.getValues("department") + "399";
        }
        const formData = {

            accountId: accountResponse.data.id,
            instructorId: methods.getValues("instructorId"),
            teachingAssistantId: methods.getValues("teachingAssistantId"),
            courseCode: courseCode
        }

        const addStudentResponse = await axios.post("http://localhost:8080/student", formData);
        if (addStudentResponse.data.role !== formData.role) {
            setErrorMessage("Error: Student not added.");
            setShowErrorAlert(true);
        }
        else {
            console.log(addStudentResponse.data);
            setSuccessMessage("Student added successfully.");
            setShowSuccessAlert(true);
        }
    }
	else if(selectedValue === "Summer Training Coordinator"){
		const addSummerTrainingCoordinatorResponse = await axios.post("http://localhost:8080/summer_training_coordinator", userData);
		if ( addSummerTrainingCoordinatorResponse.data.role !== formData.role) {
            setErrorMessage("Error: Summer Training Coordinator not added.");
            setShowErrorAlert(true);
		}
		else {
		console.log(addSummerTrainingCoordinatorResponse.data); // Handle the response if needed
            setSuccessMessage("Summer Training Coordinator added successfully.");
            setShowSuccessAlert(true);
		}
	}
	else{
        setErrorMessage("Error: Invalid role. User will be added without a role.");
        setShowErrorAlert(true);
	}


	// Reset the form
	methods.reset();

};

  const handleOperation = (data) => {
    console.log("add");
    console.log(data)
  };

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
        {selectedValue === "Student" &&
			<div>
            <label className="input-label">
                  <h3 className="input-tag" id="course-tag">Course:</h3>
                  <select className="select-menu" id = "selector" value = {selectedCode} onChange={handleSelectedCode}>
                    <option value="0">Select course</option>
                    <option value="1">{methods.getValues("department")}299</option>
                    <option value="2">{methods.getValues("department")}399</option>
                  </select>
            </label>
                <InstructorOptionsList methods={methods} />
                <TaOptionsList methods={methods} />
            </div>
		}

        </form>


      </FormProvider>
        <div className="add-button">
            <Button variant="outlined" onClick={handleAddUser}>ADD USER</Button>
        </div>
        <div id="alertcontainer">
            <Alert
                severity="error"
                onClose={() => setShowErrorAlert(false)}
                sx={{ display: showErrorAlert ? 'filled' : 'none' }}
            >
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
            <Alert
                severity="success"
                onClose={() => setShowSuccessAlert(false)}
                sx={{ display: showSuccessAlert ? 'filled' : 'none' }}
            >
                <AlertTitle>Success</AlertTitle>
                {successMessage}
            </Alert>
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