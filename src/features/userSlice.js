import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { signIn, signUp, signOut } from "../api";

const initialState = {
  loading: false,
  token: "",
  error: "",
};

export const signInUser = createAsyncThunk(
  "user/signIn",
  async (formFields) => {
    try {
      const { data } = await signIn(formFields);
      return data.token;
    } catch (error) {
      return error.response.data.error;
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (formFields) => {
    try {
      const { data } = await signUp(formFields);
      return data.token;
    } catch (error) {
      return error.response.data.error;
    }
  }
);

export const signOutUser = createAsyncThunk("user/signOut", async () => {
  try {
    await signOut;
  } catch (error) {
    return error.response.data.errors[0];
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signInUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = "";
        state.token = action.payload;
      })
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = "";
        state.token = action.payload;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = "";
        state.token = "";
      });
  },
});

export const getUser = (state) => state.user.token;
export const userLoading = (state) => state.user.loading;
export const errorMessage = (state) => state.user.error;

export default userSlice.reducer;
