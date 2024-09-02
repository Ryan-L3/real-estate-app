import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";

function Header() {
  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-10 items-center">
        <Image src={"/logo.svg"} width={150} height={150} alt="logo" />
        <ul className="hidden md:flex gap-10 items-center">
          <li className="hover:text-primary font-medium text-sm cursor-pointer">
            For Sale
          </li>
          <li className="hover:text-primary font-medium text-sm cursor-pointer">
            For Rent
          </li>
          <li className="hover:text-primary font-medium text-sm cursor-pointer">
            Agent Finder
          </li>
        </ul>
      </div>
      <div className="flex gap-2">
        <Button className="flex gap-2" variant="contained">
          Post Your Ad
        </Button>
        <Button variant="outline">Login</Button>
      </div>
    </div>
  );
}

export default Header;
