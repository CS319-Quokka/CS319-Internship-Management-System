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
import axios from 'axios';


const ITEM_HEIGHT = 48;


class StudentOperations extends Component{

    constructor(props) {
        super(props);
        this.state = {
          showChoices:false,
          showReassign:false,
          showCompanyForm:false,
          studentData: []
        };
        this.handleChoiceMenu = this.handleChoiceMenu.bind(this);
        this.handleCompanyForm = this.handleCompanyForm.bind(this);
        this.handleReassign = this.handleReassign.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    static contextType = UserContext;
    componentDidMount() {
      this.getAllStudents();
  }



    getAllStudents = async () =>{

      const currentResponse = await axios.get(`http://localhost:8080/account/get_account/${this.props.userId}`);
      const department = currentResponse.data.department;
  
      const response = await axios.get(`http://localhost:8080/student?department=${department}`);
      const info = response.data;
  
      console.log("STUDENTS:",info);


      var students = [];

       for (var i = 0; i < info.length; i++) {

        var fullName = info[i].userAccount.firstName + " " + info[i].userAccount.lastName;
        var instructor = info[i].instructor.userAccount.firstName + " " +  info[i].instructor.userAccount.lastName;
        var courseCode = info[i].courseCode;
        var form = "Not Uploaded";
        if(info[i].companyEvaluationForm != null){
          form = "Uploaded"
        }
        var studentId = info[i].id;


        students.push({
          name: fullName,
          class: courseCode,
          instructor: instructor,
          form:form,
          id:studentId
        });
      }
      console.log("ALL STUDİS:",students)
      this.setState({studentData:students})
  }


    handleChoiceMenu(newControllerValue) {
        this.setState({ showChoices: newControllerValue });
    }

    handleReassign = () =>{
      
        this.setState({
        showReassign:true
    });

    }
  
    
    handleCompanyForm= () =>{
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
        const {studentData} = this.state;
        return(
            <div className='page'>


                <DisplayList functionalities = {this.functionalities}  options = {this.options}  data={studentData} displayFields={['name', 'class', 'form','instructor'] } setControllerState={this.handleChoiceMenu} />


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

              <Dropzone isCompanyForm = {true} className = "dropzone"/>
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