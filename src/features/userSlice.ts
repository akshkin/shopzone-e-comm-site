import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signOut, signUp } from "../api";
import { RootState } from "../store";

const initialState: User = {
  loading: false,
  token: "",
  error: "" || undefined,
};

type User = {
  loading: boolean;
  token: string;
  error: string | undefined;
};

type FormFields = {
  name?: string;
  email: string;
  password: string;
};

export const signInUser = createAsyncThunk(
  "user/signIn",
  async (formFields: FormFields) => {
    try {
      const { data } = await signIn(formFields);
      return data.token;
    } catch (error: any) {
      return error.response.data.error;
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (formFields: FormFields) => {
    try {
      const { data } = await signUp(formFields);
      return data.token;
    } catch (error: any) {
      return error.response.data.error;
    }
  }
);

export const signOutUser = createAsyncThunk("user/signOut", async () => {
  try {
    await signOut();
  } catch (error: any) {
    console.log(error);
    Promise.reject(error);
    return error.response.data;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        if (action.payload?.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = "";
        state.token = action.payload;
        localStorage.setItem("user", JSON.stringify(state.token));
      })
      .addCase(signUpUser.pending, (state) => {
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
        localStorage.setItem("user", JSON.stringify(state.token));
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.removeItem("user");
        state.error = "";
        state.token = "";
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Could not sign out";
      });
  },
});

export const getUser = (state: RootState) => state.user.token;
export const userLoading = (state: RootState) => state.user.loading;
export const errorMessage = (state: RootState) => state.user.error;

export default userSlice.reducer;
