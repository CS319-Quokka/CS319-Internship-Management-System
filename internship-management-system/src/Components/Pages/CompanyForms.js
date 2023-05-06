import React, {Component} from 'react'
import Dropzone from "../Dropzone";
import "../Styles/FileSubmission.css"
class CompanyForms extends Component{
    
    
      render(){
        return(
            <div className='page'>
                
                <div className='uploads'>
                    <div className='uploadmessage'>
                            <h1> ❗ CONFIDENTIAL ❗</h1>
                            <br></br>
                        
                    </div>
              
                <Dropzone/>
                </div>
                
            </div>
         
              
        )}

}

export default CompanyForms