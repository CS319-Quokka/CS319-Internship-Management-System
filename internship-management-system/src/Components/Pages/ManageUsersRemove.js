import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Popup from "../Popup"
import "../Styles/Popup.css"
import Button from '@mui/material/Button';


const handleRemoveUser = () => {

}


function ManageUsersRemove(props) {
    const methods = useForm();

    return (

        <div className="remove-user">

            <FormProvider {...methods}>
                <form >

                    <h1>hi</h1>
                    <h1>{props.name}</h1>

                </form>

            </FormProvider>


        </div>


    );
}
export default ManageUsersRemove;