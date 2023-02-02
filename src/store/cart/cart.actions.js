import { CART_ACTION_TYPES } from "./cart.types";

export const addToCart = (item) => (dispatch) => {
  dispatch({
    type: CART_ACTION_TYPES.ADD_TO_CART,
    payload: item,
  });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: CART_ACTION_TYPES.REMOVE_FROM_CART,
    payload: id,
  });
};

export const clearFromCart = (id) => (dispatch) => {
  dispatch({
    type: CART_ACTION_TYPES.CLEAR_FROM_CART,
    payload: id,
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CART_ACTION_TYPES.CLEAR_CART,
    payload: [],
  });
};
