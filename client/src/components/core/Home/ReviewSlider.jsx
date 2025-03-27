import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // ADD THIS
import React from "react";
import Slider from "react-slick";

const ReviewSlider = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      // Add responsive breakpoints
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="slider-container w-full  mx-auto py-8">
      <Slider {...settings}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="px-2">
            <div className="bg-gray-800 text-white p-6 rounded-lg h-48 flex items-center justify-center">
              <h3 className="text-xl font-bold">Slide {item}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewSlider;
