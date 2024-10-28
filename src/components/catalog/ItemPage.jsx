import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PetContext } from './PetContext';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './ItemPage.css';

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { petsData } = useContext(PetContext);

  // Check if pets are defined
  if (!petsData || petsData.length === 0) {
    return <p>Loading...</p>;
  }

  // Find the pet by id
  const pet = petsData.find((pet) => pet.id === parseInt(id));

  // Handle the case where the pet is not found
  if (!pet) {
    return <p>Pet not found</p>;
  }

  return (
    <>
      <Header />
      <div className="item-page-container">
        <div className="item-details">
          <h1 className="item-title">{pet.name}</h1>
          <img src={pet.img} alt={pet.name} className="item-img" />
          <div className="item-info">
            <p className="item-description">{pet.description}</p>
            <p className="item-age">Age: {pet.age} years</p>
            <p className="item-price">Price: ${pet.price}</p>
          </div>
          <button className="back-button" onClick={() => navigate('/catalog')}>Return to Catalog</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ItemPage;