import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {},
});

export default authSlice.reducer;
