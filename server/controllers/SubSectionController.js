import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import uploadImageToCloudinary from "../utils/imageUploader.js";
import "dotenv/config.js";

//create SubSection

const createSubSection = async (req, res) => {
  try {
    // data fetch
    const { title, description, sectionId } = req.body;

    const video = req.files.videoFile;

    // validation
    if (!title || !description || !sectionId || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //create subSection
    const subSection = await SubSection.create({
      title: title,
      timeDuration: uploadDetails.duration,
      description: description,
      video: uploadDetails.secure_url,
    });

    //update section with this subSection ObjectId

    await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSections: subSection._id },
      },
      { new: true }
    )
      .populate("subSections")
      .exec();

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: subSection,
    });
  } catch (error) {
    console.log("error in createSubSection", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//update SubSection
const updateSubSection = async (req, res) => {
  try {
    const { title, timeDuration, description, subSectionId } = req.body;

    const video = req.files.videoFile;

    // validation
    if (!title || !timeDuration || !description || !subSectionId || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //update subSection
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        title: title,
        timeDuration: uploadDetails.duration,
        description: description,
        video: uploadDetails.secure_url,
      },
      { new: true }
    ).exec();

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedSubSection,
    });
  } catch (error) {
    console.log("error occur in updateSubSection controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//delete SubSection

const deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSections: subSectionId,
        },
      },
      { new: true }
    );

    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: subSection,
    });
  } catch (error) {
    console.log("error occur in deleteSubSection controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createSubSection, updateSubSection, deleteSubSection };
