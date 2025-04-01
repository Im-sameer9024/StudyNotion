

const BASE_URL = import.meta.env.VITE_BASE_URL;

//================================ AUTH ENDPOINTS==============================
export const authEndPoints = {
  SENDOTP_API: BASE_URL + "/user/sendOtp",
  SIGNUP_API: BASE_URL + "/user/signup",
  LOGIN_API: BASE_URL + "/user/login",
  RESETPASSWORDTOKEN_API: BASE_URL + "/user/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/user/reset-password",
}; 


export const categories = {
  CATEGORIES_API: BASE_URL + "/course/allCategories",
};

