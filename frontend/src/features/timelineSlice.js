import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const state = {
  isLoading: false,
  posts: [],
  error: "",
};

export const fetchTimelinePosts = createAsyncThunk(
  "timeline/fetchPosts",
  async (user) => {
    const res = await axios.get("/posts/timeline/all", {
        params:{
          userId:user
        }
    });

    return res.data;
  }
);

const timelineSlice = createSlice({
  name: "timeline",
  initialState: state,
  extraReducers: (builder) => {
    builder.addCase(fetchTimelinePosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTimelinePosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchTimelinePosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default timelineSlice.reducer;
