import Section from "../models/Section.js";
import Course from "../models/Course.js";

const createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;

    // data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //create section
    const newSection = await Section.create({
      sectionName,
    });

    //update course with section

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log("error in create section controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//update section
const updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, sectionId } = req.body;

    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName: sectionName,
      },
      { new: true }
    ).exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("error in update section controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete section

const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    //delete section
    await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.log("error in delete section controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createSection, updateSection, deleteSection };
