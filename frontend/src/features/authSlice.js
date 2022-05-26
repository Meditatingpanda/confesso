import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  success: false,
};

export const loginStart = createAsyncThunk(
  "auth/loginStart",
  async (credential) => {
    const res = await axios.post("/auth/login", {
      email: credential.email,
      password: credential.password,
    });
    return res.data;
  }
);
export const registerStart = createAsyncThunk(
  "auth/registerStart",
  async (credential) => {
    const res = await axios.post("/auth/register", {
      username: credential.username,
      email: credential.email,
      password: credential.password,
    });
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    //cases for login event
    builder.addCase(loginStart.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loginStart.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
    });
    builder.addCase(loginStart.rejected, (state, action) => {
      state.error = action.error.message;
      state.isFetching = false;
    });

    //cases for register event
    builder.addCase(registerStart.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(registerStart.fulfilled, (state) => {
      state.success = true;
      state.isFetching = false;
    });
    builder.addCase(registerStart.rejected, (state, action) => {
      console.log(action);
      state.error = action.error.message;
      state.isFetching = false;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
