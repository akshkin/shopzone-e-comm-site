import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductDetails,
  fetchProducts,
  fetchProductsByCategory,
  getProductsBySearch,
} from "../api";

const initialState = {
  loading: false,
  products: [],
  sortBy: "falling",
  error: "",
  product: {},
  totalProducts: 0,
  categories: [],
  filteredProducts: [],
};

export const listProducts = createAsyncThunk(
  "products/listProducts",
  async () => {
    try {
      const { data } = await fetchProducts();
      const { products, totalProducts, categories } = data;
      return { products, totalProducts, categories };
    } catch (error) {
      return error || error.response.data.error;
    }
  }
);

export const getProductDetail = createAsyncThunk("/products", async (_id) => {
  try {
    const { data } = await fetchProductDetails(_id);
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

export const searchProducts = createAsyncThunk(
  `/products/search`,
  async (searchQuery) => {
    try {
      const { data } = await getProductsBySearch(searchQuery);
      return [...data];
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  `/products/category?category=`,
  async (category) => {
    try {
      const { data } = await fetchProductsByCategory(category);
      const { products, totalProducts } = data;
      return { products, totalProducts };
    } catch (error) {
      console.log(error);
      return error || error.response.data.message;
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
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.totalProducts = action.payload.totalProducts;
        state.error = "";
      })
      .addCase(searchProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message) {
          state.error = "Something went wrong";
          return;
        }
        state.filteredProducts = action.payload;
      })
      .addCase(getProductDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.product = action.payload;
      })
      .addCase(getProductsByCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      });
  },
});

export const selectProducts = (state) => state.allProducts.products;
export const productLoading = (state) => state.allProducts.loading;
export const selectFilteredProducts = (state) =>
  state.allProducts.filteredProducts;
export const selectTotalProducts = (state) => state.allProducts.totalProducts;
export const selectProduct = (state) => state.allProducts.product;
export const getSortBy = (state) => state.allProducts.sortBy;
export const errorMessage = (state) => state.allProducts.error;

export const { setSortBy } = productsSlice.actions;

export default productsSlice.reducer;
