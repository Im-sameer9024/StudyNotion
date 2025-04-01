import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links.js";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import ProfiledDropDown from "../core/Auth/ProfiledDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";

const copySubLinks = [
  {
    title: "Python",
    link: "/catalog/python",
  },
  {
    title: "Web Development",
    link: "/catalog/web-development",
  }
]

const Navbar = () => {
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  //------------------ value from redux slices--------------

  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);

  console.log("redux values", token, totalItems, user);

  //-------------------API calls --------------------

  // const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log(categories.CATEGORIES_API)
      // setSubLinks(result.data.data);
      console.log(result);
    } catch (error) {
      console.log("could not fetch the categoryList", error);
    }
  };

  useEffect(() => {
   fetchSubLinks()
  }, []);

  return (
    <div className=" w-full bg-richblack-900 text-white border-b border-b-richblack-700 font-inter ">
      <div className=" w-11/12 flex py-3 justify-between mx-auto">
        {/*------------- logo section ------------ */}
        <Link to={"/"}>
          <img src={logo} alt="logo" className=" h-8" />
        </Link>

        {/*----------- links ------------- */}
        <div>
          <ul className=" flex items-center gap-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul
                            className=" !min-w-[180px]
                            py-2 flex flex-col gap-3 "
                          >
                            {copySubLinks.map((component, i) => (
                              <Link
                                key={i}
                                to={component.link}
                                className=" hover:bg-richblack-100 w-full px-2 py-1 rounded-md"
                              >
                                {component.title}
                              </Link>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                ) : (
                  <Link
                    className={`${
                      matchRoute(link.path) ? "text-yellow-100" : "text-white"
                    }`}
                    to={link?.path}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/*----------- login and SignUp button ------------- */}
        <div className=" flex items-center gap-4">
          {user && user?.accountType != "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <FaCartShopping />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link
              to={"/login"}
              className=" border border-richblack-700 px-4 py-2 rounded-md bg-richblack-800 hover:bg-richblack-900 transition-all duration-200 ease-in-out hover:scale-97"
            >
              Log In
            </Link>
          )}

          {token === null && (
            <Link
              to={"/signup"}
              className=" border border-richblack-700 px-4 py-2 rounded-md bg-richblack-800 hover:bg-richblack-900 transition-all duration-200 ease-in-out hover:scale-97"
            >
              Sign Up
            </Link>
          )}

          {token !== null && <ProfiledDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
