import express from "express";

const router = express.Router();

//Course controllers --------------
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
} from "../controllers/CourseController.js";

//Categories controllers -----------------
import {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} from "../controllers/CategoryController.js";

//Section controllers -----------------
import {
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/SectionController.js";

// SubSection controllers -----------------
import {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} from "../controllers/SubSectionController.js";

//Rating controllers -----------------
import {
  createRating,
  getAverageRating,
  getAllRating,
} from "../controllers/RatingControllers.js";

//Import middlewares
import { auth, isAdmin, isInstructor, isStudent } from "../middlewares/auth.js";

//******************************************************/
//                     Course routes
//******************************************************/

//Course can only be create by Instructor

//-----create Course
router.post("/createCourse", auth, isInstructor, createCourse);

//-----add section in course
router.post("/addSection", auth, isInstructor, createSection);

//------update a section in course
router.post("/updateSection", auth, isInstructor, updateSection);

//------delete a section in course
router.post("/deleteSection", auth, isInstructor, deleteSection);

//---------------------- Sub-section ---------------------

//----- Edit a Sub section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

//----- Delete a Sub section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

//----- Create a Sub section
router.post("/addSubSection", auth, isInstructor, createSubSection);

//------get all courses
router.get("/allCourses", getAllCourses);

//------get course details for a particular course
router.get("/courseDetails", getCourseDetails);

//******************************************************/
//                     Category routes (Only by Admin)
//******************************************************/

//category can Only be created by Admin
//Put isAdmin middleware here

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/allCategories", auth, isAdmin, showAllCategories);
router.get("/categoryDetails", auth, isAdmin, categoryPageDetails);

//******************************************************/
//                     Rating and Review routes
//******************************************************/

router.post("/createRating", auth, isStudent, createRating);
router.get("/averageRating", auth, isStudent, getAverageRating);
router.get("/allRating", auth, isStudent, getAllRating);

export default router;
