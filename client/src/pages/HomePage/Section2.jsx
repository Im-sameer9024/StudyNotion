import React from "react";
import HeadingText from "../../components/core/Home/HighlightText";
import HighlightText from "../../components/core/Home/HighlightText";
import CTAButton from "../../components/core/Home/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import CodeBlockAnimation from "../../components/core/Home/CodeBlockAnimation";


const Section2 = () => {
  return (
    <div className=" text-white w-11/12 mx-auto py-8  mt-24 flex flex-col items-center justify-center gap-4 font-inter ">
      {/*----------------------- section-1-------------------  */}
      <div className=" w-9/12 flex items-center justify-between">
        {/* left side section  */}
        <div className=" w-[48%]">
          <p className=" font-bold text-3xl tracking-wider text-white">
            Unlock your <HighlightText text={"coding potential"} /> with our
            online courses.
          </p>

          <p className=" text-richblack-200 mt-2 text-[0.8rem]">
            Our courses are designed and taught by industry experts who have
            years of experience in coding and are passionate about sharing their
            knowledge with you.
          </p>
          {/* buttons  */}
          <div className="flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
              Try it Yourself
              <FaArrowRightLong />
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>
          </div>
        </div>
        <div className=" w-[42%] bg-richblack-400 border border-richblack-500 backdrop-blur-2xl bg-opacity-30 rounded-md relative ">
          <CodeBlockAnimation
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n/nav>`}
            codeColor={" text-richblack-100"}
          />
          <div className="w-72 h-64 rounded-full bg-gradient-to-br from-richblack-50 blur-2xl opacity-70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
        </div>
      </div>

      {/*------------------------ section-2----------------------  */}
      <div className=" w-9/12 flex items-center justify-between mt-[12rem]">
        {/* left side section  */}

        <div className=" w-[48%] bg-richblack-400 border border-richblack-500 backdrop-blur-2xl bg-opacity-30 rounded-md relative ">
          <CodeBlockAnimation
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n/nav>`}
            codeColor={" text-richblack-100"}
          />
          <div className="w-72 h-64 rounded-full bg-gradient-to-br from-blue-50 blur-2xl opacity-70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
        </div>

        {/* right side section  */}
        <div className=" w-[42%]">
          <p className=" font-bold text-3xl tracking-wider text-white">
            Start <HighlightText text={"coding in seconds"} />
          </p>

          <p className=" text-richblack-200 mt-2 text-[0.8rem]">
            Go ahead, give it a try. Our hands-on learning environment means
            you'll be writing real code from your very first lesson.
          </p>
          {/* buttons  */}
          <div className="flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
              Continue Lesson
              <FaArrowRightLong />
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
              Learn More
            </CTAButton>
          </div>
        </div>
      </div>

      <div className=" text-white w-full py-8  mt-24 flex flex-col items-center justify-center  font-inter ">
        <h3 className=" font-bold text-3xl tracking-wider text-white">
          Unlock the <HighlightText text={"Power of Code"} />
        </h3>
        <p className=" text-richblack-200  text-[0.8rem]">
          Learn to Build Anything You Can Imagine
        </p>
      </div>
    </div>
  );
};

export default Section2;
