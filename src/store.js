import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import favoritesSlice from "./features/favoritesSlice";
import productsSlice from "./features/productsSlice";
import userSlice from "./features/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const reducers = combineReducers({
  allProducts: productsSlice,
  favorites: favoritesSlice,
  cartItems: cartSlice,
  user: userSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelis: ["favorites", "cartItems", "user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
