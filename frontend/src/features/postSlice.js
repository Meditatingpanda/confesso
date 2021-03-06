import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../helpers/baseUrl";
const state = {
  isLoading: false,
  ownPost: [],
  error: "",
};

export const fetchPosts = createAsyncThunk(
  "ownPost/fetchPosts",
  async (user) => {
    const res = await axios.get(`${api}/posts/`, {
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
      state.ownPost = action.payload.sort(
        (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
      );
      state.error = "";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default postSlice.reducer;
