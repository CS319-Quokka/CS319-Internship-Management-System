import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import * as SlIcons from "react-icons/sl";
import * as IoIcons from "react-icons/io";
import { withRouter } from 'react-router-dom';
import "../Styles/List.css";
import { UserContext } from "../UserContext";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";



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


class DisplayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      showOptions:null,
      showRemove:false
      
    };
    this.handleOptions = this.handleOptions.bind(this);
    this.handleReminder = this.handleReminder.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  static contextType = UserContext;

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleReminder() {
    const response = window.confirm("Would you like to send a reminder to this instructor?");
    if (response === true) {
      // User clicked OK
      window.alert("Reminder sent!");
    } 
  }

  handleOptions = (index) => {
    if (this.state.showOptions === index) {
      this.setState({ showOptions: null });
      this.props.setControllerState(false);
    } else {
      this.setState({ showOptions: index });
      this.props.setControllerState(true);
    }
    
  };
  selectUser = (id) => {
    return () => {  // Return a function that will be called on click
      console.log("SELECT USER");
      this.context.setUserIdValue(id);
    };
  }
  
  
  render() {
    const { searchTerm } = this.state;
    const { showOptions } = this.state;
    

    const { data, displayFields } = this.props;
    const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <IconContext.Provider value={{ color: "undefined" }}>
          <div className="list-container">
         
          <nav className="list">
          
          <div className="bar">
        
            <div className="search">
            <h2> Search By Name</h2>
            
          <input className="search-bar"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={this.handleSearchChange}
            style={{ marginBottom: "10px" }}
          />

            <div className="add"></div>
            </div>
           
          <div className="list-header">
                
                <div className="value"></div>
                {displayFields.map((field, index) => (
                            <div className="value">{field}</div>
                            ))}
              </div>
          </div>
            <ul className="list-items">
              
              {filteredItems.map((item, index) => {
                const isLastItem = index === data.length - 1;
                return (
                  <React.Fragment key={index}>
                    <li className="list-item">

                      <Link
                          to = "/evaluation" onClick={this.selectUser(item.id)}

                           >
                        <div className="row">
                            {displayFields.map((field, index) => (
                            <div className="value">{item[field]}</div>
                            ))}
                      

                          <div className="options">
                            <div className="choices">
                                <div id="reminder">
                                    <button onClick={this.handleReminder} className="button">{<IoIcons.IoMdAlert />}</button>
                                </div>
                            <div id="options">
                                {/*
                                <button onClick={() => this.handleOptions(index)} className="icon-button">{<SlIcons.SlOptionsVertical />}</button>
*/}
                                <LongMenu
                                  /*  content={}*/
                                />
                                {/*
                             {showOptions === index  && (
                               this.props.choice
                             
                            )}
                            */}
                            </div>
                            </div>
                            
                          </div>
                        </div>
                      </Link>
                    </li>
                   
                    {!isLastItem && <hr className="line"></hr>}
                  </React.Fragment>
                );
              })}
            </ul>
          </nav>
          </div>
        </IconContext.Provider>
        
    );
  }
}

export default DisplayList;
