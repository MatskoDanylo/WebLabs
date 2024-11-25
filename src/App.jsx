import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Catalog from './components/catalog/Catalog';
import { PetProvider } from './components/catalog/PetContext';
import ItemPage from './components/catalog/ItemPage';
import { Provider } from 'react-redux';
import store,  { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import CartPage from './components/cart/CartPage';

function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
    <PetProvider>
    <Router>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/cart" element={<CartPage />} /> 
      </Routes>
    </Router>
    </PetProvider>
    </PersistGate>
    </Provider>

  );
}

export default App;
