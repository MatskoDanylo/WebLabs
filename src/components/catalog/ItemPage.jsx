import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PetContext } from './PetContext';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './ItemPage.css';
import { viewmore } from '../../api/apiService';
import { useEffect } from 'react';

const ItemPage = () => {
  const [pet, setPet] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
   
        const response = await viewmore(id);

        setPet(response.data);

      } catch (error) {
        console.error("Error fetching pet:", error);
         
      }
    };
    fetchPet();
  }, [id, navigate]);
  

  if (!pet) {
    return <p>Pet not found</p>;
  }

  return (
    <>
      <Header />
      <div className="item-page-container">
        <div className="item-details">
          <h1 className="item-title">{pet.name}</h1>
          <img src={pet.image} alt={pet.name} className="item-img" />
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