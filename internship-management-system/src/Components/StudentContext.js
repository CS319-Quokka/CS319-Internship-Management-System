import React, { createContext, useState } from 'react';

export const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);

  const setStudentIdValue = (id) => {
    setStudentId(id);
  };

 
  return (
    <StudentContext.Provider value={{ studentId, setStudentId: setStudentIdValue }}>
         {console.log("here with the id: ", studentId)}
      {children}
    </StudentContext.Provider>
  );
};
