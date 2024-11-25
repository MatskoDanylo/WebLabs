export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';

export const increaseQuantity = (id, color) => ({
  type: INCREASE_QUANTITY,
  payload: { id, color },
});
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (id, color) => ({
  type: REMOVE_FROM_CART,
  payload: { id, color },
});

export const decreaseQuantity = (id, color) => ({
  type: DECREASE_QUANTITY,
  payload: { id, color },
});
