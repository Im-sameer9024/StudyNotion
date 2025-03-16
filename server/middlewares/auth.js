import JWT from "jsonwebtoken";
import "dotenv/config.js";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookie.token || req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token is not found",
      });
    }

    try {
      const decode = JWT.verify(token, process.env.JWT_SECRET);

      console.log("decoded token is here in auth middleware", decode);

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Network error",
    });
  }
};

const isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This route is for Protected for Student",
      });
    }

    next()
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Network error"
    })
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This route is for Protected for Admin",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Network error",
    });
  }
};


const isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This route is for Protected for Instructor",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Network error",
    });
  }
};

export { auth, isStudent,isAdmin,isInstructor };
