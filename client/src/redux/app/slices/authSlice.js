import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "../../../services/operations/authAPI";
import { sendOtp } from "../../../services/operations/authAPI";

const initialState = {
  error:null,
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
    .addCase(sendOtp.pending,(state) =>{
      state.loading = true;
      state.error = null;
    })
    .addCase(sendOtp.fulfilled,(state)=>{
      state.loading = false;
    })
    .addCase(sendOtp.rejected,(state,action) =>{
      state.loading = false;
      state.error = action.payload;
    })

    //-----------------------handle the signup action
    .addCase(signUp.pending,(state)=>{
      state.loading = true;
      state.error = null
    })
    .addCase(signUp.fulfilled,(state) =>{
      state.loading = false;
      state.error = null
    })
    .addCase(signUp.rejected,(state,action) =>{
      state.loading = false;
      state.error = action.payload;
    })
   

  },
});

export const { setToken, setSignupData, setLoading } = authSlice.actions;

export default authSlice.reducer;
