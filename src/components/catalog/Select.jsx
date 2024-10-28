import React from 'react';
import './Select.css';

const Select = ({ label, options }) => {
  return (
    <div className="select-container">
      <label>{label}</label>
      <select>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
