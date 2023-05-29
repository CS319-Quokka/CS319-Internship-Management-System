import React, { Component, useState, useEffect } from 'react'
import '../Styles/Profile.css'
import pic from "../Images/quokka.png";
import axios from "axios";
import Button from '@mui/material/Button';
import { Alert, AlertTitle } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
{/*
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(null);
const [profileInfo, setProfileInfo] = useState([]);

useEffect( () => {
    fetch("http://localhost:8080/user_profile")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true)
                setPostList(result)

            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
},[])
*/}


function FormDialog(props) {
    const [open, setOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    useEffect(() => {
        // Auto-hide the alerts after a few seconds
        const timer = setTimeout(() => {
            setShowErrorAlert(false);
            setShowSuccessAlert(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [showErrorAlert, showSuccessAlert]);

    const handleConfirm = async () => {
        const formData = new FormData();
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
        formData.append("newPassword2", confirmPassword);

        try {
            const response = await axios.patch(
                `http://localhost:8080/account/${props.id}`,
                formData
            );

            const responseData = response.data; // Get the response data

            if(responseData === -5){
                setErrorMessage("New password cannot be empty");
                setShowErrorAlert(true);
            } else if(responseData === -4){
                setErrorMessage("Passwords do not match");
                setShowErrorAlert(true);
            } else if (responseData === -3) {
                setErrorMessage("Your password length must be at least 4");
                setShowErrorAlert(true);
            } else if (responseData === -2) {
                setErrorMessage("Account does not exist");
                setShowErrorAlert(true);
            } else if (responseData === -1) {
                setErrorMessage("Old password is not correct");
                setShowErrorAlert(true);
            } else if (responseData === 0) {
                setErrorMessage("New password cannot be the same as the old password");
                setShowErrorAlert(true);
            } else if (responseData === 1) {
                setSuccessMessage("Successfully changed password!");
                setShowSuccessAlert(true);
            }

            setOpen(false);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Change Password
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Old Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={oldPassword}
                        onChange={(event) => setOldPassword(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={newPassword}
                        onChange={handleNewPasswordChange}


                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Enter New Password Again"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
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


class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            userType: "",
            university: "Bilkent University",
            department: "",
            mail: "",
            status: "",
            course: "",
            progress: 0,
            notification: "",
            instructor: "",
            instructorMail:"",

        }
    }
    componentDidMount() {
        console.log("HERE")
        this.getInformation();
    }


    getInformation = async () =>{
        console.log("ID",this.props.userId)
        const id = this.props.userId;

        const accountResponse = await axios.get(`http://localhost:8080/account/get_account/${id}`);
        const userAccount = accountResponse.data;

        console.log("inst:", userAccount);

        const response = await axios.get(`http://localhost:8080/get_all_users/${id}`);
        const info = response.data[0]
        console.log(info);
        console.log("ROLE:",info.role);

        if(info.role === "Instructor"){
            console.log("grader");
        }

        if(info.role === "Student"){
            const instructorID =  info.instructor.userAccount.id;
            const response2 = await axios.get(`http://localhost:8080/account/get_account/${instructorID}`);
            const instructorInfo = response2.data;
            console.log("response2:",instructorInfo);
            console.log("account:",userAccount.name);
            console.log("INFO STAT:", info.status)
            const instructorName = instructorInfo.firstName + " " + instructorInfo.lastName ;

            this.setState({
                course: info.courseCode,
                instructor: instructorName,
                instructorMail:instructorInfo.email,
                status: info.status
            })
        }

        this.setState({
            firstName:userAccount.firstName,
            lastName:userAccount.lastName,
            mail: userAccount.email,
            department: userAccount.department,
            userType:info.role
        })

    }

    statushandler = (event) => {

        console.log("BASTI");
        event.preventDefault()
    }


    mailhandler = (event) =>{
        event.preventDefault()
    }

    render() {
        const {userType} = this.state;
        return (
            <div className='page'>
                <div className='container'>
                    <div className='user-container'>
                        <h1><strong>{this.state.firstName} {this.state.lastName}</strong></h1>
                        <br></br>
                        <img className='profilePic' src={pic} alt="Profile"/>
                        <p><em>{this.state.userType}</em></p><br/>
                        <FormDialog id = {this.props.userId} />
                        <br></br>
                    </div>
                    <div className='right-containers'>

                        <div className="info-container">
                            <div className="row">
                                <p className="label">Mail:</p>
                                <p className="value">{this.state.mail}</p>
                            </div>
                            <hr />

                            <div className="row">
                                <p className="label">Institute:</p>
                                <p className="value">{this.state.university}</p>
                            </div>
                            <hr />

                            <div className="row">
                                <p className="label">Department:</p>
                                <p className="value">{this.state.department}</p>
                            </div>

                        </div>

                        {userType === 'Student' && (
                            <div className="additionalInfo">
                                <div className="row">
                                    <p className="label">Course Taken:</p>
                                    <p className="value">{this.state.course}</p>
                                </div>
                                <hr />

                                <div className="row">
                                    <p className="label">Instructor Mail:</p>
                                    <p className="value">
                                        <em>
                                            <a href={`mailto:${this.state.instructorMail}`}>{this.state.instructorMail}</a>
                                        </em>
                                    </p>
                                </div>
                                <hr />

                                <div className="row">
                                    <p className="label">Report Status:</p>
                                    <p className="value">{this.state.status}</p>
                                </div>
                            </div>
                        )}

                        {userType === 'Instructor' && (

                            <div class = "additionalInfo">
                                <div class="row">
                                    <p className="label"># of students:</p>
                                    <p className="value">{this.state.numOfStudents}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
{/*}*/}

export default Profile