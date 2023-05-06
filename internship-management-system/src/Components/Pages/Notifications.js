import React, {Component} from 'react'
import '../Styles/Notifications.css'

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state ={
      poster1: "Eray Tüzün",
      poster2: "Begüm Çınar",
      poster3: "Begüm Çınar",
      poster4: "Selim Aksoy",
      message1: "I have started grading your reports. You can check your progress on your reports page.",
      message2: "The deadline for submitting your summer training reports has been moved to 15/05/2023",
      message3: "All company evaluation forms are received and your standings are added to the system. You can check your Part A results now.",
      message4: "The internship management system is now operational.",
      date1: "27 March 2023",
      date2: "18 April 2023",
      date3: "5 April 2023",
      date4: "20 March 2023"

      
    } 
  
  
  }

  render(){
    return(
      <div class='maincontainer'>
        <div className='notifications'>
          <h1> 🔔 📢</h1>
          <br></br>
          <h1>ANNOUNCEMENTS</h1>
          <br></br>
          <hr></hr>
          <div className='announcements'>
            
            <div className='showannouncement'>
              <h2>From: {this.state.poster2}</h2>
              <textarea readOnly>{this.state.message2}</textarea>
              <h2>Posted on {this.state.date2}</h2>
            </div>
            <hr></hr>
            <div className='showannouncement'>
              <h2>From: {this.state.poster3}</h2>
              <textarea readOnly>{this.state.message3}</textarea>
              <h2>Posted on {this.state.date3}</h2>
            </div>
            <hr></hr>
            <div className='showannouncement'>
              <h2>From: {this.state.poster1}</h2>
              <textarea readOnly>{this.state.message1}</textarea>
              <h2>Posted on {this.state.date1}</h2>
            </div>
            <hr></hr>
            <div className='showannouncement'>
              <h2>From: {this.state.poster4}</h2>
              <textarea readOnly>{this.state.message4}</textarea>
              <h2>Posted on {this.state.date4}</h2>
            </div>
           

          </div>


        </div>


      </div>
          
    )}
    
}

export default Notifications