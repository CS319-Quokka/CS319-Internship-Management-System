import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Popup from "../Popup"
import "../Styles/Popup.css"
import Button from '@mui/material/Button';
import {InstructorOptionsList} from "./FetchUserList";




const handleReassign = () => {

}

function ReassignInstructor(props) {
    const methods = useForm();

    return (

        <div className="reassign-instructor">

            <FormProvider {...methods}>
                <form >
                    <h1>Student's information: </h1>
                    {/*  <h1>{props.user}</h1>
                        */}
                    <h1>Student's current instructor</h1>


                    <h1>Choose the new instructor </h1>
                    <InstructorOptionsList methods={methods}/>

                </form>

            </FormProvider>


        </div>




    );
}
export default ReassignInstructor;