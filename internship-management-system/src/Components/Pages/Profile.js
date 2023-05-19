import React, { Component, useState, useEffect } from 'react'
import '../Styles/Profile.css'
import pic from "../Images/quokka.png";
import axios from "axios";
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
            instructorMail:""
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
            
                            <button className='button'>Change Password</button>
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