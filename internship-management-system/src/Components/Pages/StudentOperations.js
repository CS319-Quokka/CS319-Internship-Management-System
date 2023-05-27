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
import { UserContext } from "../UserContext";


const ITEM_HEIGHT = 48;


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

    static contextType = UserContext;

    handleChoiceMenu(newControllerValue) {
        this.setState({ showChoices: newControllerValue });
    }

    handleReassign = () =>{
      
        this.setState({
        showReassign:true
    });
    console.log( "REASSS")
    }
    // handleReassignAndSelectUser = (itemId) => {
    //     const userId = this.context.userId;
    //     console.log('Selected User ID:', userId);
    //     this.handleReassign();
    //    // this.selectUser(itemId);
    // };

    
    handleCompanyForm= () =>{
        console.log("bastı");
        this.setState({
            showCompanyForm:true
        });

     }
     handleClose(){
        this.setState({showReassign:false});
        this.setState({showCompanyForm:false});
      }

      options = [

        {
          name: 'Reassign Instructor',
          action: this.handleReassign
        }, 
        {
          name: 'Upload Company Evaluation Form',
          action:  this.handleCompanyForm
        }
    ];

    functionalities = [
      this.handleReassign,
      this.handleCompanyForm
    ]
      render(){
        const {showCompanyForm} = this.state;
        const {showReassign} = this.state;
        return(
            <div className='page'>


                <DisplayList functionalities = {this.functionalities}  options = {this.options}  data={StudentData} displayFields={['name', 'class', 'form','grader'] } setControllerState={this.handleChoiceMenu} />


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