import { ERROR_ACTION_TYPES } from "./error.types";

export const errorReducer = (state = { error: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case ERROR_ACTION_TYPES.SET_ERROR:
      return { ...state.error, message: payload };
    case ERROR_ACTION_TYPES.REMOVE_ERROR:
      return {
        ...state.error,
        message: { message: "" },
      };
    default:
      return state;
  }
};
