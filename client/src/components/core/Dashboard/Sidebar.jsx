import React from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logOut } from "../../../services/operations/authAPI";
import { useSelector } from "react-redux";
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
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex h-[calc(100vh-3.5rem)] max-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 ">
        <div className=" flex flex-col px-4 ">
          {sidebarLinks.map((Link, index) => {
            if (Link.type && Link.type !== user?.accountType) return null;
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
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                      Anyone who has this link will be able to view this.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input
                        id="link"
                        defaultValue="https://ui.shadcn.com/docs/installation"
                        readOnly
                      />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                      <span className="sr-only">Copy</span>
                      <Copy />
                    </Button>
                  </div>
                  <DialogFooter className="sm:justify-start">
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
