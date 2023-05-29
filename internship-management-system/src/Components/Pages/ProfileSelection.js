import React, { Component, useState } from 'react'
import '../Styles/ProfileSelection.css'
const userTypes = ["student",
                            "instructor",
                            "administrative-assistant",
                            "TA",
                            "coordinator",
                            "admin" 
                        ];
function ProfileSelection() {
  const [selectedUserType, setSelectedUserType] = useState('');

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
  };

  const handleUserTypeSubmit = () => {
    fetch('/profileselection', {
      method: 'POST',
      headers: {
   //     'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `user-type=${selectedUserType}`
    }).then(response => {
      window.location.href = response.url;
    });
  };
  return (
    <div className="profile-selection-container">
      <h1>Welcome, {/** name*/}

      </h1>
      <h1>Choose your account:</h1>
      <div className="profile-selection-buttons-container">
        <button className={`profile-selection-button ${selectedUserType === 'coordinator' ? 'selected' : ''}`} onClick={() => handleUserTypeSelect('coordinator')}>

          <div>{userTypes[4]}</div>
        </button>
        <button className={`profile-selection-button ${selectedUserType === 'instructor' ? 'selected' : ''}`} onClick={() => handleUserTypeSelect('instructor')}>
          <div>{userTypes[1]}</div>
        </button>
      </div>
      <button className="profile-selection-submit-button" disabled={!selectedUserType} onClick={handleUserTypeSubmit}>Go to profile</button>
    </div>
  );
}

export default ProfileSelection;
