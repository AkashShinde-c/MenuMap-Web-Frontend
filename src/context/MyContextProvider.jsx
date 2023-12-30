// src/contexts/MyContextProvider.js
import React, { useState } from 'react';
import MyContext from './MyContext';

const MyContextProvider = ({ children }) => {
  const [showAbout, setShowAbout] = useState(false);

  const updateValue = (newValue) => {
    setShowAbout(newValue);
  };

  return (
    <MyContext.Provider value={{ showAbout, updateValue }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
