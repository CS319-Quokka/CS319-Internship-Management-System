import React, {Component} from 'react'
import Dropzone from "../Dropzone";
import "../Styles/FileSubmission.css"
import DisplayList from './DisplayList';
import { StudentData } from "../StudentData";
import "../Styles/CompanyForms.css"
import Popup from "../Popup"
class CompanyForms extends Component{

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

          {/* {showReassign &&<Popup name = "Reassign" className="popup" handleClose={this.handleClose}>
          </Popup>} */}
          

          <div className='company-forms'>
          {showCompanyForm &&<Popup name = "Upload Company Form" className="popup" handleClose={this.handleClose} contents = 
          {<div className='uploads'>
          <div className='uploadmessage'>
                  <h1> ❗ CONFIDENTIAL ❗</h1>
                  <br></br>
              
          </div>
    
          <Dropzone 
          />
      </div>}
          
          
          >
          </Popup>}

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

export default CompanyForms