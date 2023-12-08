import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType } from "../constants.types";
import { RootState } from "../store";
import {
  addToCart,
  clearCart,
  clearCartItem,
  getCart,
  removeFromCart,
} from "../api";

const initialState: Cart = {
  loading: false,
  cartItems: [],
  error: null,
  totalPrice: 0,
};
export type CartItemType = {
  // productId: string;
  product: ProductType;
  quantity: number;
  totalPrice: number;
};

type Cart = {
  loading: boolean;
  cartItems: CartItemType[];
  error: null | string;
  totalPrice: number;
};

export const addProductToCart = createAsyncThunk(
  "/cart/add",
  async ({ cartItem }: { cartItem: ProductType }) => {
    try {
      const response = await addToCart({
        cartItem: cartItem,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "/cart/remove",
  async ({ id }: { id: string }) => {
    try {
      const response = await removeFromCart({ id });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);
export const clearProductFromCart = createAsyncThunk(
  "/cart/clearItem",
  async ({ id }: { id: string }) => {
    try {
      const response = await clearCartItem({ id });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
export const clearCartItems = createAsyncThunk("/cart/clear", async () => {
  try {
    const response = await clearCart();
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
});

export const getCartProducts = createAsyncThunk("/cart/get", async () => {
  try {
    const response = await getCart();
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
});

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCartUnlogged(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.product._id === action.payload._id
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.product._id === existingItem.product._id
            ? {
                ...existingItem,
                quantity: existingItem.quantity + 1,
                totalPrice:
                  (existingItem.quantity + 1) * existingItem.product.price,
              }
            : item
        );
      } else {
        state.cartItems = [
          ...state.cartItems,
          {
            product: action.payload,
            quantity: 1,
            totalPrice: action.payload.price,
          },
        ];
      }
      state.totalPrice = state.cartItems.reduce(
        (acc, current) => acc + current.totalPrice,
        0
      );
    },
    removeProductFromCartUnlogged(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.product._id === action.payload
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.product._id !== action.payload
          );
        } else {
          state.cartItems = state.cartItems.map((item) =>
            item.product._id === action.payload
              ? {
                  ...existingItem,
                  quantity: existingItem.quantity - 1,
                  totalPrice:
                    (existingItem.quantity - 1) * existingItem.product.price,
                }
              : item
          );
        }
      }
      state.totalPrice = state.cartItems.reduce(
        (acc, current) => acc + current.totalPrice,
        0
      );
    },
    clearItemFromCartUnlogged(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== action.payload
      );
      state.totalPrice = state.cartItems.reduce(
        (acc, current) => acc + current.totalPrice,
        0
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.cartItems = action.payload.cart.products;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.cartItems = action.payload.cart.products;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(clearProductFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.cartItems = action.payload.cart.products;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(getCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = null;
        state.cartItems = action.payload.cart.products;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(clearCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = null;
        state.cartItems = [];
      });
  },
});

export const selectCartItems = (state: RootState) => state.cartItems.cartItems;
export const selectTotalPrice = (state: RootState) =>
  state.cartItems.totalPrice;
export const cartLoading = (state: RootState) => state.cartItems.loading;
export const {
  addToCartUnlogged,
  removeProductFromCartUnlogged,
  clearItemFromCartUnlogged,
} = cartSlice.actions;

export default cartSlice.reducer;
