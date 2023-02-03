import { USER_ACTION_TYPES } from "./user.types";

export const userReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_ACTION_TYPES.USER_SIGNIN_SUCCESS:
      return { loading: false, user: payload };
    case USER_ACTION_TYPES.USER_SIGNIN_FAIL:
      return { loading: false, user: {} };
    case USER_ACTION_TYPES.USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
