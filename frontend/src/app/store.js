import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/profileSlice";
import postReducer from "../features/postSlice";
import timeLineReducer from "../features/timelineSlice";
import authReducer from '../features/authSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    timeLine: timeLineReducer,
    auth:authReducer
  },
});
