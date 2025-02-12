"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="p-3 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-10 items-center">
        <Link href="/" onClick={() => window.location.reload()}>
          <Image src={"/logo.svg"} width={100} height={100} alt="logo" />
        </Link>
        <ul className="hidden md:flex gap-10 items-center">
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-xl cursor-pointer ${
                path == "/" && "text-primary"
              }`}
            >
              For Sell
            </li>
          </Link>
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-xl cursor-pointer`}
            >
              Docker Deployment Test
            </li>
          </Link>
          {/* <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-xl cursor-pointer`}
            >
              Agent Finder
            </li>
          </Link> */}
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Link href={"/add-new-listing"}>
          <Button className="flex gap-2" variant="contained">
            Post Your Ad
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
