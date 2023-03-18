import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductDetails, fetchProducts, fetchProductsByCategory, getProductsBySearch } from "../api";
import { ProductType } from "../constants.types";
import { RootState } from "../store";
import { FiltersType } from "../api";

const initialState: InitialProductsState = {
  loading: false,
  products: [],
  filteredProducts: [],
  sortBy: "falling",
  error: undefined || "",
  maxPrice: 0,
  minPrice: 0,
  show: false,
  product: {} as ProductType,
  totalProducts: 0,
  categories: []
};

type InitialProductsState = {
  loading: boolean;
  products: ProductType[] ;
  filteredProducts: ProductType[];
  sortBy: string;
  error: string | undefined;
  maxPrice: number;
  minPrice: number;
  show: boolean;
  product: ProductType;
  totalProducts : number;
  categories: string[]
}

export const listProducts = createAsyncThunk(
  "products/listProducts",
  async (filters: FiltersType) => {
    try {
      const { data } = await fetchProducts(filters);
      const { products, totalProducts, category, maxPrice, minPrice } = data
      
      return {products, totalProducts, category, maxPrice, minPrice};
    } catch (error: any) {
      console.log(error)
      return error || error.response.data.error;
    }
  }
);


export const searchProducts = createAsyncThunk(`/products/search`, async (searchQuery: string) => {
  try {
    const {data} = await getProductsBySearch(searchQuery)
    return [...data]

  } catch (error: any) {
    console.log(error)
    return error || error.response.data.message
  }
})

export const getProductsByCategory = createAsyncThunk(`/products/category?category=`, async(category: string) =>{
  try{
    const {data} = await fetchProductsByCategory(category)
    const { products, totalProducts } = data
    return {products, totalProducts}
  } catch(error:any){
    console.log(error)
    return error || error.response.data.message
  }
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSortBy(state: InitialProductsState, action: PayloadAction<string>) {
      const value: string = action.payload;
      state.sortBy = value;
    },
     
    setShow(state, action: PayloadAction<boolean>){
      const value = action.payload
      state.show = value

    } 
   },

  extraReducers(builder) {
    builder
      .addCase(listProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.message){
          state.error = action.payload.message
          return
        }
        state.filteredProducts = action.payload.products;
        state.categories = action.payload.category;
        state.totalProducts = action.payload.totalProducts
        state.maxPrice = action.payload.maxPrice
        state.minPrice = action.payload.minPrice
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchProducts.pending, (state, action) => {
        state.loading = true
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.filteredProducts = action.payload
      })
      .addCase(getProductsByCategory.pending, (state, action) => {
        state.loading = true 
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.totalProducts = action.payload.totalProducts
      })
  },
});

export const selectProducts = (state: RootState) => state.allProducts.products;
export const selectFilteredProducts = (state: RootState) => state.allProducts.filteredProducts
export const selectTotalProducts = (state:RootState) => state.allProducts.totalProducts
export const selectCategories = (state: RootState) => state.allProducts.categories
export const selectProduct = (state: RootState) => state.allProducts.product
export const productLoading = (state: RootState) => state.allProducts.loading;
export const getSortBy = (state: RootState) => state.allProducts.sortBy;
export const errorMessage = (state: RootState) => state.allProducts.error;
export const selectShow = (state: RootState) => state.allProducts.show

export const { setSortBy, setShow } = productsSlice.actions;

export default productsSlice.reducer;
