import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const cartItem = action.payload;

      const existingItemInCart = state.cartItems.find(
        (item) => item._id === cartItem._id
      );

      if (existingItemInCart && existingItemInCart.quantity) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            typeof item.quantity !== "undefined" && item._id === cartItem._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...cartItem, quantity: 1 }],
      };
    },

    removeFromCart(state, action) {
      const id = action.payload;

      const itemInCart = state.cartItems.find((item) => item._id === id);

      if (itemInCart?.quantity === 1) {
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
    },

    clearFromCart(state, action) {
      const id = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((cartItem) => cartItem._id !== id),
      };
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const selectCartItems = (state) => state.cartItems.cartItems;

export const { addToCart, removeFromCart, clearFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
