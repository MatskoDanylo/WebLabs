import React, { useState, useEffect, useContext } from 'react';
import PetCard from './PetCard';
import PrimaryButton from './PrimaryButton';
import './Catalog.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SortSection from './SortSection';
import Loader from '../Loader';
import AddPetForm from './AddPetForm';
import { createPet, getPets, searchAndSortPets } from '../../api/apiService';
import { PetContext } from './PetContext';

const Catalog = () => {
  const [pets, setPets] = useState([]);
  const { petsData, setPetsData } = useContext(PetContext);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Choose one...");

  // Filter states
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    setLoading(true);
    getPets()
      .then(petsWithUniqueKeys => {
        setPets(petsWithUniqueKeys);
        setPetsData(petsWithUniqueKeys);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching pets:", error);
        setLoading(false);
      });
  }, [setPetsData]);

  useEffect(() => {
    handleSearchAndSort();
  }, [sortOption]);

  const handleSearchAndSort = () => {
    setLoading(true);
    searchAndSortPets(searchTerm, sortOption, minAge, maxAge, minPrice, maxPrice)
      .then(response => {
        const petsWithUniqueKeys = response.data.map((pet, index) => ({
          ...pet,
          uniqueKey: `${pet.id}-${index}`, // Ensure unique keys
        }));
        setPets(petsWithUniqueKeys);
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
        const newPet = {
          ...response.data,
          uniqueKey: `${response.data.id}-${pets.length}`, // Ensure unique keys
        };
        setPets(prevPets => [...prevPets, newPet]);
        setPetsData(prevPetsData => [...prevPetsData, newPet]);
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
        <SortSection sortOption={sortOption} handleSort={(e) => setSortOption(e.target.value)} />

        {loading ? (
          <Loader />
        ) : (
          <div className="product-list">
            {pets.map(pet => (
              <PetCard key={pet.uniqueKey} pet={pet} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Catalog;
