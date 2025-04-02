import Otp from "../models/Otp.js";
import User from "../models/User.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

//-----------------------------Send Otp -------------------------
const sendOtp = async (req, res) => {
  try {
    //--------------fetch data
    const { email } = req.body;

    //---------------validate data
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Email is Required",
      });
    }

    //---------------check user
    const user = User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not Registered",
      });
    }

    //----------------generate Otp
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp is here ", otp);

    //----------------save otp in DB
    const otpBody = Otp.create({
      email: email,
      otp: otp,
    });

    //-----------------return response
    return res.status(200).json({
      success: true,
      message: "Otp Generate Successfully",
      data: otpBody,
    });
  } catch (error) {
    console.log("error occur in  sendOtp controller", error);
    return res.status(500).json({
      success: false,
      message: "Network error",
    });
  }
};

//-----------------------------Sign Up User ----------------------
const SignUp = async (req, res) => {
  try {
    //--------------fetch data
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    //--------------validate data
    // if (
    //   !firstName ||
    //   !lastName ||
    //   !email ||
    //   !password ||
    //   !confirmPassword 
    // ) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Please Fill info carefully.",
    //   });
    // }

    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Password and ConfirmPassword does't match",
      });
    }

    //--------------check User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User Already Exists",
      });
    }

    //------------------find most recent Otp
    const recentOtp = await Otp.findOne({ email })
      .sort({
        createAt: -1,
      })
      .limit(1);

    if (recentOtp.otp.length == 0) {
      return res.status(401).json({
        success: false,
        message: "Otp is not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(403).json({
        success: false,
        message: "Otp is not match",
      });
    }

    //--------------hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //--------------create User Avatar
    const avatarUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`;

    //---------------Create Entry in DB
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNumber,
      accountType,
      image: avatarUrl,
    });

    //---------------return response
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    console.log("error occur in SignUp controller", error);

    return res.status(500).json({
      success: false,
      message: "Network error",
    });
  }
};
//-----------------------------Login User ------------------------

const LogIn = async (req, res) => {
  try {
    //---------------fetch data
    const { email, password } = req.body;

    //----------------validate data
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Fill Info carefully",
      });
    }

    //-------------------check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not Registered",
      });
    }

    //-------------------generate JWt token and return cookie

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        accountType: user.accountType,
        email: user.email,
      };

      let token = JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User Logged In successfully",
        data: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log("error occur in Login controller", error);

    return res.status(500).json({
      success: false,
      message: "Network error",
    });
  }
};

// Controller for Changing Password
const changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};

export { sendOtp, SignUp, LogIn, changePassword };
