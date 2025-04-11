import React from 'react'
import foundingStory from '../../../assets/Images/FoundingStory.png'
const AboutSection2 = () => {
  return (
    <div className=" bg-richblack-900 w-full h-auto  mt-10">
      <div className=" w-11/12 mx-auto pt-14 font-inter">
        {/*------------ section-1-------------  */}
        <div className=" px-10 flex items-center justify-between">
          <div className="w-5/12 space-y-2">
            <h3 className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text font-bold text-3xl">
              Our Founding Story
            </h3>
            <p className=" text-richblack-400">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className=" text-richblack-400">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>

          <div className="w-5/12">
            <img src={foundingStory} alt="img" />
          </div>
        </div>

        {/*------------ section-2-------------  */}
        <div className=" px-10 flex items-center justify-between mt-44">
          <div className="w-5/12 space-y-2">
            <h3 className="bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold text-3xl">
              Our Vision
            </h3>
            <p className=" text-richblack-400">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>

          <div className="w-5/12 space-y-2">
            <h3 className="bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-3xl">
              Our Mission
            </h3>
            <p className=" text-richblack-400">
              our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection2
