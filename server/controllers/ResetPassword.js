import User from "../models/User.js";
import mailSender from "../utils/mailSender.js";
import bcrypt from "bcrypt";

const resetPasswordToken = async (req, res) => {
  try {
    //-------------------fetch data
    const { email } = req.body;

    //-----------------validate data
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Fill Info carefully",
      });
    }

    //-----------------check user
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    //-----------------generate token
    const token = crypto.randomUUID();

    //------------------save token is User model and update the model

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );

    //------------------create url
    const url = `http://localhost:5173/update-password/${token}`;

    //------------------send email

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("error occur in resetPasswordToken", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    //----------------------fetch data
    const { token, password, confirmPassword } = req.body;

    //----------------------validate data
    if (!token || !password || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Fill Info carefully",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }

    //----------------------find user

    const user = await User.findOne({ token: token });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    //----------------------check token expire or not

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    //----------------------hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //----------------------update password

    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    })

  } catch (error) {

    console.log("error occur in resetPassword",error)

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })

  }
};


export {resetPassword,resetPasswordToken}
