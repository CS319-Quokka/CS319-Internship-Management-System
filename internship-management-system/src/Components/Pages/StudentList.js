import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListData } from "../ListData";
import "../Styles/List.css";
import { IconContext } from "react-icons";
import * as ImIcons from "react-icons/im";
import * as SlIcons from "react-icons/sl";

class List extends Component {
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

  handleOptions() {
    console.log("bastı");
    // this.setState(prevState => ({
    //   isToggleOn: !prevState.isToggleOn
    // }));
  }

  render() {
    const { searchTerm } = this.state;

    const filteredItems = ListData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="maincontainer">
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

            </div>
           
          <div className="list-header">
                <div className="value"></div>
                <div className="value">Name</div>
                <div className="value">Class</div>
                <div className="value">Report Status</div>
              </div>
          </div>
            <ul className="list-items">
              
              {filteredItems.map((item, index) => {
                const isLastItem = index === filteredItems.length - 1;
                return (
                  <React.Fragment key={index}>
                    <li className="list-item">
                      <Link>
                        <div className="row">
                          <p className="value">{item.name}</p>

                          <p className="value">{item.class}</p>
                          <p className="value">{item.uploaded}</p>

                      

                          <div
                            className="options"
                            onClick={this.handleOptions}
                          >
                            {" "}
                            {<SlIcons.SlOptionsVertical />}
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
      </div>
    );
  }
}

export default List;
