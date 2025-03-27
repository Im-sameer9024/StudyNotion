import React from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation, } from "react-router-dom";
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



const Navbar = () => {

    const location = useLocation();

    const matchRoute = (route) =>{
        return matchPath({ path: route }, location.pathname)
    }

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
                          <NavigationMenuLink asChild>
                            <Link to={"/"}>hello</Link>
                          </NavigationMenuLink>
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
          <button className=" border border-richblack-700 px-4 py-2 rounded-md bg-richblack-800 hover:bg-richblack-900 transition-all duration-200 ease-in-out hover:scale-97">
            Log In
          </button>
          <button className=" border border-richblack-700 px-4 py-2 rounded-md bg-richblack-800 hover:bg-richblack-900 transition-all duration-200 ease-in-out hover:scale-97">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
