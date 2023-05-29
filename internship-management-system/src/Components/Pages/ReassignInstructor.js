import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "../UserContext";
import { useForm, FormProvider } from "react-hook-form";
import Popup from "../Popup"
import "../Styles/Popup.css"
import Button from '@mui/material/Button';
import axios from "axios";
import {Alert, AlertTitle} from "@mui/material";



function InstructorOptionsList({ methods }) {
    const [instructorOptions, setInstructorOptions] = useState([]);

    const department = methods.watch("department");

    const { userId } = useContext(UserContext);

    useEffect(() => {
        fetchInstructorOptions(userId)
            .then((options) => setInstructorOptions(options))
            .catch((error) => console.log(error));
    }, [department]);

    const fetchInstructorOptions = async (userId) => {
        try {

            const studentResponse = await axios.get(`http://localhost:8080/student/${userId}`);
            const department = studentResponse.data.userAccount.department;

            const response = await axios.get(`http://localhost:8080/instructor?department=${department}`);
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
                <option value="0">select instructor</option>
                {instructorOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}

function ReassignInstructor(props) {

    const methods = useForm();
    const { userId } = useContext(UserContext);

    const handleReassignStudent = async () => {

        const newInstructorId = +(methods.getValues("instructorId"));
        const formData = {

            "newInstructorId": newInstructorId
        }

        const response = await axios.patch(`http://localhost:8080/reassign/${userId}`, formData);

        if(response.data.instructor.id !== formData.newInstructorId){

            console.log("student couldn't be reassigned");

        } else {
            console.log("student reassigned");
        }
    }


    return (

        <div className="reassign-instructor">

            <FormProvider {...methods}>
                <form >
                    <h1>Student's information: </h1>
                    <h1></h1>
                    {/*  <h1>{props.user}</h1>
                        */}
                    <h1>Student's current instructor</h1>
                    <h1>Choose the new instructor </h1>
                    <InstructorOptionsList methods={methods} />
                </form>
            </FormProvider>
            <div className="add-button">
                <Button variant="outlined" onClick={handleReassignStudent}>Reassign Student</Button>
            </div>
        </div>
    );
}
export default ReassignInstructor;