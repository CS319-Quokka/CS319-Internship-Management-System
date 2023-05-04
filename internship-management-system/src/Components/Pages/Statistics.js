import React, { Component } from 'react';
import '../Styles/Statistics.css';

class Statistics extends Component {
  state = {
    numStudents: 0,
    numInstructors: 0
  };

  componentDidMount() {
    // Simulate fetching data from the server
    setTimeout(() => {
      this.setState({ numStudents: 37, numInstructors: 5 });
    }, 1000);
  }

  render() {
    const { numStudents, numInstructors } = this.state;

    return (
      <div className="maincontainer">
        <div className="instructorstatus">
          <h2>Instructor Status</h2>
          <p>{numInstructors} instructor(s) have started grading reports</p>
        </div>
        <div className="gradestatus">
          <h2>Report Upload Status</h2>
          <p>{numStudents} student(s) have uploaded their reports</p>
        </div>
      </div>
    );
  }
}

export default Statistics;
