import React ,{useState, useEffect} from "react";
import "./Styles/Popup.css"
import Button from '@mui/material/Button';
import axios from 'axios';


function InstructorOptionsList() {
    const [instructorOptions, setInstructorOptions] = useState([]);

    useEffect(() => {
        fetchInstructorOptions()
            .then((options) => setInstructorOptions(options))
            .catch((error) => console.log(error));
    }, []);

    const fetchInstructorOptions = async () => {
        try {
            // Make an API call or database query to retrieve the options
            const response = await axios.get('...'); //link to the API
            const data = response.data;

            // Return the options as an array
            return data.map((instructor) => ({
                value: instructor.id,
                label: instructor.name,
            }));
        } catch (error) {
            throw new Error('Failed to fetch instructors.');
        }
    };

    return (
        <label className="input-label">
            <h3 className="input-tag" id="instructor-tag">Instructor:</h3>
            <select className="select-menu" id="instructor">
                <option value="0">Select instructor:</option>
                {instructorOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}


function TaOptionsList() {
    const [TaOptions, setTaOptions] = useState([]);

    useEffect(() => {
        fetchTaOptions()
            .then((options) => setTaOptions(options))
            .catch((error) => console.log(error));
    }, []);

    const fetchTaOptions = async () => {
        try {
            const response = await fetch('............'); //link to the API
            const data = await response.json();
            // Return the options as an array
            return data.map((ta) => ({
                value: ta.id,
                label: ta.name,
            }));
        } catch (error) {
            throw new Error('Failed to fetch TAs.');
        }
    };

    return (
        <label className="input-label">
            <h3 className="input-tag" id="ta-tag">Teaching Assistant:</h3>
            <select className="select-menu" id="ta">
                <option value="0">Select TA:</option>
                {TaOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}

function StudentOptionsList() {
    const [studentOptions, setStudentOptions] = useState([]);

    useEffect(() => {
        fetchStudentOptions()
            .then((options) => setStudentOptions(options))
            .catch((error) => console.log(error));
    }, []);

    const fetchStudentOptions = async () => {
        try {
            const response = await fetch('............'); //link to the API
            const data = await response.json();

            // Return the options as an array
            return data.map((student) => ({
                value: student.id,
                label: student.name,
            }));
        } catch (error) {
            throw new Error('Failed to fetch students.');
        }
    };


    return (
        <label className="input-label">
            <h3 className="input-tag" id="student-tag">Student:</h3>
            <select className="select-menu" id="student">
                <option value="0">Select student:</option>
                {studentOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
}

const Popup = (props) => {

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCode, setSelectedCode] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSelectedCode = (event) => {
    setSelectedCode(event.target.value);
  };

  const handleAddUser = () => {
     props.handleSelected(selectedValue,selectedCode)
  }

  const handleOperation = (data) => {
    console.log("add");
    console.log(data)
  };

  
    console.log("here")

    let courseSelection = null;
    if (selectedValue === "Student") {
      courseSelection = <div >
        <label className="input-label">
              <h3 className="input-tag" id="course-tag">Course:</h3>
              <select className="select-menu" id = "course">
            <option value="0">Select course:</option>
            <option value="1">CS299</option>
            <option value="2">CS399</option>
          </select>

        </label>

         <InstructorOptionsList/>
         <TaOptionsList/>
      </div>;
    } 
    
  
  return (
    
    <div className="popup-window">
      
      <div className="popup-header"><h1 className="popup-tag"><span className="tag">{props.tag}</span>{props.name}

      <button className="button" id= "exit" onClick={props.handleClose}>x</button>
      </h1>
      
      </div>
      <div className="window">



         <Button variant="outlined" onClick={handleAddUser}>ADD USER</Button>
        <span className="buttons">
           {props.contents}
        {props.button}

       
       
        </span>
        
      </div>
    </div>
  );
};

export default Popup;