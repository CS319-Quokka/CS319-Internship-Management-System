import React, {Component} from 'react'
import '../Styles/Notifications.css'
import { AnnouncementData } from '../NotificationData'
import {StudentNotifData} from '../NotificationData'
import axios from 'axios';

function AnnouncementList(props) {
  return (
    <ul>
      {props.data.map(announcement => (
        <li key={announcement.content}>
          <h2>From: {announcement.sender}</h2>
          <textarea readOnly>{announcement.content}</textarea>
          <h2>this should be date: {announcement.title}</h2>
          <hr></hr>
        </li>
      ))}
    </ul>
  );
}
function NotificationList(props) {
  return (
    <ul>
      {props.data.map(notification => (
        <li key={notification.content}>
          <h2>{notification.title}</h2>
          <textarea readOnly>{notification.content}</textarea>
          <h2>this should be date: {notification.title}</h2>
          <hr></hr>
        </li>
      ))}
    </ul>
  );
}

class StudentNotifications extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      announcementNameList:[],
      notificationNameList:[]
    }
  }

  componentDidMount() {
    this.getAllAnnouncements();
    this.getAllNotifications();
  }

  getAllAnnouncements = async () =>{

    const id = this.props.userId; // this is account id !!!

    const response1 = await axios.get(`http://localhost:8080/get_all_users/${id}`);

    const info = response1.data[0]

    const response = await axios.get(`http://localhost:8080/announcement?userRole=Student&userId=${info.id}`);
    console.log(response.data); 

    const announcementInfo = response.data;
    console.log(announcementInfo.length);

    var announ = [];

     for (var i = 0; i < announcementInfo.length; i++) {
      
      var senderInfo = announcementInfo[i].sender.userAccount.firstName + " " + announcementInfo[i].sender.userAccount.lastName;
      var titleInfo = announcementInfo[i].title;
      var contentInfo = announcementInfo[i].content;
      
      announ.push({
        sender: senderInfo,
        title: titleInfo,
        content: contentInfo,
      });
    }

     this.setState({ announcementNameList: announ });
  
  }


  getAllNotifications = async () =>{

    const id = this.props.userId;
    console.log("account id: ",id);
    const response1 = await axios.get(`http://localhost:8080/get_all_users/${id}`);

    const info = response1.data[0];
    console.log("user id: ",info.id);

    const response = await axios.get(`http://localhost:8080/notification?userId=${info.id}`);

    const notificationInfo = response.data;
    console.log("notificationList: " ,notificationInfo);
    console.log(notificationInfo.length);

    var notif = [];

     for (var i = (notificationInfo.length - 1); i > -1; i--) {
      
      // var senderInfo = notificationInfo[i].sender.userAccount.firstName + " " + notificationInfo[i].sender.userAccount.lastName;
      var titleInfo = notificationInfo[i].title;
      var contentInfo = notificationInfo[i].content;
      
      notif.push({
        // sender: senderInfo,
        title: titleInfo,
        content: contentInfo,
      });
    }

    this.setState({ notificationNameList: notif });
  
  }

  render(){
    const {announcementNameList, notificationNameList} = this.state;
    return(
      <div className='maincontainer-notif'>
        <div className='announcements'>
          <h1>📢</h1>
          <br></br>
          <h1>ANNOUNCEMENTS</h1>
          <br></br>
          <hr></hr>
          <div className='announcementList'>
            <AnnouncementList link = {"/studentnotifications"} data={announcementNameList} displayFields={['sender','title', 'content']} />          
          </div>
        </div>

        <div className='notifications'>
          <h1>🔔</h1>
          <br></br>
          <h1>NOTIFICATIONS</h1>
          <br></br>
          <hr></hr>
          <div className='announcementList'>
          {/* TODO REMOVE sender and add date */}
            <NotificationList link = {"/studentnotifications"} data={notificationNameList} displayFields={['sender','title', 'content']}/>          
          </div>
        </div>

      </div>
          
    )}
    
}

export default StudentNotifications
