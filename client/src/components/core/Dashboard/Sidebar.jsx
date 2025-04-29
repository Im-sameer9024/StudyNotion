import React from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logOut } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Copy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (navigate) => {
    await logOut({ navigate,dispatch })
  };

  if (profileLoading || authLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex h-[calc(100vh-3.5rem)] max-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 ">
        <div className=" flex flex-col px-4 ">
          {sidebarLinks.map((Link, index) => {
            if (Link.type && user?.accountType !== Link.type) return null;
            return <SidebarLink key={index} link={Link} iconName={Link.icon} />;
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-full bg-richblack-700" />
        <div className="flex flex-col px-4">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button className=" mt-2 py-2 text-sm font-medium text-richblack-300">
            <div className="flex gap-2 items-center">
              <VscSignOut className="text-lg" />
              <Dialog>
                <DialogTrigger asChild>
                  <span className=" text-[1rem]">Logout</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Are You Sure ?</DialogTitle>
                    <DialogDescription>
                      You will be Logout of your account.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start gap-4">
                    <button
                      onClick={() => handleLogout(navigate)}
                      className=" bg-yellow-50 text-black hover:bg-yellow-100 text-[1rem] px-3 rounded-md "
                    >
                      Logout
                    </button>

                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
