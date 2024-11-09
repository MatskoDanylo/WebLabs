import React, { useState, useContext } from 'react';
import './PetCard.css';
import { Link } from 'react-router-dom';
import EditPetForm from './EditPetForm';
import { deletePet, updatePet } from '../../api/apiService';

const PetCard = ({ pet, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);




  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedPet, image) => {
    updatePet(updatedPet.id, updatedPet, image)
      .then((response) => {
        onEdit(response.data);  // Викликаємо onEdit з оновленими даними
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating pet:", error);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleRemove = () => {
    deletePet(pet.id)
      .then(() => {
        onDelete(pet.id);  // Викликаємо onDelete з id видаленого елемента
      })
      .catch((error) => {
        console.error("Error deleting pet:", error);
      });
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <EditPetForm pet={pet} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <img src={pet.image} alt={pet.name} className="product-img" />
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
