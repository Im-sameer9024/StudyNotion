import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { BiArrowBack } from "react-icons/bi";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const token = useLocation().pathname.split("/").at(-1);

  const onSubmit = async (data) => {
    let allData = { ...data, token };

    await dispatch(resetPassword({ allData: allData })).unwrap();
    reset();
  };

  return (
    <div className="grid min-h-[calc(100vh-4.2rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8 ">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and youre all set.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" text-white space-y-6"
          >
            {/*---------------- New password field ------------- */}
            <div className="w-full space-y-1 ">
              <Label htmlFor="password" className="text-richblack-300">
                New password <sup className="text-red-300">*</sup>
              </Label>
              <div className=" relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: {
                      hasUpperCase: (value) =>
                        /[A-Z]/.test(value) || "At least one uppercase letter",
                      hasLowerCase: (value) =>
                        /[a-z]/.test(value) || "At least one lowercase letter",
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
                  className=" absolute  top-1/2 right-2 -translate-y-1/2 text-richblack-400 cursor-pointer"
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

            {/*---------------- confirm new password field ------------- */}
            <div className="w-full space-y-1 ">
              <Label htmlFor="confirmPassword" className="text-richblack-300">
                Confirm New password <sup className="text-red-300">*</sup>
              </Label>
              <div className=" relative">
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
                  className=" absolute  top-1/2 right-2 -translate-y-1/2 text-richblack-400 cursor-pointer"
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-400 text-[0.6rem] mt-1">
                  <sup>*</sup>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full bg-yellow-200 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-300 hover:scale-97 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "ResetPassword"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
