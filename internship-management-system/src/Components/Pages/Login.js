import React, { Component } from 'react'
import { useState } from 'react'
import '../Styles/LoginStyle.css'
import logo from '../Styles/bilko.png'



class Login extends Component {
   
    constructor(props) {
        super(props)

        this.state = {
            email: "deniz.sun@ug.bilkent.edu.tr",
            password: "quokka123",
       


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
        alert(`${this.state.email}  Successful login`)
        console.log(this.state);
        this.setState({
            email: "",
            password: '',
           
        })
     event.preventDefault()
        
    }

    render() {
   
        return (          
            <div className="loginpage" st>                   
                <header> 
                    <h2>Bilkent University Internship Management System </h2>
                </header>
                <div className="logo">
                    <img src={logo}/>
                </div>
                
        
                <div class="logincontainer">
                    <div class="loginentries">   
                        <form onSubmit={this.handleSubmit}>   
                            <h1>User Login</h1>
                            <div class="emailcontainer">   
                                <label>E-mail:</label> 
                                <input type="text" value={this.state.email} onChange={this.emailhandler} placeholder="E-mail" /><br />
                            </div>
                            <div class="passwordcontainer">   
                                <label>Password:</label> 
                                <input type="password" value={this.state.password} onChange={this.passwordhandler} placeholder="Password" /><br />
                            </div>
                            <input type="submit" value="Login" />
                        </form>
                    </div>                  
                </div>
            </div>
         
            
            
        )
    }
}

export default Login