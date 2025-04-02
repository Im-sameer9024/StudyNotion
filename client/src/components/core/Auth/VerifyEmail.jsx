import React, { useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../services/operations/authAPI";

const VerifyEmail = () => {
  const { signupData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [navigate, signupData]);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  const onSubmit = async (data) => {
    console.log("OTP submitted ", data.otp);
    const signupDataWithOtp = {
      ...signupData,
      otp: otpValue,
    };

    console.log("signupData", signupData);

    await dispatch(
      signUp({ signupData: signupDataWithOtp, navigate })
    ).unwrap();
  };

  return (
    <div className="w-full min-h-[90vh] flex justify-center items-center text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="font-semibold text-[1.6rem]">Verify email</h3>
        <p className="text-[0.8rem] text-richblack-300">
          A verification code has been sent to you. Enter the code below
        </p>

        <div className="space-y-2 flex flex-col justify-center items-center">
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(value) => setValue("otp", value)}
            name="otp" // Required for React Hook Form
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {errors.otp && (
            <p className="text-red-500 text-xs mt-1 text-center">
              {errors.otp.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || otpValue.length !== 6}
          className="mt-6 w-full bg-yellow-200 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-300 hover:scale-97 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
