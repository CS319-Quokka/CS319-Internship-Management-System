import React, { Component } from "react";
import { UserData } from "../UserData";
import DisplayList from "./DisplayList";
import "../Styles/ManageUsers.css"
import axios from 'axios';
import ManageUsersAdd from "./ManageUsersAdd";
import Popup from "../Popup"
import ManageUsersRemove from "./ManageUsersRemove";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import userContext, { UserContext } from "../UserContext";

function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    props.handleRemove();
    setOpen(false);
  }
  return (
      <div>
        <Button onClick={handleClickOpen}></Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Remove this user?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              All information of this user will be removed from the system.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm} autoFocus> Confirm </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
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
      userData:[]
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleChoiceMenu = this.handleChoiceMenu.bind(this);
    this.handleNewUserClick = this.handleNewUserClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSelected= this.handleSelected.bind(this);
  }
  static contextType = UserContext;

  componentDidMount() {
    this.getAllUsers()
  }

  getAllUsers = async () => {
    const currentResponse = await axios.get(`http://localhost:8080/account/get_account/${this.props.userId}`);
    const department = currentResponse.data.department;

    const response = await axios.get(`http://localhost:8080/account?department=${department}`);
    const info = response.data;

    var users = [];

    for (let i = 0; i < info.length; i++) {
        const user = info[i];
        const fullName = `${user.firstName} ${user.lastName}`;
        const currentId = user.id;

        const profileResponse = await axios.get(`http://localhost:8080/get_all_users/${currentId}`);
        const profilesInfo = profileResponse.data;


        for(let j = 0 ; j < profilesInfo.length ; j++) {
            const profile = profilesInfo[j];
            const userId = profile.id

            users.push({
                name: fullName,
                department: department,
                role: profile.role,
                id:userId
            });
        }
    }

    this.setState({userData:users})
}

  handleRemove = () =>{

    const userId = this.context.userId;
    const response = axios.delete(`http://localhost:8080/user/${userId}`);
    if(response){

      console.log("User has been removed successfully");
    }
    else{

      console.log("User cannot been removed");
    }
  }

  handleEdit = () => {
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



options = [
  {
    name: 'Remove User',
    action: this.handleRemove
  }
];
  render() {
    const { showMenu } = this.state;
    const { showPopup } = this.state;
    const {showRemove} = this.state;
    const {showChoices} = this.state;
    const {userData} = this.state;
    const { handleSelected} = this;
    return (
      
      <div className="maincontainer">

        <DisplayList options = {this.options} data={userData} displayFields={['name', 'role', 'department'] }isAdd = {true} tag = "Manage Users:" setControllerState={this.handleChoiceMenu} choice =

          {showChoices&& <div className="menu" id=  "choice-menu">
          <ul className="menu-contents">
            <li className = "content" id="removeSelect"><a href = "#" onClick={this.handleRemove}>Remove User</a></li>
          </ul>
        </div>
        }/>
        <div className="add">
          <button onClick={this.handleMenu} className = "button" id = "add-button" >+</button>
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
          {showRemove && (
              <AlertDialog handleRemove={this.handleRemove} />
          )}
        </div>
        {/*
        <div className="edit">
        {showEdit&&<Popup name = "Edit" className="popup" handleClose={this.handleClose} tag = "Manage Users:" contents = {<ManageUsersEdit user={this.state.selectedUser} />}>
        {showRemove&&<Popup name = "Remove" className="popup" handleClose={this.handleClose} tag = "Manage Users:"
                            contents = {<ManageUsersRemove user={this.state.selectedUser} />}>
         </Popup>}
        </div>
        */}

      </div>
    );
  }
}

export default ManageUsers;