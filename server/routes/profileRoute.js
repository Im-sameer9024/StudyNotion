import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  updateProfile,
  deleteProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} from "./../controllers/ProfileController.js";

const router = express.Router();


// ************************************************************
//                                      Profile routes
//*************************************************************
// Delete User Account
router.delete("/deleteProfile", auth, deleteProfile);
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

export default router;
