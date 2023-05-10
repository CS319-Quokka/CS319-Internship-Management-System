import React, { Component } from 'react'
import { useState } from 'react'
import '../Styles/LoginStyle.css'
import logo from '../Images/bilko.png'
import { Link, Redirect } from 'react-router-dom';
import Popup from "../Popup";
import FAQ from "./FAQ";
import axios from "axios";


class Login extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            showFAQ:false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleFAQ = this.handleFAQ.bind(this);
    }
    emailhandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    } 
    handleSubmit = async (event) => {
        //alert(`${this.state.email}  Successful login`)
        console.log(this.state);
        this.setState({
            email: "",
            password: '',
            activePage: "Profile"
           
        })

        event.preventDefault();

        //CONNECTING THE BACKEND
         const response = await fetch("http://localhost:8080/"
        , {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email:this.state.email, password:this.state.password}),
        });

        console.log(response.json());
        // const response = await axios.post('http://localhost:8080/login', {
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
        //     'Access-Control-Allow-Credentials': true,
        //     'X-Atlassian-Token': 'nocheck',
        // },
        // auth:{
        // email: this.state.email,
        // password: this.state.password,
        // }});
       console.log("mail:" , this.state.email, "password:", this.state.password)
        const data = await response.json();
        console.log("here")
        if (response.status === 200) {
            localStorage.setItem('token', data.token);
            // redirect to another page
            this.props.onLogin();
            this.props.activePage = "Profile"
            console.log("here", this.props.logged)
        } 
        else {
            alert(`INVALID CREDENTIALS`)
        }
        

     event.preventDefault()
        
    }

    handleClose(){
        this.setState({showFAQ:false});
      }
    handleFAQ(){
        this.setState({showFAQ:true});
    }
    render() {
   
        const { showFAQ } = this.state;
        return (         
            <div className="loginpage">
                <div className="header">
                    <h4>Bilkent University Internship Management System </h4>
                </div>                                                          
                
                <div className="logincontainer">
                    <div className="logo">
                        <img src={logo}/>
                    </div>   
                    <div className="loginentries">   
    
                        <form onSubmit={this.handleSubmit}>
                        
                            <h1>User Login</h1>
                            <div className="emailcontainer">   
                                <label>E-mail:</label> 
                                <input type="text" value={this.state.email} onChange={this.emailhandler} placeholder="E-mail" />
                            </div> 
                            <div className="passwordcontainer">   
                                <label>Password:</label> 
                                <input type="password" value={this.state.password} onChange={this.passwordhandler} placeholder="Password" />
                            </div>
                            {/*recover password link*/}
                            
                            <input type="submit" value="Login" />

                            
                        </form>

                        {/* not a good implementation but it works, I will look at the router imp. later */}
                        <button  id='link-button' onClick={this.handleFAQ}><ins>For questions and information: </ins> </button>
                            {/*faq link*/}
                          
                            {showFAQ &&<Popup name = "FAQ" className="popup" handleClose={this.handleClose} isFAQ = {true} contents = {<FAQ/>}>
          </Popup>}
                         
                    </div>                  
                </div>
            </div>
         
            
            
        )
    }
}

export default Login