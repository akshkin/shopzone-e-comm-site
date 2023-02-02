import { CART_ACTION_TYPES } from "./cart.types";

export const cartReducer = (state = { cartItems: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.ADD_TO_CART:
      const cartItem = payload;

      const existingItemInCart = state.cartItems.find(
        (item) => item._id === cartItem._id
      );

      if (existingItemInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === cartItem._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...cartItem, quantity: 1 }],
      };

    case CART_ACTION_TYPES.REMOVE_FROM_CART:
      const id = payload;

      const itemInCart = state.cartItems.find((item) => item._id === id);

      if (itemInCart.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter((cartItem) => cartItem._id !== id),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem._id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          ),
        };
      }

    case CART_ACTION_TYPES.CLEAR_FROM_CART:
      const itemId = payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== itemId
        ),
      };

    case CART_ACTION_TYPES.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
