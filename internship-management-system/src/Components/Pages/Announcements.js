import React, {Component} from 'react'
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

function AnnouncementList() {
    return (
        <ul>
            {AnnouncementData.map(announcement => (
                <li key={announcement.date}>
                    <h2>From: {announcement.poster}</h2>
                    <textarea readOnly>{announcement.message}</textarea>
                    <h2>{announcement.date}</h2>
                    <hr></hr>
                </li>
            ))}
        </ul>
    );
}
function TextareaValidator() {
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);
    return (
        <FormControl>
            <FormLabel>New Announcement</FormLabel>
            <Textarea
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

function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Make Announcement
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Announcement</DialogTitle>
                <DialogContent>
                    <TextareaValidator/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Post</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



class Announcements extends Component {
    constructor(props) {
        super(props)
        this.state ={}
    }

    render(){
        return(
            <div className='maincontainer-notif'>
                <div className='admin'>
                    <h1>📢</h1>

                    <br></br>
                    <h1>ANNOUNCEMENTS <hr></hr> <FormDialog/> </h1>

                    <br></br>
                    <hr></hr>
                    <div className='announcementList'>
                        <AnnouncementList/>
                    </div>
                </div>


            </div>

        )}

}

export default Announcements
