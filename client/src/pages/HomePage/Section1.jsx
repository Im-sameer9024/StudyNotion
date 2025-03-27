import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "../../components/core/Home/Button";
import Banner from "../../assets/Images/banner.mp4";
import HighlightText from "../../components/core/Home/HighlightText";

const Section1 = () => {
  return (
    <div className=" text-white w-11/12 mx-auto py-8  mt-24 flex flex-col items-center justify-center gap-4 font-inter ">
      {/* btn become an Instructor  */}
      <Link
        to={"/signup"}
        className=" flex items-center gap-2 font-medium text-richblack-200 font-inter bg-richblack-800 px-4 py-2 rounded-full shadow-sm shadow-richblack-600 hover:bg-richblack-900 transition-all duration-200 ease-in-out hover:scale-97"
      >
        Become an Instructor
        <FaArrowRight />
      </Link>

      {/* heading  */}
      <p  className=" tracking-wider font-bold font-inter flex text-2xl mt-10 gap-1">
        Empower Your Future with
        <HighlightText text={" Coding Skills"} />
      </p>

      {/* description  */}
      <p className=" text-center w-8/12 text-richblack-200">
        With our online coding courses, you can learn at your own pace, from
        anywhere in the world, and get access to a wealth of resources,
        including hands-on projects, quizzes, and personalized feedback from
        instructors.
      </p>

      {/* buttons  */}
      <div className="flex flex-row gap-7 mt-8">
        <CTAButton active={true} linkto={"/signup"}>
          Learn More
        </CTAButton>

        <CTAButton active={false} linkto={"/login"}>
          Book a Demo
        </CTAButton>
      </div>

      {/* video section  */}
      <div className="mx-3 my-6 shadow-richblack-400 shadow-2xl relative w-8/12 h-[500px] overflow-hidden ">
        <video
          muted
          loop
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={Banner} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Section1;
