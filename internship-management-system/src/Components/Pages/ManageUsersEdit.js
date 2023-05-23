import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Popup from "../Popup"
import "../Styles/Popup.css"
import Button from '@mui/material/Button';


const handleEditUser = () => {

}

function ManageUsersEdit(props) {
    const methods = useForm();

    return (

        <div className="edit-user">

            <FormProvider {...methods}>
                <form >
                    <h1>props </h1>
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

                </form>

            </FormProvider>


        </div>


    );
}
export default ManageUsersEdit;