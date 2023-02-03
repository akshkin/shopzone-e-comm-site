import { signIn, signUp, signOut } from "../../api";
import { USER_ACTION_TYPES } from "./user.types";

export const signInUser = (formFields) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ACTION_TYPES.USER_SIGNIN_REQUEST,
    });
    const { data } = await signIn(formFields);
    dispatch({
      type: USER_ACTION_TYPES.USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_ACTION_TYPES.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const signUpUser = (formFields) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ACTION_TYPES.USER_SIGNIN_REQUEST,
    });
    const { data } = await signUp(formFields);
    dispatch({
      type: USER_ACTION_TYPES.USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_ACTION_TYPES.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signOutUser = () => async (dispatch, getState) => {
  try {
    await signOut();
    dispatch({
      type: USER_ACTION_TYPES.USER_SIGNOUT,
    });

    localStorage.removeItem("user");
  } catch (error) {
    dispatch({
      type: USER_ACTION_TYPES.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
