import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from '../actions/cartActions';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id && item.color === action.payload.color
      );

      if (existingItemIndex >= 0) {
        return {
          ...state,
          cartItems: state.cartItems.map((item, index) =>
              index === existingItemIndex
                  ? { ...item, count: item.count + action.payload.count }  // Add the quantity passed in the action
                  : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload }],  // Use the payload as it is, count is already passed
      };
    }




    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => !(item.id === action.payload.id && item.color === action.payload.color)
        ),
      };
    }
    

    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload.id && item.color === action.payload.color
              ? { ...item, count: item.count - 1 }
              : item
          )
          .filter((item) => item.count > 0),
      };
    }
    

    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id && item.color === action.payload.color
            ? { ...item, count: item.count + 1 }
            : item
        ),
      };
    }
    

    default:
      return state;
  }
};

export default cartReducer;
