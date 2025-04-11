import React, { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import loginImage from "../../../assets/Images/login.webp";
import frameImage from "../../../assets/Images/frame.png";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../redux/app/slices/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      accountType: "Student",
      password: "",
      confirmPassword: "",
    },
  });

  const accountType = watch("accountType");
  const password = watch("password");

  const handleaccountTypeChange = (selectedaccountType) => {
    setValue("accountType", selectedaccountType);
  };

  const onSubmit = async (data) => {
    console.log("Form data is here ", data);

    try {
      //------------used to save the signup data in redux store-----------------
      dispatch(setSignupData(data));

      //------------used to send the otp on user email-----------------
      await dispatch(sendOtp({ email: data.email, navigate })).unwrap();
    } catch (error) {
      console.log("Signup failed", error);
    }
  };

  return (
    <div className="w-full text-white h-[100vh] overflow-hidden font-inter ">
      <div className="w-10/12 flex justify-between items-center mx-auto h-full">
        {/*--------------------- form section-----------------------  */}
        <div className="w-4/12 flex flex-col gap-4">
          <div className="leading-6">
            <h3 className="font-semibold text-[1.6rem]">Welcome Back</h3>
            <i className="text-[0.8rem] text-richblack-300">
              Discover your passions,{" "}
              <span className="text-blue-200">Be Unstoppable</span>
            </i>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Toggle Container */}
            <div className="relative flex items-center bg-richblack-800 rounded-full p-1 w-fit shadow-sm shadow-richblack-400">
              {/* Student Option */}
              <button
                type="button"
                onClick={() => handleaccountTypeChange("Student")}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  accountType === "Student"
                    ? "bg-richblack-900 text-white shadow-md"
                    : "text-richblack-200 hover:bg-richblack-700"
                } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                Student
              </button>

              {/* Instructor Option */}
              <button
                type="button"
                onClick={() => handleaccountTypeChange("Instructor")}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  accountType === "Instructor"
                    ? "bg-richblack-900 text-white shadow-md"
                    : "text-richblack-200 hover:bg-richblack-700"
                } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                Instructor
              </button>
            </div>

            {/* Name  */}
            <div className="flex justify-between w-full gap-4">
              {/* firstName  */}
              <div className="w-full">
                <Label htmlFor="firstName" className="text-richblack-300">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* lastName  */}
              <div className="w-full">
                <Label htmlFor="lastName" className="text-richblack-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email address  */}
            <div>
              <Label htmlFor="email" className="text-richblack-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-[0.6rem] mt-1">
                  <sup>*</sup>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* contactNumber  */}
            <div>
              <Label htmlFor="contactNumber" className="text-richblack-300">
                Phone Number
              </Label>
              <Input
                id="contactNumber"
                type="tel"
                {...register("contactNumber", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Only numbers are allowed",
                  },
                })}
              />
              {errors.contactNumber && (
                <p className="text-red-400 text-[0.6rem] mt-1">
                  <sup>*</sup>
                  {errors.contactNumber.message}
                </p>
              )}
            </div>

            {/* Password fields */}
            <div className="flex justify-between w-full gap-4">
              {/* create password  */}
              <div className="w-full">
                <Label htmlFor="password" className="text-richblack-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      validate: {
                        hasUpperCase: (value) =>
                          /[A-Z]/.test(value) ||
                          "At least one uppercase letter",
                        hasLowerCase: (value) =>
                          /[a-z]/.test(value) ||
                          "At least one lowercase letter",
                        hasNumber: (value) =>
                          /[0-9]/.test(value) || "At least one number",
                        hasSpecialChar: (value) =>
                          /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                          "At least one special character",
                      },
                    })}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* confirm password  */}
              <div className="w-full">
                <Label htmlFor="confirmPassword" className="text-richblack-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-[0.6rem] mt-1">
                    <sup>*</sup>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full bg-yellow-200 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-300 hover:scale-97 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Create Account"}
            </button>
          </form>
        </div>

        {/*--------------------- image section---------------------------  */}
        <div className="relative w-6/12 flex justify-center items-center">
          {/* login img  */}
          <img
            src={loginImage}
            alt="loginImage"
            className="absolute top-1/2 -translate-y-1/2 z-10 h-[400px]"
          />

          {/* frame img  */}
          <img
            src={frameImage}
            alt="frameImage"
            className="scale-150 h-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
