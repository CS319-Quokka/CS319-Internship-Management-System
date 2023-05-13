import React, { Component, useState, useEffect } from 'react'
import '../Styles/Profile.css'
import pic from "../Images/quokka.png";
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
            firstName: "İdil",
            lastName: "Atmaca",
            userType: "Student",
            university: "Bilkent University",
            mail: "idil.atmaca@ug.bilkent.edu.tr",
            status: "Pending Approval",
            course: "CS299",
            progress: 50,
            notification: "5+",
            instructor: "Eray Tüzün"
        }
    }



    statushandler = (event) => {

        console.log("BASTI");
     event.preventDefault()
    }


    mailhandler = (event) =>{
        event.preventDefault()
    }

    render() {
        {/*
        if (error) {
            return <div> Error !! </div>
        }
        else if (!isLoaded){
            return <div> Loading... </div>
        }
        else {
        */}
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
                                <hr></hr>

                                <div className="row">
                                    <p className="label">Institute:</p>
                                    <p className="value">{this.state.university}</p>
                                </div>
                                <hr></hr>

                                <div class="row">
                                    <p className="label">Course Taken:</p>
                                    <p className="value">{this.state.course}</p>
                                </div>

                                <hr></hr>

                                <div className="row">
                                    <p className="label">Instructor:</p>
                                    <p className="value">{this.state.instructor}</p>
                                </div>

                                <hr></hr>

                                <div className="row">
                                    <p className="label">Instructor Mail:</p>
                                    <p className="value"><em> <a
                                        href="mailto:e.tuzun@cs.bilkent.edu.tr">e.tuzun@bilkent.cs.tr</a></em></p>
                                </div>
                            </div>
                        </div>

                        <div className='progress'>
                            <div className="row">
                                <p className="label">Report Progress:</p>
                                <p className="value">%{this.state.progress}</p>
                            </div>

                            <div className="row">
                                <p className="label">Report Status:</p>
                                <p className="value">{this.state.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
{/*}*/}

export default Profile