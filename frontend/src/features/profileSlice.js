import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const state = {
  isLoading: false,
  user: [],
  error: "",
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (user) => {
  const res = await axios.get(`/users/`, {
    params: {
      username: user,
    },
  });
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: state,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.user = null;
    });
  },
});

export default userSlice.reducer;
