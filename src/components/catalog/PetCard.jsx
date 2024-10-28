import React, { useState, useContext } from 'react';
import './PetCard.css';
import { Link } from 'react-router-dom';
import EditPetForm from './EditPetForm';
import { PetContext } from './PetContext';

const PetCard = ({ pet }) => {
  const { petsData, setPetsData } = useContext(PetContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedPet) => {
    const updatedPets = petsData.map((p) => (p.id === updatedPet.id ? updatedPet : p));
    setPetsData(updatedPets);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleRemove = () => {
    const updatedPets = petsData.filter((p) => p.id !== pet.id);
    setPetsData(updatedPets);
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <EditPetForm pet={pet} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <img src={pet.img} alt={pet.name} className="product-img" />
          <div className="product-info">
            <h1>{pet.name}</h1>
            <p>{pet.description}</p>
            <p>Age: {pet.age} years</p>
            <p>Price: {pet.price}$</p>
          </div>
          <div className="product-buttons">
            <button className="primar-button edit" onClick={handleEdit}>Edit</button>
            <button className="primar-button remove" onClick={handleRemove}>Remove</button>
   
            <Link to={`/item/${pet.id}`} className="primary-button view-more">View More</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default PetCard;
