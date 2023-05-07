import React, { Component } from 'react'
import { useState } from 'react'
import '../Styles/LoginStyle.css'
import logo from '../Images/bilko.png'
import { Link, Redirect } from 'react-router-dom';


class Login extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }
        this.handleSubmit=this.handleSubmit.bind(this)
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
    handleSubmit = (event) => {
        //alert(`${this.state.email}  Successful login`)
        console.log(this.state);
        this.setState({
            email: "",
            password: '',
            activePage: "Profile"
           
        })
        this.props.onLogin();
        this.props.activePage = "Profile"
        console.log("here", this.props.logged)

     event.preventDefault()
        
    }
    render() {
   
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
                            <p>For questions and information:  </p>
                            {/*faq link*/}
                          
                         
                        </form>
                    </div>                  
                </div>
            </div>
         
            
            
        )
    }
}

export default Login