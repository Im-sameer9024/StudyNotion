import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import profileReducer from "./slices/profileSlice"
import cartReducer from "./slices/cartSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable if you have non-serializable values
    }),
});