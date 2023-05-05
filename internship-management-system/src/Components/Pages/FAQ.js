import React, { Component } from 'react'
import { useState } from 'react'
import '../Styles/FAQstyle.css'

const QandA = [
        {
            topic: "ABOUT",
            answer: ""
        },

        {
            topic: "Logging in",
            question: "How do I login to the system?",
            answer: "Check your Bilkent Web-mail to find your login credentials. Your username is yout Bilkent E-mail and your password is provided in the login credentials mail.\n You can change your password later. "
        },
        {
            topic: "Logging in",
            question: "I forgot my password. How can I recover my account?",
            answer: "Go to the ~Password Recovery~ page on the Login form. There, you can enter your account's email and we will send you an email with new login credentials."
        },

        {
            topic: "Reports",
            question: "How do I upload my report?",
            answer:"Go to the 'File Submission' page from the sidebar. You can upload your summer training report there."
        },
        {

        }
    
    
    ];


function faqList() {
    return (
      <ul>
        {QandA.map(info => (
          <li key={info.topic}>
            <h2>{info.topic}</h2>
            <h1>{info.question}</h1>
            <p>{info.answer}</p>
            <hr></hr>
          </li>
        ))}
      </ul>
    );
  }
class FAQ extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

                <div className="FAQpage">
                    <div className="questionsContainer">
                        <div className="questions">

                            <faqList/>
                        </div>
                    



                    </div>


                   

                </div>

        )
        
    }
}
export default FAQ