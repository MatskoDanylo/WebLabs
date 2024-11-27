import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PetContext } from './PetContext';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './ItemPage.css';
import { addToCart } from '../../redux/actions/cartActions';

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { petsData } = useContext(PetContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');

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

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert('Please select a color.');
      return;
    }

    dispatch(
        addToCart({
          id: pet.id,
          name: pet.name,
          price: pet.price,
          count: quantity,
          color: selectedColor,
          image: pet.image,
        })
    );

    alert(`${pet.name} has been added to your cart!`);
  };


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
            <div className="selectors">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                />
              </div>
              <div className="color-selector">
                <label>Color:</label>
                <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Black">Black</option>
                </select>
              </div>
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="back-button" onClick={() => navigate('/catalog')}>
              Return to Catalog
            </button>
          </div>
        </div>
        <Footer />
      </>
  );
};

export default ItemPage;
