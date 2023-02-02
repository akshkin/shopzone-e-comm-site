import { FAVORITES_ACTION_TYPES } from "./favorites.types";

export const favoritesReducer = (state = { favorites: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case FAVORITES_ACTION_TYPES.ADD_TO_FAVORITES:
      const product = payload;
      if (!state.favorites.includes(product._id)) {
        return { ...state, favorites: [...state.favorites, product] };
      }
      break;

    case FAVORITES_ACTION_TYPES.REMOVE_FROM_FAVORITES:
      const id = payload;
      const inFavorites = state.favorites.find(
        (favorite) => favorite._id === id
      );
      if (inFavorites) {
        return {
          ...state,
          favorites: state.favorites.filter((favorite) => favorite._id !== id),
        };
      }
      break;

    default:
      return state;
  }
};
