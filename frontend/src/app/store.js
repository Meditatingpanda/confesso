import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/profileSlice'
export const store = configureStore({
  reducer: {
    user:userReducer
  },
})