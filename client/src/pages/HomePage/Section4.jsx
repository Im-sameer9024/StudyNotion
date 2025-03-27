import React from 'react'
import Instructor from '../../assets/Images/Instructor.png'
import HighlightText from '../../components/core/Home/HighlightText';
import CTAButton from '../../components/core/Home/Button'
import { FaArrowRightLong } from 'react-icons/fa6';
import ReviewSlider from '../../components/core/Home/ReviewSlider';

const Section4 = () => {
  return (
    <div className=" w-full bg-richblack-900 min-h-[100vh] font-inter text-white">
      <div className=" w-11/12 mx-auto py-8  mt-24 ">
        <div className=" flex items-center justify-between w-full">
          {/* left side image section  */}
          <div className="w-[45%] shadow-richblack-400 shadow-2xl">
            <img src={Instructor} alt="" className="shadow-white" />
          </div>

          {/* right side text section  */}
          <div className=" w-[45%] flex flex-col gap-4">
            <h3 className=" text-3xl font-semibold">
              Become an <HighlightText text={"Instructor"} />
            </h3>
            <p className=" text-richblack-200 mt-2 text-[0.8rem]">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <CTAButton active={true} linkto={"/signup"}>
              Start Teaching Today
              <FaArrowRightLong />
            </CTAButton>
          </div>
        </div>

        {/* review section slider  */}

        <div className=" mt-24 flex flex-col items-center">
          <h3 className=" text-3xl font-semibold ">
            Review From Other Learners
          </h3>
          
            <ReviewSlider />
        </div>
      </div>
    </div>
  );
}

export default Section4
