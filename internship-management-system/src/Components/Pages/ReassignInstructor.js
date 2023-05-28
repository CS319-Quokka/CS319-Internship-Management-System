import React, {useContext, useEffect, useState} from "react";
import { useForm, FormProvider } from "react-hook-form";
import Popup from "../Popup"
import "../Styles/Popup.css"
import Button from '@mui/material/Button';
import {UserContext} from "../UserContext";
import axios from "axios";



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
            <select className="select-menu" id="selector">
                <option value="0">Select instructor</option>
                {instructorOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}


const handleReassign = () => {

}

function ReassignInstructor(props) {
    const methods = useForm();
    const contextType = UserContext;

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


        </div>




    );
}
export default ReassignInstructor;