import Course from "../models/Course.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";

//create course
const createCourse = async (req, res) => {
  try {
    // fetch data
    const { courseName, courseDescription, whatYouWillLearn, category, price } =
      req.body;

    //   get thumbnail
    const thumbnail = req.files.thumbnailImage;

    // validation for empty fields
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !category ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //check for instructor to store instructor id
    const userId = req.user.id;

    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    //check given tag is valid or not

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    //upload image to cloudinary
    const thumbnailUrl = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create course entry in db

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      category: categoryDetails._id,
      thumbnail: thumbnailUrl.secure_url,
      price,
      instructor: instructorDetails._id,
    });

    //add the new course user schema of instructor

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //update the tag schema
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      { course: newCourse._id },
      { new: true }
    );

    //return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log("error in createCourse controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//getAll courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        whatYouWillLearn: true,
        thumbnail: true,
        price: true,
        instructor: true,
      }
    )
      .populate("instructor")
      .populate("category")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//getCourseDetails

const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    //find course details
    const courseDetails = await Course.findById({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createCourse, getAllCourses, getCourseDetails };
