import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const state = {
  isLoading: false,
  ownPost: [],
  error: "",
};

export const fetchPosts = createAsyncThunk(
  "ownPost/fetchPosts",
  async (user) => {
    const res = await axios.get(`/posts/`, {
      params: {
        username: user,
      },
    });
    return res.data;
  }
);

const postSlice = createSlice({
  name: "ownPost",
  initialState: state,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ownPost = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default postSlice.reducer;
