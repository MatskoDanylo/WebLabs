import React, { useState } from 'react';
import './PetCard.css';
import { Link } from 'react-router-dom';
import EditPetForm from './EditPetForm';
import { deletePet, updatePet } from '../../api/apiService';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

const PetCard = ({ pet, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...pet, color: pet.color }));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500); // Показуємо спливаюче повідомлення на 1.5 секунди
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedPet, image) => {
    updatePet(updatedPet.id, updatedPet, image)
      .then((response) => {
        onEdit(response.data); 
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
        onDelete(pet.id);
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
            <p>Color: {pet.color}</p> 
          </div>
          <div className="product-buttons">
            <button className="primar-button edit" onClick={handleEdit}>Edit</button>
            <button className="primar-button remove" onClick={handleRemove}>Remove</button>
            <Link to={`/item/${pet.id}`} className="primary-button view-more">View More</Link>
          </div>
          <button className="primar-button add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          {showPopup && <div className="cart-popup">Added to Cart!</div>}
        </>
      )}
    </div>
  );
};

export default PetCard;
