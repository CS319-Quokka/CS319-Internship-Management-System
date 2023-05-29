import React, {Component, useEffect, useState} from 'react'
import '../Styles/Notifications.css'
import { AnnouncementData } from '../NotificationData'
import {InstructorNotifData} from '../NotificationData'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import {Alert, AlertTitle} from "@mui/material";

function AnnouncementList(props) {
    return (
      <ul>
        {props.data.map(announcement => (
          <li key={announcement.content}>
            <h2>From: {announcement.sender}</h2>
            <textarea readOnly>{announcement.content}</textarea>
            <h2>Date: {announcement.date}</h2>
            <hr></hr>
          </li>
        ))}
      </ul>
    );
  }
function TextareaValidator(props) {
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);


    const { value, onChange } = props;
    return (
        <FormControl>
            <FormLabel>New Announcement</FormLabel>
            <Textarea
                value={value}
                onChange={onChange}
                placeholder="Type your message here..."
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

function FormDialog({userId, handlePost}) {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // Auto-hide the alerts after a few seconds
        const timer = setTimeout(() => {
            setShowSuccessAlert(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [showSuccessAlert]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        // Close the dialog
        setOpen(false);
    
        // Call the handlePost function that was passed as a prop
        handlePost(text);
        setSuccessMessage("Announcement posted!");
        setShowSuccessAlert(true);
      };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Make Announcement
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Announcement</DialogTitle>
                <DialogContent>
                    <TextareaValidator value={text} onChange={(e) => setText(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Post</Button>
                </DialogActions>
            </Dialog>
            <div id="alertcontainer">

                <Alert
                    severity="success"
                    onClose={() => setShowSuccessAlert(false)}
                    sx={{ display: showSuccessAlert ? 'filled' : 'none' }}
                >
                    <AlertTitle>Success</AlertTitle>
                    {successMessage}
                </Alert>
            </div>
        </div>
    );
}



class Announcements extends Component {
    constructor(props) {
        super(props)

        this.state = {
            announcementNameList:[],
        }
    }

    handlePost = async (text) => {
        const id = this.props.userId;
    
        const response1 = await axios.get(`http://localhost:8080/get_all_users/${id}`);
    
        const senderId = response1.data[0].id

        let uploadDate = new Date().toISOString();
    
        // Make the post request to your API
        try {
          await axios.post(`http://localhost:8080/announcement/made/Administrative Assistant/${senderId}/CS`, {
            title: 'Announcement post deneme 1',
            content: text,
            date: uploadDate,
            // Add other necessary fields here...
          });
          // Refresh the list of announcements...
          this.getAllAnnouncements();
        } catch (error) {
          console.error('Error creating announcement:', error);
        }
    };

    componentDidMount() {
        this.getAllAnnouncements();
    }

    getAllAnnouncements = async () =>{

        const id = this.props.userId; // this is account id !!!
    
        const response1 = await axios.get(`http://localhost:8080/get_all_users/${id}`);
    
        const info = response1.data[0]

        const userRole = info.role;
    
        const response = await axios.get(`http://localhost:8080/announcement?userRole=${userRole}&userId=${info.id}`);
        console.log(response.data); 
    
        const announcementInfo = response.data;
        console.log(announcementInfo.length);
    
        var announ = [];
    
         for (var i = 0; i < announcementInfo.length; i++) {
          
          var senderInfo = announcementInfo[i].sender.userAccount.firstName + " " + announcementInfo[i].sender.userAccount.lastName;
          var titleInfo = announcementInfo[i].title;
          var contentInfo = announcementInfo[i].content;
          var dateInfo = announcementInfo[i].date;
          
          announ.push({
            sender: senderInfo,
            title: titleInfo,
            content: contentInfo,
            date: dateInfo,
          });
        }
    
         this.setState({ announcementNameList: announ });
      
    }

    render(){
        const {announcementNameList} = this.state;
        return(
            <div className='maincontainer-notif'>
                <div className='admin'>
                    <h1>📢</h1>

                    <br></br>
                    <h1>ANNOUNCEMENTS <hr></hr> <FormDialog userId={this.props.userId} handlePost={this.handlePost}/> </h1>

                    <br></br>
                    <hr></hr>
                    <div className='announcementList'>
                        <AnnouncementList link = {"/announcements"} data={announcementNameList} displayFields={['sender','date', 'content']}/>
                    </div>
                </div>


            </div>

        )}

}

export default Announcements
