import React from "react";
import HighlightText from "../Home/HighlightText";
import about1 from "../../../assets/Images/aboutus1.webp";
import about2 from "../../../assets/Images/aboutus2.webp";
import about3 from "../../../assets/Images/aboutus3.webp";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const AboutSection1 = () => {
  return (
    <div className=" w-full bg-richblack-800 min-h-[60vh] overflow-hidden py-10  ">
      <div className=" w-11/12 mx-auto text-white pt-14 font-inter relative flex flex-col gap-10">
        {/*---------- heading--------  */}
        <h3 className=" tracking-wider font-bold font-inter flex text-4xl mt-10 gap-1 text-center flex-col">
          Driving Innovation in Online Education for a
          <HighlightText text={" Brighter Future"} />
        </h3>
        <p className=" text-center px-60 text-md text-richblack-400 ">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </p>

        {/* gallery section  */}
        <div className=" w-full flex items-center gap-10 text-center text-richblack-400">
          {[about1, about2, about3].map((item, index) => (
            <img key={index} className=" w-1/3 " src={item} alt="img" />
          ))}
        </div>
        <p className="px-10 text-4xl mt-14 font-bold gap-1 text-center">
          We are passionate about revolutionizing the way we learn. Our
          innovative platform <HighlightText text={"combines technology"} />,
          <span className=" text-orange-300"> expertise</span>, and community to
          create an{" "}
          <span className=" text-yellow-300">
            {" "}
            unparalleled educational experience
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutSection1;
