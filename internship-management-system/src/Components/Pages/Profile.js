import React, { Component, useState, useEffect } from 'react'
import '../Styles/Profile.css'
import pic from "../Images/quokka.png";
import axios from "axios";
import Button from '@mui/material/Button';
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
    const [changeStatus, setChangeStatus] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setChangeStatus("");
    };
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleConfirm = async () => {

        const formData = new FormData();
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
        formData.append("newPassword2", confirmPassword);

        const response = await axios.patch(
            `http://localhost:8080/account/${props.id}`,
            formData,
        )
        if (response === -3) {
            console.log("Confirmation password does not match new.");
            setChangeStatus("Confirmation password does not match new.");
        }
        else if (response === -2){
            console.log("Account does not exist");
            setChangeStatus("")
        }
        else if(response === -1){
            console.log("Old password is not correct");
            setChangeStatus("Old password is not correct");
        }
        else if(response === 0){
            console.log("New password cannot be the same as old password");
            setChangeStatus("New password cannot be the same as the old password");
        }
        else if(response === 1){
            console.log("Successfully changed password!");
            setChangeStatus("Successfully changed password!");
        }
        //setOpen(false);
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
            {changeStatus && (
                <p className="change-status-message">{changeStatus}</p>
            )}
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

        if(info.role === "instructor"){
            console.log("grader");
        }

        if(info.role === "student"){
            const instructorID =  info.instructor.userAccount.id;
            const response2 = await axios.get(`http://localhost:8080/account/get_account/${instructorID}`);
            const instructorInfo = response2.data;
            console.log("response2:",instructorInfo);
            console.log("account:",userAccount.name);
            const instructorName = instructorInfo.firstName + " " + instructorInfo.lastName ;

            this.setState({
                course: info.courseCode,
                instructor: instructorName,
                instructorMail:instructorInfo.email
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

                        <FormDialog id = {this.props.userId} onConfirm={this.handleConfirm}/>
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

                        {userType === 'student' && (
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

                        {userType === 'instructor' && (

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