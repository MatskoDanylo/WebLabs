import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Вкажіть URL до вашого серверу

// Отримати всі товари (пети)
export const getPets = () => axios.get(`${API_BASE_URL}/items`);

// Створити новий товар (пет) з зображенням
export const createPet = (petData, image) => {
  const formData = new FormData();
  formData.append('name', petData.name);
  formData.append('description', petData.description);
  formData.append('age', petData.age);
  formData.append('price', petData.price);
  formData.append('color', petData.color); // Додаємо колір
  formData.append('image', image);

  return axios.post(`${API_BASE_URL}/items`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
};



export const deletePet = (id) => axios.delete(`${API_BASE_URL}/items/${id}`);

export const updatePet = (id, petData, image) => {
  const formData = new FormData();
  formData.append('name', petData.name);
  formData.append('description', petData.description);
  formData.append('age', petData.age);
  formData.append('price', petData.price);
  formData.append('color', petData.color); // Додаємо колір
  if (image) {
      formData.append('image', image);
  }

  return axios.put(`${API_BASE_URL}/items/${id}`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
};


export const searchAndSortPets = (searchTerm, sortOption, minAge, maxAge, minPrice, maxPrice, color) => {
  const params = new URLSearchParams();
  if (searchTerm) params.append("search_term", searchTerm);
  if (sortOption && sortOption !== "Choose one...") params.append("sort_option", sortOption);
  if (minAge) params.append("min_age", minAge);
  if (maxAge) params.append("max_age", maxAge);
  if (minPrice) params.append("min_price", minPrice);
  if (maxPrice) params.append("max_price", maxPrice);
  if (color) params.append("color", color); // Додаємо колір

  return axios.get(`${API_BASE_URL}/search_and_sort`, { params });
};
  
