import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../../redux/actions/cartActions';
import './CartPage.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.count, 0)
    .toFixed(2);

  return (
    <>
      <Header />
      <div className="cart-page">
        <h1>Your cart</h1>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.color}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Type: {item.type}</p>
                  <p>Color: {item.color}</p>
                  <div className="cart-item-controls">
                    <button onClick={() => dispatch(increaseQuantity(item.id, item.color))}>
                      +
                    </button>
                    <span>{item.count}</span>
                    <button onClick={() => dispatch(decreaseQuantity(item.id, item.color))}>
                      -
                    </button>
                  </div>
                  <p className="cart-item-price">{(item.price * item.count).toFixed(2)} $</p>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => dispatch(removeFromCart(item.id, item.color))}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h2>Total price: {totalPrice} $</h2>
            <div className="cart-actions">
              <button className="cart-back-button" onClick={() => navigate('/catalog')}>
                Go back
              </button>
              <button className="cart-continue-button">Continue</button>
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};


export default CartPage;
