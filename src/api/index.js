import axios from "axios";

const API = axios.create({ baseURL: "https://shopzone-server.onrender.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = JSON.parse(localStorage.getItem("user"));
  }
  return req;
});

export const fetchProducts = () => API.get("/products");

export const fetchProductDetails = (id) => API.get(`/products/${id}`);

export const signIn = (formFields) => API.post("/users/signin", formFields);

export const signOut = () => API.post("/users/signout");

export const signUp = (formFields) => API.post("/users/signup", formFields);

export const getProfile = () => API.get("/users/profile");
