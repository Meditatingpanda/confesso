import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/profileSlice";
import postReducer from "../features/postSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});
