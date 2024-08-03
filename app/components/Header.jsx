"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Heading2, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { BiSupport } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { GiNinjaMask } from "react-icons/gi";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

function Header() {
  const [toggleSideBar, settoggleSideBar] = useState(false);
  const navigationLinks = [
    { path: "/", name: "dashboard", icon: <RxDashboard /> },
    { path: "support", name: "support", icon: <BiSupport /> },
    { path: "/my-profile", name: "my profile", icon: <MdManageAccounts /> },
    { path: "resources", name: "resources", icon: <GrResources /> },
  ];

  return (
    <div>
      <div
        className={`relative py-2 px-4 h-screen dark:bg-zinc-700 bg-zinc-300 flex flex-col items-center gap-6 transition-all duration-700 ${
          toggleSideBar ? "w-44" : "w-28"
        }`}
      >
        <div className="w-full flex justify-end ">
          <ModeToggle />
        </div>

        <div className=" justify-center hidden md:flex">
          <GiNinjaMask size={100} color="green" />
        </div>
        <div className="absolute top-1/2 right-0">
          {toggleSideBar ? (
            <CiCircleChevLeft
              size={30}
              onClick={() => settoggleSideBar(!toggleSideBar)}
            />
          ) : (
            <CiCircleChevRight
              size={30}
              onClick={() => settoggleSideBar(!toggleSideBar)}
            />
          )}
        </div>
        <ul className="mt-20 gap-6 flex flex-col">
          {navigationLinks.map(({ path, name, icon }) => (
            <li className="capitalize hover:text-blue-400 hover:transition-all hover:delay-150" key={name}>
              <Link href={path}>
                {toggleSideBar ? name : icon}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex absolute bottom-16 gap-2 items-center"><CiLogout size={ 30} /> Logout</div>
      </div>
    </div>
  );
}

export default Header;

