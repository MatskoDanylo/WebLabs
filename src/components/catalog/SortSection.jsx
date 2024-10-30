import React from 'react';
import './Select.css'

const SortSection = ({ sortOption, handleSort }) => (
  <div className="sort-section">
    <label>Sort by:</label>
    <select value={sortOption} onChange={handleSort}>
      <option value="Choose one...">Choose one...</option>
      <option value="Age (Low - High)">Age (Low - High)</option>
      <option value="Age (High - Low)">Age (High - Low)</option>
      <option value="Price (Low - High)">Price (Low - High)</option>
      <option value="Price (High - Low)">Price (High - Low)</option>
      <option value="Name (A - Z)">Name (A - Z)</option>
      <option value="Name (Z - A)">Name (Z - A)</option>
    </select>
  </div>
);

export default SortSection;
