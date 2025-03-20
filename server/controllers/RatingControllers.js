import mongoose from "mongoose";
import Course from "../models/Course";
import RatingAndReview from "../models/RatingAndReview";

//create rating and review
const createRating = async (req, res) => {
  try {
    // get userId
    const userId = req.user.id;
    // fetch data
    const { rating, review, courseId } = req.body;

    // check if user is enrolled or not
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: mongoose.Types.ObjectId(userId),
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    //check user is already reviewed the course

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    //create Rating and Review
    const ratingAndReview = await RatingAndReview.create({
      user: userId,
      rating,
      review,
      course: courseId,
    });

    //update ratingAndReview in Course

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReview: ratingAndReview._id,
        },
      },
      { new: true, runValidators: true }
    );
    //runValidators:true is used to adhere the validation rules of schema which is defined in RatingAndReviewSchema like required, min and max value etc .

    console.log("updatedCourse", updatedCourse);

    return res.status(200).json({
      success: true,
      message: "Rating and Review created successfully",
      data: ratingAndReview,
    });
  } catch (error) {
    console.log("error in createRating controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//average rating and review
const getAverageRating = async (req, res) => {
  try {
    //get courseId
    const courseId = req.body.courseId;

    //get average rating
    const averageRating = await RatingAndReview.aggregate[
      {
        $match: {
          course: mongoose.Types.ObjectId(courseId),
        },
        $group: {
          _id: null, //null means group all the data
          averageRating: { $avg: "$rating" },
        },
      }
    ];

    if (averageRating.length > 0) {
      return res.status(200).json({
        success: true,
        message: "No rating found",
        averageRating: averageRating[0].averageRating,
      });
    }

    // if no rating found
    return res.status(200).json({
      success: true,
      message: "No rating found",
      averageRating: 0,
    });
  } catch (error) {
    console.log("error in getAverageRating controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get all rating review by course
const getAllRating = async (req, res) => {
  try {
    const allRatingAndReviews = await RatingAndReview.find({
      rating: true,
      review: true,
    })
      .sort({ rating: -1 })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All rating and review",
      data: allRatingAndReviews,
    })


  } catch (error) {
    console.log("error in getAllRating controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { createRating, getAverageRating,getAllRating };
