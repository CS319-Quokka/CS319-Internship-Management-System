import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Popup from "../Popup"
import "../Styles/Popup.css"
import Button from '@mui/material/Button';



const handleReassign = () => {

}

function ReassignInstructor(props) {
    const methods = useForm();

    return (

        <div className="reassign-instructor">

            <FormProvider {...methods}>
                <form >


            <h1>hi</h1>


                </form>

            </FormProvider>


        </div>


    );
}
export default ReassignInstructor;