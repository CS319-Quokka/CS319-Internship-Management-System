import React, {Component} from 'react'
import Dropzone from "../Dropzone";
import "../Styles/FileSubmission.css"
import DisplayList from './DisplayList';
import { StudentData } from "../StudentData";
import "../Styles/CompanyForms.css"
import Popup from "../Popup"
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
    'Reassign Instructor',
    'Upload Company Evaluation Form'
];
const ITEM_HEIGHT = 48;
function LongMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        overflow: 'auto',
                        width: '30ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

class StudentOperations extends Component{

    constructor(props) {
        super(props);
        this.state = {
          showChoices:false,
          showReassign:false,
          showCompanyForm:false
        };
        this.handleChoiceMenu = this.handleChoiceMenu.bind(this);
        this.handleCompanyForm = this.handleCompanyForm.bind(this);
        this.handleReassign = this.handleReassign.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }    
    handleChoiceMenu(newControllerValue) {
        this.setState({ showChoices: newControllerValue });
    }

    handleReassign(){
    this.setState({
        showReassign:true
    });
    this.setState({showChoices:false});
    
    }  
    
    handleCompanyForm(){
        console.log("bastı");
        this.setState({
            showCompanyForm:true
        });
        this.setState({showChoices:false});
        
     } 

     handleClose(){
        this.setState({showReassign:false});
        this.setState({showCompanyForm:false});
      }
      render(){
        const {showChoices} = this.state;
        const {showCompanyForm} = this.state;
        const {showReassign} = this.state;
        return(
            <div className='page'>


                <DisplayList data={StudentData} displayFields={['name', 'class', 'form','grader'] } setControllerState={this.handleChoiceMenu} choice =


                    {showChoices&& <div className="menu" id=  "choice-menu">
                        <ul className="menu-contents">
                            <li className="content"> <a href="#" onClick={this.handleReassign}>Reassign</a></li>
                            <hr className="line"></hr>
                            <li className = "content"><a href = "#" onClick={this.handleCompanyForm}>Company Form</a></li>
                        </ul>
                    </div>
                    }/>
                {/*<LongMenu/> */}

           {showReassign &&<Popup name = "Reassign" className="popup" handleClose={this.handleClose}>
          </Popup>}
          

          <div className='company-forms'>
          {showCompanyForm &&
          <Popup name = "Upload Company Form" className="popup" tag = "Student Operations:" handleClose={this.handleClose} contents =
            {<div className='uploads'>
              <div className='uploadmessage'>
                      <h1> ❗ CONFIDENTIAL ❗</h1>
                      <br></br>

              </div>

              <Dropzone className = "dropzone"/>
            </div>}

          
          > </Popup>}

          </div>
          
                
                
                {/* <div className='uploads'>
                    <div className='uploadmessage'>
                            <h1> ❗ CONFIDENTIAL ❗</h1>
                            <br></br>
                        
                    </div>
              
                    <Dropzone afterUpload = 
                    {<div className="actions">
                    
                   </div>} 
                    />
                </div> */}
                
            </div>
         
              
        )}

}

export default StudentOperations