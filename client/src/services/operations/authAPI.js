import toast from "react-hot-toast";
import { authEndPoints } from "../api";
import { apiConnector } from "../apiConnector";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setToken } from "../../redux/app/slices/authSlice";
import { setUser } from "../../redux/app/slices/profileSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSWORDTOKEN_API,
  RESETPASSWORD_API,
} = authEndPoints;

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ email, navigate }) => {
    const toastId = toast.loading("Sending OTP...");
    try {
      const response = await apiConnector("POST", SENDOTP_API, { email });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP sent successfully");
      navigate("/verify-email");
      return response.data;
    } catch (error) {
      console.error("OTP Error:", error);
      toast.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ signupData, navigate }) => {
    const toastId = toast.loading("Registering...");
    try {
      // Send formData directly instead of wrapping in { data }
      const response = await apiConnector("POST", SIGNUP_API, signupData);

      if (!response.data.success) {
        toast.error(response.data.message);
      }

      toast.success("Registration successful!");
      navigate("/login");
      return response.data;
    } catch (error) {
      console.error("Signup Error:", error);
      return toast.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ loginData, navigate }, { dispatch }) => {
    const toastId = toast.loading("Logging In...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, loginData);

      console.log("Full API Response:", response); // Debug full response

      if (!response.data?.success) {
        // Properly reject with value
        return toast.error(response.data?.message || "Login failed");
      }
      console.log(response.data.data.token);

      // Verify token exists before storing
      if (!response.data?.data?.token) {
        return toast.error("Token not found in response");
      }

      const { token } = response.data.data;

      // Dispatch and store token
      dispatch(setToken(token));
      localStorage.setItem("token", JSON.stringify(token));

      toast.success("Login successful!");
      navigate("/dashboard/my-profile");

      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }
);

export const logOut = async ({ navigate, dispatch }) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  // dispatch(resetCart())
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  toast.success("Logout successful!");
  navigate("/");
};

export const getPasswordResetToken = createAsyncThunk(
  "/auth/resetPasswordToken",
  async ({ email, setEmailSent }, { dispatch }) => {
    const toastId = toast.loading("Sending reset password link...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        RESETPASSWORDTOKEN_API,
        email
      );

      console.log("response is resetPasswordToken", response);

      if (!response.data?.success) {
        return toast.error(response.data.message);
      }

      toast.success("Reset Email sent successfully");
      setEmailSent(true);
    } catch (error) {
      console.log("error in resetPasswordToken", error);
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/auth/resetPassword",
  async ({ allData }, { dispatch }) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, allData);

      console.log("response of resetPassword", response);

      if (!response.data.success) {
        return toast.error(response.data.message);
      }

      toast.success("Password reset successfully");
      return response.data;
    } catch (error) {
      console.log("error occur in resetPassword function", error);
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }
);
