import React, { Component } from 'react'
import '../Styles/LoginStyle.css'
import lockimg from '../Images/reset-password.png'
import { Link } from "react-router-dom"

class RecoverPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        alertMessage: ":D",
      };
      this.setAlertMessage = this.setAlertMessage.bind(this);
    }
  
    
  
    setAlertMessage(message) {
      this.setState({ alertMessage: message });
    }
  
    
    render() {
      return (
        <div>
       {//   <Alert message={this.state.alertMessage} /> 
    }
          <div className= "loginpage">
            <div className="logincontainer">
              <div className="logo">
                <img src={lockimg}></img>
                {/** image source: <a href="https://www.flaticon.com/free-icons/reset-password" title="reset password icons">Reset password icons created by Freepik - Flaticon</a> */}
              </div>
              <div className="recoveryentries">
                <form onSubmit={this.handleSubmit}>
                  <h1>Forgot Your Password?</h1>
                  <h2>We will send you a link to recover your account via email.</h2>
                  <div class="emailcontainer">   
                    <label>E-mail:</label> 
                    <input type="text" value={this.state.email} onChange={this.emailhandler} placeholder="E-mail" />               
                  </div> 
                  
                  <input type="submit" value="Recover Password" />
                
                </form>
                <p>Know your login info?  </p>
             {   /*<Link to "/Login">Login</Link> */}
          
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  export default RecoverPassword
  