import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import productsSlice from "./features/productsSlice";
import favoritesSlice from "./features/favoritesSlice";
import cartSlice from "./features/cartSlice";
import userSlice from "./features/userSlice";

const reducers = combineReducers({
  allProducts: productsSlice,
  favorites: favoritesSlice,
  cartItems: cartSlice,
  user: userSlice,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: [ "favorites", "user", "cartItems"]
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
