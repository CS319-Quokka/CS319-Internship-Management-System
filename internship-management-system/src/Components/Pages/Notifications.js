import React, {Component} from 'react'
import '../Styles/Notifications.css'
import { AnnouncementData } from '../NotificationData'
import {NotifData} from '../NotificationData'

function AnnouncementList() {
  return (
    <ul>
      {AnnouncementData.map(announcement => (
        <li key={announcement.date}>
          <h2>From: {announcement.poster}</h2>
          <textarea>{announcement.message}</textarea>
          <h2>{announcement.date}</h2>
          <hr></hr>
        </li>
      ))}
    </ul>
  );
}
function NotificationList(){
  return (
    <ul>
      {NotifData.map(notification => (
        <li key={notification.date}>
          <h2>From: {notification.sender}</h2>
          <textarea>{notification.message}</textarea>
          <h2>{notification.date}</h2>
          <hr></hr>
        </li>
      ))}
    </ul>
  );
}
class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state ={}   
  }

  render(){
    return(
      <div className='maincontainer-notif'>
        <div className='announcements'>
          <h1>📢</h1>
          <br></br>
          <h1>ANNOUNCEMENTS</h1>
          <br></br>
          <hr></hr>
          <div className='announcementList'>
            <AnnouncementList/>          
          </div>
        </div>

        <div className='notifications'>
          <h1>🔔</h1>
          <br></br>
          <h1>NOTIFICATIONS</h1>
          <br></br>
          <hr></hr>
          <div className='announcementList'>
            <NotificationList/>          
          </div>
        </div>

      </div>
          
    )}
    
}

export default Notifications
