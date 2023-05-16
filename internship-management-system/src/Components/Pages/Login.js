import React, { Component } from 'react';
import '../Styles/LoginStyle.css';
import logo from '../Images/bilko.png';
import { Link, Redirect } from 'react-router-dom';
import Popup from "../Popup";
import FAQ from "./FAQ";
import axios from "axios";
import { useEffect,useState } from 'react';
import { get } from 'react-hook-form';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showFAQ: false,
            redirectToProfile: false,
            errorMessage: "",
            userType: ""
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleFAQ = this.handleFAQ.bind(this);
    }

    emailhandler = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleClose(){
        this.setState({
            showFAQ:false,
        });
    }

    handleFAQ(){
        this.setState({
            showFAQ:true,
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/account/api/login', {
                email: this.state.email,
                password: this.state.password,
            });

            localStorage.setItem('token', response.data.token);

            const id = response.data.id;
            const response2 = await axios.get('http://localhost:8080/account/${id}');
           
            //get the role of the body, we will assign a sidebar according to this role


            console.log("ROLE",response2);


            this.props.onLogin(response2); // call onLogin prop
        } catch (error) {
            if (error?.response?.status === 401) {
                this.setState({
                    errorMessage: "Invalid credentials.",
                });
            } else {
                this.setState({
                    errorMessage: "An error occurred.",
                });
            }
        }
    } 

    render() {
        const { showFAQ, errorMessage } = this.state;



        return (
            <div className="loginpage">
                <div className="header">
                    <h4>Bilkent University Internship Management System </h4>
                </div>

                <div className="logincontainer">
                    <div className="logo">
                        <img src={logo} alt="Bilko logo" />
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
                            <input type="submit" value="Login" />
                        </form>
                        <div className="error-message">{errorMessage}</div>
                        <button id='link-button' onClick={this.handleFAQ}><ins>For questions and information:</ins></button>
                        {showFAQ && (
                            <Popup name="FAQ" className="popup" handleClose={this.handleClose} isFAQ={true} contents={<FAQ />} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;