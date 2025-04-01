import React, { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import loginImage from "../../../assets/Images/login.webp";
import frameImage from "../../../assets/Images/frame.png";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      accountType: "Student",
      email: "",
      password: "",
    },
  });

  const accountType = watch("accountType");

  const handleaccountTypeChange = (selectedaccountType) => {
    if (isSubmitting) return; // Prevent changes during submission
    setValue("accountType", selectedaccountType, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    console.log("Form data is here ", data);
    // Here you would typically make an API call
    // try {
    //   const response = await loginUser(data);
    //   // handle successful login
    // } catch (error) {
    //   // handle error
    // }
    reset();
  };

  return (
    <div className="w-full text-white h-[100vh] overflow-hidden font-inter">
      <div className="w-11/12 flex justify-between items-center mx-auto h-full">
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

            {/*--- Password ----- */}
            <div className=" relative">
              <Label htmlFor="password" className="text-richblack-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
              <p className=" flex items-center text-blue-200 hover:underline text-[0.7rem] mt-1 justify-end font-semibold">
                <Link to="/forgot-password">Forgot Password</Link>
              </p>
              {errors.password && (
                <span className="text-red-400 text-[0.6rem] mt-1 absolute bottom-0 left-0 ">
                  <sup>*</sup>
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full bg-yellow-200 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-300 hover:scale-97 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Login"}
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

export default Login;
