import React from "react";

const AboutSection3 = () => {
  const data = [
    { id: 1, title: "Active Students", number: "5K" },
    { id: 2, title: "Mentors", number: "10+" },
    { id: 3, title: "Courses", number: "200+" },
    { id: 4, title: "Awards", number: "50+" },
  ];

  return (
    <div className=" w-full bg-richblack-800 h-auto overflow-hidden py-10 mt-24 ">
      <div className=" w-9/12 mx-auto flex justify-between text-white">
        {data.map((item) => (
          <div key={item.id} className=" text-center">
            <h3 className=" text-2xl font-bold">{item.number}</h3>
            <span className=" text-richblack-400 font-light">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection3;
