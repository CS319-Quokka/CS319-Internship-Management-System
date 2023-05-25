import React, { Component } from "react";
import { UserData } from "../UserData";
import DisplayList from "./DisplayList";
import "../Styles/ManageUsers.css"
import ManageUsersAdd from "./ManageUsersAdd";
import Popup from "../Popup"
import ManageUsersEdit from "./ManageUsersEdit";
import ManageUsersRemove from "./ManageUsersRemove";
import axios from "axios"

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showPopup:false,
      showRemove:false,
      showChoices:false,
      showEdit:false,
      selectedCode: "",
      selectedRole:"",
      userList:[]
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleChoiceMenu = this.handleChoiceMenu.bind(this);
    this.handleNewUserClick = this.handleNewUserClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSelected= this.handleSelected.bind(this);
  }
  

  handleRemove(){
    console.log(this.showRemove)
    this.setState({
      showRemove:true,
      selectedUser: UserData

    });
    this.setState({showChoices:false});
    
  }

  handleEdit(){
    this.setState({
      showEdit:true,
      selectedUser: UserData
    });
    this.setState({showChoices:false});

  }
  handleNewUserClick(){
    
    this.setState({
      showPopup:true
    });
    this.setState({showMenu:false});
  }

  
  handleSelected= (role,code) => {
    console.log("code is: ",code )
    console.log("role is: ",role )
    var selectedCode = "";

    if(code == 1){
      selectedCode = "CS299"
    }
    if(code == 2){
      selectedCode = "CS399"
    }



    this.setState({selectedCode:selectedCode});
   
  };



  handleMenu(){
    console.log(this.showMenu)
    this.setState(prevState => ({
      showMenu: !prevState.showMenu
    }));
  }

  
  handleChoiceMenu(newControllerValue) {
    this.setState({ showChoices: newControllerValue });
  }
  
  handleClose(){
    this.setState({showPopup:false});
    this.setState({showRemove:false});
    this.setState({showEdit:false});
  }


  getAllStudents = async () =>{

    console.log("ID",this.props.userId)
    const department = this.props.department;

    const response = await axios.get(`http://localhost:8080/account/${department}`);

    const info = response.data[0]
    console.log(info.id);


    //const response2 = await axios.get(`http://localhost:8080/student?instructorId=${info.id}`);

    //const studentInfo = response2.data;

    //console.log(studentInfo)

    
  
     var allTypeUsers = [];

     for (var i = 0; i < response.length; i++) {
      console.log(response[i].fullName, response[i].role);
    
        allTypeUsers.push({
        name: response[i].firstName + " " + response[i].lastName,
        role: response[i].selectedRole
      });
    }
    
     console.log("list: ", allTypeUsers);

     this.setState({ userList: allTypeUsers});
  
}

  render() {
    const { showMenu } = this.state;
    const { showPopup } = this.state;
    const {showRemove} = this.state;
    const {showEdit} = this.state;
    const {showChoices} = this.state;
    const { handleSelected} = this;
    const userList = this.state.userList;
    
    return (
      
      <div className="maincontainer">
        
        {console.log(showChoices)}
        <DisplayList data={userList} displayFields={['name', 'role'] }isAdd = {true} tag = "Manage Users:" setControllerState={this.handleChoiceMenu} choice = 
        

          {showChoices&& <div className="menu" id=  "choice-menu">
          <ul className="menu-contents">
            <li className="content"> <a href="#" onClick={this.handleEdit}>Edit User</a></li>
            <hr className="line"></hr>
            <li className = "content"><a href = "#" onClick={this.handleRemove}>Remove User</a></li>
          </ul>
        </div>
        }/>
        <div className="add">
          <button onClick={this.handleMenu} className = "button" id = "add-button" >+</button>
        {console.log(showMenu)}
        {showMenu && (
          <div className="menu">
            <ul className="menu-contents">
              <li className="content"> <a href="#" onClick={this.handleNewUserClick}>New User</a></li>
              <hr className="line"></hr>
              <li className = "content"><a href = "#" onClick={this.handleDataSheetClick}>Users Sheet</a></li>
            </ul>
          </div>
        )}

        
        {showPopup &&<Popup name = "Add" className="popup" handleSelected= {handleSelected} handleClose={this.handleClose} isAdd = {true} tag = "Manage Users:" contents = {<ManageUsersAdd/>}>
          </Popup>}
        </div>
        <div className="remove">
        {showRemove&&<Popup name = "Remove" className="popup" handleClose={this.handleClose} tag = "Manage Users:"
                            contents = {<ManageUsersRemove user={this.state.selectedUser} />}>
         </Popup>}
        </div>
        <div className="edit">
        {showEdit&&<Popup name = "Edit" className="popup" handleClose={this.handleClose} tag = "Manage Users:" contents = {<ManageUsersEdit user={this.state.selectedUser} />}>
         </Popup>}
        </div>
      </div>
    );
  }
}

export default ManageUsers;