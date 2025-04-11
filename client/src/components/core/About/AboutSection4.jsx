import React from "react";
import CTAButton from "../../core/Home/Button";
import HighlightText from "../Home/HighlightText";
const AboutSection4 = () => {
  const LearningGridArray = [
    {
      id: -1,
      title: "World-Class Learnings for",
      hightLightText: "Anyone, Anywhere",
      des: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      btnText: "Learn More",
      btnLink: "/",
    },
    {
      id: 1,
      title: "Curriculum Based on Industry Needs",
      des: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      id: 2,
      title: "Our Learning Methods",
      des: " The learning process uses the namely online and offline.",
    },
    {
      id: 3,
      title: "Certification",
      des: "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
      id: 4,
      title: " Rating 'Auto-grading' ",
      des: " You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
      id: 5,
      title: "Ready to Work",
      des: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
  ];

  return (
    <div className=" w-10/12 grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-24">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"} ${
              card.id % 2 === 1
                ? " bg-richblack-700 h-[294px]"
                : card.id % 2 === 0
                ? " bg-richblack-800 h-[294px]"
                : "bg-transparent"
            } ${card.id === 3 && "xl:col-start-2"}  `}
          >
            {card.id < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0 text-white">
                <div className="text-3xl font-bold ">
                  {card.title}
                  <br/>
                  <HighlightText text={card.hightLightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.des}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.btnLink}>
                    {card.btnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg font-bold">{card.title}</h1>

                <p className="text-richblack-300 font-medium">{card.des}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AboutSection4;
