import { createSlice } from "@reduxjs/toolkit";
import { getPasswordResetToken, logIn, resetPassword, signUp } from "../../../services/operations/authAPI";
import { sendOtp } from "../../../services/operations/authAPI";

const initialState = {
  error: null,
  signupData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    //-----------------------handle the sendOtp action
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //-----------------------handle the signup action
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.signupData = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //-----------------------handle the Login action

      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token; // Update token on success
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //-----------------------handle the getPasswordResetToken action

      .addCase(getPasswordResetToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPasswordResetToken.fulfilled, (state) => {
        state.loading = false;
      })

      //-----------------------handle the getPasswordResetToken action

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setToken, setSignupData, setLoading } = authSlice.actions;

export default authSlice.reducer;
