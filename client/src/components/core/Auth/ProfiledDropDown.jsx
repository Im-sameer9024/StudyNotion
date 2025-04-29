import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../../services/operations/authAPI";

const ProfiledDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("user is here", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = () =>{
    dispatch(logOut({navigate})).unwrap()

  }

  return (
    <div className="relative font-inter group">
      {" "}
      {/* Group should be here */}
      <div>
        <img
          src={user?.image}
          alt="profile"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </div>
      <ul className="hidden absolute bg-richblack-800 px-2 py-4 right-0 top-8 group-hover:flex flex-col rounded-md border-blue-700 border gap-2">
        <Link
          to="/dashboard/my-profile"
          className=" hover:bg-richblack-600 px-2 rounded-md"
        >
          Dashboard
        </Link>
        <button
          onClick={logoutHandler}
          className=" hover:bg-richblack-600 px-2 rounded-md"
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default ProfiledDropDown;
