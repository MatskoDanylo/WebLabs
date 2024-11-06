import React, { useState, useContext, useEffect } from 'react';
import PetCard from './PetCard';
import PrimaryButton from './PrimaryButton';
import './Catalog.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { PetContext } from './PetContext';
import SortSection from './SortSection';

const options = ["Choose one...", "Age (Low - High)", "Age (High - Low)", "Price (Low - High)", "Price (High - Low)", "Name (A - Z", "Name (Z - A)"]

const Catalog = () => {
  const {petsData} = useContext(PetContext);
  const [searchItem, setSearchItem] = useState("");
  const [filteredPets, setFilteredPets] = useState(petsData);
  const [count, setCount] = useState(0);
  const [sortOption, setSortOption] = useState("Choose one...");

  useEffect(() => {
    const applyFilters = () => {
      const trimmedSearchItem = searchItem.trim().toLowerCase();

      let updatedPets = petsData.filter((pet) =>
          pet.name.toLowerCase().includes(trimmedSearchItem)
      );

      if (sortOption !== "Choose one...") {
        updatedPets = sortPets(updatedPets, sortOption);
      }

      setFilteredPets(updatedPets);
    };

    applyFilters();
  }, [petsData, searchItem, sortOption]);


  const sortPets = (petsList, option) => {
    let sortedPets = [...petsList];
    switch (option) {
      case "Age (Low - High)":
        sortedPets.sort((a, b) => a.age - b.age);
        break;
      case "Age (High - Low)":
        sortedPets.sort((a, b) => b.age - a.age);
        break;
      case "Price (Low - High)":
        sortedPets.sort((a, b) => a.price - b.price);
        break;
      case "Price (High - Low)":
        sortedPets.sort((a, b) => b.price - a.price);
        break;
      case "Name (A - Z)":
        sortedPets.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name (Z - A)":
        sortedPets.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sortedPets;
  };

  const handleSearch = (event) => {
    setSearchItem(event.target.value.toLowerCase());
  };

  const handleClear = () => {
    setSearchItem("");
    setSortOption("Choose one...");
    setFilteredPets(petsData);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const handleCount = () => {
    const total = filteredPets.reduce((partialSum, pet) => partialSum + pet.price, 0);
    setCount(total);
  };

  return (
      <>
        <Header />

        <div className="catalog-container">
          <div className="catalog-header">
            <PrimaryButton label="Add a Pet" onClick={() => {}} />

            <div className="search-bar">
              <input
                  type="text"
                  placeholder="Search pets by name..."
                  value={searchItem}
                  onChange={handleSearch}
              />
              <PrimaryButton label="Clear" onClick={handleClear} />
            </div>
          </div>

          <h2>Manage Pets</h2>

          <SortSection
              options={options}
              sortOption={sortOption}
              handleSort={handleSort}
          />

          <div className="total-pets-section">
            <h3>Total Pets Value</h3>
            <div className="total-value">
              <PrimaryButton label="Count" onClick={handleCount} />
              <h4>Total: {count}</h4>
            </div>
          </div>

          <div className="product-list">
            {filteredPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
        <Footer />
      </>
  );
};

export default Catalog;
