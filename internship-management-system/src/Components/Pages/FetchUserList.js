import React, {useEffect, useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";


export function InstructorOptionsList({ methods }) {
    const [instructorOptions, setInstructorOptions] = useState([]);

    const department = methods.watch("department");

    useEffect(() => {
        fetchInstructorOptions()
            .then((options) => setInstructorOptions(options))
            .catch((error) => console.log(error));
    }, [department]);

    const fetchInstructorOptions = async () => {
        try {
            // Make an API call or database query to retrieve the options
            console.log("methods.getValues:" , methods.getValues("department"));
            const response = await axios.get(`http://localhost:8080/instructor?department=${department}`); //link to the API
            const instructors = response.data;

            console.log(instructors);

            // Now fetch each instructor's UserAccount data
            const instructorOptions = await Promise.all(instructors.map(async (instructor) => {
                console.log("instructor.userAccount.id: ", instructor.userAccount.id);
                const accountResponse = await axios.get(`http://localhost:8080/account/get_account/${instructor.userAccount.id}`);
                const account = accountResponse.data;

                return {
                    value: instructor.id,
                    label: `${account.firstName} ${account.lastName}`,
                };
            }));

            // Return the options as an array
            return instructorOptions;


            // // Return the options as an array
            // return data.map((instructor) => ({
            //     value: instructor.id,
            //     label: instructor.name,
            // }));
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


export function TaOptionsList({ methods }) {
    const [TaOptions, setTaOptions] = useState([]);

    const department = methods.watch("department");

    useEffect(() => {
        fetchTaOptions()
            .then((options) => setTaOptions(options))
            .catch((error) => console.log(error));
    }, [department]);

    const fetchTaOptions = async () => {
        try {
            console.log("methods.getValues:" , methods.getValues("department"));
            const response = await axios.get(`http://localhost:8080/teaching_assistant?department=${department}`); //link to the API
            const teachingAssistants = response.data;

            console.log(teachingAssistants);
            // Now fetch each instructor's UserAccount data
            const teachingAssistantOptions = await Promise.all(teachingAssistants.map(async (teachingAssistant) => {
                console.log("teachingAssistant.userAccount.id: ", teachingAssistant.userAccount.id);
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
            <select className="select-menu" id="selector">
                <option value="0">Select TA</option>
                {TaOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}

export function StudentOptionsList() {
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
