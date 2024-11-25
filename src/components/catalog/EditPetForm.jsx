import React, { useState } from 'react';
import './EditPetForm.css';

const EditPetForm = ({ pet, onSave, onCancel }) => {
    const [name, setName] = useState(pet.name);
    const [description, setDescription] = useState(pet.description);
    const [age, setAge] = useState(pet.age);
    const [price, setPrice] = useState(pet.price);
    const [color, setColor] = useState(pet.color); // Додано поле кольору
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const newErrors = {};

        if (!name) {
            newErrors.name = "Name cannot be empty.";
        } else if (/\d/.test(name)) {
            newErrors.name = "Name cannot contain numbers.";
        }

        if (!description) {
            newErrors.description = "Description cannot be empty.";
        }

        if (age < 0.1 || age > 100) {
            newErrors.age = "Age must be between 0.1 and 100 years.";
        }

        if (price < 0 || price > 10000) {
            newErrors.price = "Price must be between 0 and 10,000.";
        }

        if (!color) {
            newErrors.color = "Color cannot be empty."; // Перевірка кольору
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateInputs()) {
            const updatedPet = {
                ...pet,
                name,
                description,
                age: parseFloat(age),
                price: parseFloat(price),
                color, // Оновлений колір
            };
            onSave(updatedPet);
        }
    };

    return (
        <div className="edit-pet-form">
            <h2>Edit {pet.name}</h2>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </label>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <span className="error">{errors.description}</span>}
            </label>
            <label>
                Age:
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="0.1"
                    max="100"
                />
                {errors.age && <span className="error">{errors.age}</span>}
            </label>
            <label>
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    max="10000"
                />
                {errors.price && <span className="error">{errors.price}</span>}
            </label>
            <label>
                Color: 
                <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                {errors.color && <span className="error">{errors.color}</span>}
            </label>
            <div className="form-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};




export default EditPetForm;
