import axios from "axios";

const API = axios.create({ baseURL: "https://shopzone-server.onrender.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = JSON.parse(localStorage.getItem("user") || "").token;
  }
  return req;
});

type FormFields = {
  name?: string;
  email: string;
  password: string;
}

export type FiltersType = {
  sort : {
    rating?: string | undefined;
    price?: string | undefined
  };
  category: string[];
  price?: number;
  rating?: number;
}

export const fetchProducts = (filters: FiltersType) => API.get(`/products?sort=${filters.sort.rating || filters.sort.price}&category=${filters.category.toString()}&price=${filters.price}&rating=${filters.rating}`);

export const fetchProductDetails = (id: string) => API.get(`/products/${id}`);

export const getProductsBySearch = (searchQuery: string) => API.get(`/products/search?searchQuery=${searchQuery}`);

export const fetchProductsByCategory = (category: string) => API.get(`/products/category?category=${category}`);

export const signIn = (formFields:FormFields) => API.post("/users/signin", formFields);

export const signOut = () => API.post("/users/signout");

export const signUp = (formFields:FormFields) => API.post("/users/signup", formFields);

export const getProfile = () => API.get("/users/profile");
