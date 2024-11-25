import React, { useState } from 'react';
import './AddPetForm.css';

const AddPetForm = ({ onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState(''); // Додано поле кольору
    const [image, setImage] = useState(null);
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
            const newPet = {
                name,
                description,
                age: parseFloat(age),
                price: parseFloat(price),
                color, // Передаємо колір
            };
            onSave(newPet, image);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="add-pet-form">
            <h2>Add New Pet</h2>
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
                Color: {/* Поле для вводу кольору */}
                <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                {errors.color && <span className="error">{errors.color}</span>}
            </label>
            <label>
                Image:
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </label>
            <div className="form-buttons">
                <button onClick={handleSave}>Add</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default AddPetForm;


