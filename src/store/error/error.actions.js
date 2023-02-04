import { ERROR_ACTION_TYPES } from "./error.types";
import { nanoid } from "nanoid";

export const setError = (message) => (dispatch) => {
  const id = nanoid();
  dispatch({
    type: ERROR_ACTION_TYPES.SET_ERROR,
    payload: { message, id },
  });

  setTimeout(() => {
    dispatch({
      type: ERROR_ACTION_TYPES.REMOVE_ERROR,
      payload: id,
    });
  }, 5000);
};
