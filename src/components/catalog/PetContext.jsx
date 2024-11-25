import React, { createContext, useState } from 'react';


export const PetContext = createContext();


export const PetProvider = ({ children }) => {
 
  const [petsData, setPetsData] = useState([]);

  return (
    <PetContext.Provider value={{ petsData, setPetsData }}>
      {children}
    </PetContext.Provider>
  );
};
