import User from "../models/User.js";
import Profile from "../models/Profile.js";

export const updateProfile = async (req, res) => {
  try {
    //get data
    const { gender, dob, about, contactNumber } = req.body;

    const id = req.user.id;

    //validation
    if (!gender || !dob || !about || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // create profile

    const profile = await Profile.create({
      gender: gender,
      dob: dob,
      about: about,
      contactNumber: contactNumber,
    });

    //update profile in User schema
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        additionalDetails: profile._id,
      },
      { new: true }
    )
      .populate("additionalDetails")
      .exec();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("error in updateProfile controller", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // delete Profile

    await Profile.findOneAndDelete({ _id: userDetails.additionalDetails });

    // delete profile from User schema
    await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.log("error in deleteProfile controller",error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
};


export const getAllUserDetails = async (req, res) => {
    try {
      const id = req.user.id;
      const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec();
      console.log(userDetails);
      res.status(200).json({
        success: true,
        message: "User Data fetched successfully",
        data: userDetails,
      });
    } catch (error) {
      console.log("error in getAllUserDetails controller", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    
}