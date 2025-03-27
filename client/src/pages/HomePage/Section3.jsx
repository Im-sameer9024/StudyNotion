import React from "react";
import CTAButton from "../../components/core/Home/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import HighlightText from "../../components/core/Home/HighlightText";
import TimelineSection from "../../components/core/Home/TimelineSection";
import LearningLanguageSection from "../../components/core/Home/LearningLanguageSection";

const Section3 = () => {
  return (
    <div className=" w-full bg-white min-h-[100vh]">
      <div className=" w-11/12 mx-auto  flex flex-col items-center ">
        {/* buttons  */}
        <div className="flex flex-row gap-7 mt-8 pt-14">
          <CTAButton active={true} linkto={"/signup"}>
            Explore Full Catalog
            <FaArrowRightLong />
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Learn More
          </CTAButton>
        </div>

        <div className="mx-auto w-11/12  flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row justify-between mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighlightText text={" Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <TimelineSection />

        <LearningLanguageSection />
      </div>
    </div>
  );
};

export default Section3;
