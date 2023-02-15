import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const product = action.payload;

      if (!state.favorites.includes(product)) {
        state.favorites.push(product);
      }
    },
    removeFromFavorites(state, action) {
      const id = action.payload;
      const inFavorites = state.favorites.find(
        (favorite) => favorite._id === id
      );
      if (inFavorites) {
        return {
          ...state,
          favorites: state.favorites.filter((favorite) => favorite._id !== id),
        };
      }
    },
  },
});

export const selectFavorites = (state) => state.favorites.favorites;

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
