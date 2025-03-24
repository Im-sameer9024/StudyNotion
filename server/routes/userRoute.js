import express from "express";
import { LogIn, sendOtp, SignUp, changePassword } from "../controllers/Auth.js";
import {
  resetPasswordToken,
  resetPassword,
} from "../controllers/ResetPassword.js";
import {auth} from "../middlewares/auth.js";

const router = express.Router();



//Routes for Login , Signup,  and Authentication

//************************************************/
//          Authentication Routes
//************************************************/

router.post("/login", LogIn);

router.post("/signup", SignUp);

router.post("/sendOtp", sendOtp);

router.post("/changePassword",auth,changePassword);



//************************************************/
//          resetPassword Routes
//************************************************/


// route for generating a reset password token 
router.post("/reset-password-token", resetPasswordToken);

// route for resetting the user's password after verifying the token
router.post("/reset-password", resetPassword);

export default router;
