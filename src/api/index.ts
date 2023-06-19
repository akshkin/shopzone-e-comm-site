import axios from "axios";
import { ProductType } from "../constants.types";

// const API = axios.create({ baseURL: "https://shopzone-server.onrender.com" });
const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = JSON.parse(localStorage.getItem("user") || "");
  }

  return req;
});

type FormFields = {
  name?: string;
  email: string;
  password: string;
};
// sort : {
//   rating?: string | undefined;
//   price?: string | undefined
// };

export type FiltersType = {
  sort: string | undefined;
  category: string[] | null;
  price?: number;
  rating?: number;
};

// export const fetchProducts = (filters: FiltersType) =>
//   API.get(
//     `/products?sort=${
//       filters.sort.rating || filters.sort.price
//     }&category=${filters.category.toString()}&price=${filters.price}&rating=${
//       filters.rating
//     }`
//   );
export const fetchProducts = (filters: FiltersType) =>
  API.get(
    `/products?sort=${
      filters.sort
    }&category=${filters.category?.toString()}&price=${filters.price}&rating=${
      filters.rating
    }`
  );

export const fetchProductDetails = (id: string) => API.get(`/products/${id}`);

export const fetchProductsBySearch = (searchQuery: string) =>
  API.get(`/products/search?searchQuery=${searchQuery}`);

export const fetchProductsByCategory = (category: string) =>
  API.get(`/products/category?category=${category}`);

export const signIn = (formFields: FormFields) =>
  API.post("/users/signin", formFields);

export const signOut = () => API.post("/users/signout");

export const signUp = (formFields: FormFields) =>
  API.post("/users/signup", formFields);

export const getProfile = () => API.get("/users/profile");

export const addToCart = ({ cartItem }: { cartItem: ProductType }) =>
  API.post("/cart/add", { cartItem });

export const removeFromCart = ({ id }: { id: string }) =>
  API.post("/cart/remove", { id });

export const clearCart = () => API.post("/cart/clear");

export const clearCartItem = ({ id }: { id: string }) =>
  API.post("/cart/clearItem", { id });

export const getCart = () => API.get("/cart/get");
