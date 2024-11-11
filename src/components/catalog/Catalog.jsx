import React, { useState, useEffect, useContext } from 'react';
import PetCard from './PetCard';
import PrimaryButton from './PrimaryButton';
import './Catalog.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SortSection from './SortSection';
import { getPets, searchAndSortPets } from '../../api/apiService';
import Loader from '../Loader';
import AddPetForm from './AddPetForm';
import { createPet } from '../../api/apiService';
import { PetContext } from './PetContext';

const Catalog = () => {
  const [pets, setPets] = useState([]);
  const { petsData, setPetsData } = useContext(PetContext);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name(a-z)");

  // Filter states
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    setLoading(true);
    getPets()
      .then(response => {
        setPets(response.data);
        setPetsData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching pets:", error);
        setLoading(false);
      });
  }, []);

  // Fetch pets when search or sort criteria change
  useEffect(() => {
    handleSearchAndSort();
  }, [sortOption]); // Add sortOption dependency

  const handleSearchAndSort = () => {
    setLoading(true);
    searchAndSortPets(searchTerm, sortOption, minAge, maxAge, minPrice, maxPrice)
      .then(response => {
        setPets(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error filtering and sorting pets:", error);
        setLoading(false);
      });
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleSavePet = (newPetData, image) => {
    createPet(newPetData, image)
      .then(response => {
        setPets(prevPets => [...prevPets, response.data]);
        setPetsData(prevPetsData => [...prevPetsData, response.data]);
        setShowAddForm(false);
      })
      .catch(error => {
        console.error("Error creating pet:", error);
      });
  };

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  return (
    <>
      <Header />
      <div className="catalog-container">
        <div className="catalog-header">
          <PrimaryButton label="Add a Pet" onClick={handleAddButtonClick} />
          {showAddForm && (
            <div className="add-pet-form-overlay">
              <AddPetForm onSave={handleSavePet} onCancel={handleCancelAdd} />
            </div>
          )}
          <div className="search-filter-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search pets by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filters">
              <label>
                Min Age:
                <input type="number" value={minAge} onChange={(e) => setMinAge(e.target.value)} />
              </label>
              <label>
                Max Age:
                <input type="number" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
              </label>
              <label>
                Min Price:
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              </label>
              <label>
                Max Price:
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </label>
            </div>
            <PrimaryButton label="Search & Sort" onClick={handleSearchAndSort} />
          </div>
        </div>
        
        {/* Pass the handleSort directly to update sortOption on selection */}
        <SortSection sortOption={sortOption} handleSort={(e) => setSortOption(e.target.value)} />

        {loading ? (
          <Loader />
        ) : (
          <div className="product-list">
            {pets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Catalog;
