import axios from "axios";
import { ProductType } from "../constants.types";
import { CartItemType } from "../features/cartSlice";

const API = axios.create({ baseURL: "https://shopzone-server.onrender.com" });
// const API = axios.create({ baseURL: "http://localhost:8000" });

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

export type FiltersType = {
  sort: string | undefined;
  category: string[] | null;
  price?: number;
  rating?: number;
};

export type OrderData = {
  orderItems: CartItemType[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: number;
  paymentMethod: string;
};

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

export const addToFavorites = ({ item }: { item: ProductType }) =>
  API.post("/favorites/add", { item });

export const getFavorites = () => API.get("/favorites/get");

export const createOrder = (data: OrderData) => API.post("/order/create", data);

export const createOrderUnlogged = (data: OrderData) =>
  API.post("/order/create-unlogged", data);

export const getCLientId = () => API.get("/api/config/paypal");

export const getOrderDetails = (id: string) => API.get(`/order/${id}`);

export const getOrderDetailsUnlogged = (id: string) =>
  API.get(`/order-unlogged/${id}`);

export const updateOrder = ({ id, details }: any) =>
  API.put(`/order/${id}/pay`, details);

export const saveAddress = (
  shippingAddress: Pick<OrderData, "shippingAddress">
) => API.patch("/users/save/address", shippingAddress);

export const getAdress = () => API.get("/users/save/address");
