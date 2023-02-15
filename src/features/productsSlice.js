import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { fetchProducts } from "../api";

const initialState = {
  loading: false,
  products: [],
  sortBy: "falling",
  error: "",
};

export const listProducts = createAsyncThunk(
  "products/listProducts",
  async () => {
    try {
      const { data } = await fetchProducts();
      return [...data];
    } catch (error) {
      return error || error.response.data.error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSortBy(state, action) {
      const value = action.payload;
      state.sortBy = value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(listProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state = { ...state, products: action.payload, error: "" };
        // state.products = [...action.payload];
        // state.error = "";
      });
  },
});

export const selectProducts = (state) => state.allProducts.products;
export const productLoading = (state) => state.allProducts.loading;
export const getSortBy = (state) => state.allProducts.sortBy;
export const errorMessage = (state) => state.allProducts.error;

export const { setSortBy } = productsSlice.actions;

export default productsSlice.reducer;
