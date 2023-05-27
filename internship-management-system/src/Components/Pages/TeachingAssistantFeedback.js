import React, {Component, useState, handleChange, useEffect} from 'react'
import axios from 'axios';
import '../Styles/TAfeedback.css'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download'
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import {UserContext} from "../UserContext";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function TextareaValidator() {
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);
    return (
        <FormControl>
            <FormLabel>Feedback comments</FormLabel>
            <Textarea
                placeholder="Type your feedback comments here..."
                minRows={3}
                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',
                        }}
                    >
                        <IconButton
                            variant="plain"
                            color="neutral"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                            <FormatBold />
                            <KeyboardArrowDown fontSize="md" />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            size="sm"
                            placement="bottom-start"
                            sx={{ '--ListItemDecorator-size': '24px' }}
                        >
                            {['200', 'normal', 'bold'].map((weight) => (
                                <MenuItem
                                    key={weight}
                                    selected={fontWeight === weight}
                                    onClick={() => {
                                        setFontWeight(weight);
                                        setAnchorEl(null);
                                    }}
                                    sx={{ fontWeight: weight }}
                                >
                                    <ListItemDecorator>
                                        {fontWeight === weight && <Check fontSize="sm" />}
                                    </ListItemDecorator>
                                    {weight === '200' ? 'lighter' : weight}
                                </MenuItem>
                            ))}
                        </Menu>
                        <IconButton
                            variant={italic ? 'soft' : 'plain'}
                            color={italic ? 'primary' : 'neutral'}
                            aria-pressed={italic}
                            onClick={() => setItalic((bool) => !bool)}
                        >
                            <FormatItalic />
                        </IconButton>
                        <Button sx={{ ml: 'auto' }}>Send</Button>
                    </Box>
                }
                sx={{
                    minWidth: 300,
                    fontWeight,
                    fontStyle: italic ? 'italic' : 'initial',
                }}
            />
        </FormControl>
    );
}

class TeachingAssistantFeedback extends Component{
    constructor(props) {
        super(props)
        this.state = {
            currentReport: "",
            currentComment: "",
            firstName: "",
            lastName: ""
        };
        this.downloadCurrent = this.downloadCurrent.bind(this);
    }

    static contextType = UserContext;
    componentDidMount() {

        const id = 3

        this.setState({studentId: id})
        this.getCurrentStudent(id);
        this.getActiveReport(id);
    }

    downloadCurrent = () =>{

        const fileData = this.state.fileData
        const fileName = this.state.currentReport

        if (typeof fileData !== "string" || !(/^[A-Za-z0-9+/=]*$/g.test(fileData))) {
            console.error("Invalid base64 string");
            return;
        }

        const byteCharacters = atob(fileData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Use the right file extension here
        document.body.appendChild(link);
        link.click();
    }



    getCurrentStudent = async () => {
        const id = 4;

        try {

            const response2 = await axios.get(`http://localhost:8080/${id}`);
            const studentInfo = response2.data;

            this.setState({
                studentFirstName: studentInfo.userAccount.firstName,
                studentLastName: studentInfo.userAccount.lastName,
                course: studentInfo.courseCode,

            })


        } catch (error) {
            console.log(error);
        }

    }
    getActiveReport = async () => {
        const id = 3;

        try {
            const response2 = await axios.get(`http://localhost:8080/report/file/active/${id}`);
            const info2 = response2.data;

            const response3 = await axios.get(`http://localhost:8080/get_account_by_user_id/${id}`);
            const info3 = response3.data;

            this.setState({
                currentReport: info2.fileName,
                currentComment: info2.reportDescription,
                fileData:info2.fileData,
                reportId:info2.reportId,
                firstName: info3.firstName,
                lastName: info3.lastName
            }, () => {

            });
        } catch (error) {
            console.log(error);
        }
    };

    handleFileChange = (event) => {
        const file = event.target.files[0];
        this.setState({currentFile:file})
    };

    sendFeedback = async (event) => {


        event.preventDefault();
        const feedbackData = {
            senderId: this.props.userId,
            reportId: this.state.reportId,
            feedbackDescription: "asd",
            uploadDate: new Date().toISOString(), // Set the appropriate date format
        };

        console.log("uploaded a feedback")

        axios.post("http://localhost:8080/feedback", feedbackData)
            .then((response) => {
                console.log("Feedback created successfully");
                console.log( "feedback: ",response.data);

                const feedbackId = response.data;


                const formData = new FormData();
                formData.append('studentId', this.state.studentId);
                console.log("student id:", this.state.studentId)
                formData.append('fileData', this.state.currentFile);
                console.log("file:", this.state.currentFile)
                formData.append('feedbackDescription', "asd");
                console.log("feedback id:",feedbackId)
                formData.append('feedbackId', feedbackId);

                axios.post("http://localhost:8080/feedback/file", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((response) => {
                        console.log("File uploaded successfully");
                        console.log(response.data);
                    })
                    .catch((error) => {
                        // Handle error
                        console.error(error);
                    });
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });

    };

    render(){
        return(
            <div className="page">
                <div className="viewandfeedback">
                    <div className="viewreport">
                        <b>Viewing the summer training report of {this.state.firstName} {this.state.lastName}</b>
                        <hr></hr>
                        <Typography>Student's current submission:
                            <IconButton aria-label="download" onClick={() => this.downloadCurrent()}>
                                <DownloadIcon/>
                            </IconButton>
                            <Button variant="text" onClick={() => this.downloadCurrent()} style={{textTransform: 'none'}} size="large"> {this.state.currentReport}</Button>
                        </Typography>
                        <Typography>Student's comments:</Typography>
                        <textarea readOnly value={this.state.currentComment || ''}></textarea>
                        <hr></hr>
                    </div>
                    <div className="tafeedback">
                        <b>Assessment of the report</b>
                        <hr></hr>
                        <div className="texteditor">
                            <TextareaValidator />
                        </div>
                        <div className="annotated">
                            <Typography>Upload annotated feedback here: </Typography>
                            <Button variant="contained" hidden onChange={this.handleFileChange} component="label">
                                <FileUploadIcon /> Upload File
                                <input type="file" hidden />
                            </Button>
                            {this.state.currentFile && (
                                <div>
                                    <h2>Selected File:</h2>
                                    <p>{this.state.currentFile.name}</p>
                                    <p>Size: {this.state.currentFile.size} bytes</p>
                                    <p>Type: {this.state.currentFile.type}</p>
                                    {/* Additional information or display logic */}
                                    <Button
                                        onClick={this.sendFeedback}
                                        variant='contained'
                                        color="success"
                                        sx={{ marginRight: '10px' }}
                                    > Send feedback </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
        

    

}

export default TeachingAssistantFeedback