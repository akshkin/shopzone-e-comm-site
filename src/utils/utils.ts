import axios from "axios";
import { fetchProductDetails, fetchProducts, fetchProductsByCategory, fetchProductsBySearch, FiltersType } from "../api";
import { ProductType } from "../constants.types";

const baseUrl = "https://shopzone-server.onrender.com";

export type DataType = {
  totalProducts: number;
  maxPrice: number;
  minPrice: number;
  page: number;
  limit: null;
  products: ProductType[];
  category: string[]
}

export async function getProducts(filters: FiltersType): Promise<DataType> {
  try {
    const response = await fetchProducts(filters)
    const data: DataType = await response.data;
    return data
  } catch(error: any){
    console.log(error)
    return error || error.response.data.error.message
  }
}

export async function getProductDetails(id: string): Promise<ProductType> {
  try {
    const response = await fetchProductDetails(id)
    return response.data
  } catch (error: any){
    return error || error.response.data.error.message
  }
}

export async function getProductsBySearch(query: string){
  try {
    const response = await fetchProductsBySearch(query)
    return response.data
  } catch (error: any){
    return error || error.response.data.error.message
  }
}

export async function getProductsByCategory(category: string){
  try {
    const response = await fetchProductsByCategory(category)
    return response.data
  } catch (error: any){
    return error || error.response.data.error.message
  }
}
