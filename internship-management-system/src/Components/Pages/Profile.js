


import React, { Component } from 'react'
import '../Styles/Profile.css'
import pic from "../Images/quokka.png";

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "İdil",
            lastName: "Atmaca",
            userType: "Student",
            university: "Bilkent University",
            mail: "idil.atmaca@ug.bilkent.edu.tr",
            status: "pending application",
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
        return (
            <div className='container'>

                    
                    
                    <div className='user-container'>
                        

                        <h1 > <strong>{this.state.firstName} {this.state.lastName}</strong> </h1> 
                        <br></br>

                        <img className='profilePic' src={pic} alt="Profile" />
                        <p><em>{this.state.userType}</em></p><br />
                        
                     

                        
                      <button className='button'>Change Password</button> <br></br>
                        

                    </div>


                    <div className='right-containers'>

                        <div class="info-container">

                            <div class="row">
                                <p class="label">Mail:</p>
                                <p class="value">{this.state.mail}</p>
                            </div>
                            <hr></hr>

                            <div class="row">
                                <p class="label">Institute:</p>
                                <p class="value">{this.state.university}</p>
                            </div>
                            <hr></hr>

                            <div class="row">
                                <p class="label">Course Taken:</p>
                                <p class="value">{this.state.course}</p>
                                </div>

                            <hr></hr>

                            <div class="row">
                            <p class="label">Instructor:</p>
                            <p class="value">{this.state.instructor}</p>
                            </div>    

                            <hr></hr>
                            
                            <div class="row">
                            <p class="label">Instructor Mail:</p>
                            <p class="value"><em> <a href="mailto:e.tuzun@cs.bilkent.edu.tr">e.tuzun@bilkent.cs.tr</a></em></p>
                            </div>     
                        </div>    
                    </div>    

                    <div className='progress'>
                        <div class="row">
                                <p class="label">Report Progress:</p>
                                <p class="value">%{this.state.progress}</p>
                        </div>  

                         <div class="row">
                                <p class="label">Report Status:</p>
                                <p class="value">Pending Approval</p>
                        </div>   
                    </div>

            </div>

/* 
                        <div className='instructor'>

                        <label >Instructor :  {this.state.instructor}</label><br />

                        <label >Instructor Mail : <em> <a href="mailto:e.tuzun@bilkent.cs.tr">e.tuzun@bilkent.cs.tr</a></em></label><br />


                        </div> */

                    




                    



                    
           
            
        )
    }
}

export default Profile