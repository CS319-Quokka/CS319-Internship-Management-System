import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import * as SlIcons from "react-icons/sl";
import * as IoIcons from "react-icons/io";

class DisplayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
    this.handleOptions = this.handleOptions.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

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

  handleOptions() {
    console.log("bastı");
    // this.setState(prevState => ({
    //   isToggleOn: !prevState.isToggleOn
    // }));
  }

  render() {
    const { searchTerm } = this.state;
    

    const { data, displayFields } = this.props;
    const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <IconContext.Provider value={{ color: "undefined" }}>
          
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
              
              {data.map((item, index) => {
                const isLastItem = index === data.length - 1;
                return (
                  <React.Fragment key={index}>
                    <li className="list-item">
                      <Link>
                        <div className="row">
                            {displayFields.map((field, index) => (
                            <div className="value">{item[field]}</div>
                            ))}
                      

                          <div
                            className="options"
                            onClick={this.handleOptions}
                          >
                            <div className="choices">
                            <div id="reminder"> <button onClick={this.handleReminder} className="button">{<IoIcons.IoMdAlert />}</button></div>
                             <div id="options">{<SlIcons.SlOptionsVertical />}</div>
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
        </IconContext.Provider>
    );
  }
}

export default DisplayList;
