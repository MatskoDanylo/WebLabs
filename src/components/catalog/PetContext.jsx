import React, { createContext, useState } from 'react';


export const PetContext = createContext();


export const PetProvider = ({ children }) => {
 
  const [petsData, setPetsData] = useState([
    { id: 1, name: 'Felix', description: 'A friendly cat', age: 2, price: 100, img: '/assets/cat.jpg' },
    { id: 2, name: 'Bobik', description: 'A playful dog', age: 5, price: 300, img: '/assets/dog.jpg' },
    { id: 3, name: 'Birdie', description: 'A singing bird', age: 1, price: 50, img: '/assets/bird.jpg' },
    { id: 4, name: 'Djonii', description: 'A playful cat', age: 13, price: 150, img: '/assets/cat3.jpg' },
    { id: 5, name: 'Bibi', description: 'A special pet', age: 1, price: 325, img: '/assets/cat.jpg' },
  ]);

  return (
    <PetContext.Provider value={{ petsData, setPetsData }}>
      {children}
    </PetContext.Provider>
  );
};
