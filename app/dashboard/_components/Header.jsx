"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className="flex gap-2 p-4 items-center justify-between bg-slate-300 shadow-sm">
      <Image src={"/logo.svg"} width={50} height={50}  />
      <ul className=" hidden md:flex gap-6">
        <Link href={"/dashboard"}>
        <li className={`hover:text-sky-500 hover:font-bold transition-transform cursor-pointer ${path=='/dashboard' && 'text-green-900 font-semibold'}`}>
          Dashboard
        </li>
        </Link>
        
        <li className={`hover:text-sky-500 hover:font-bold transition-transform cursor-pointer ${path=='/dashboard/upgrade' && 'text-green-900 font-semibold'}`}>
          
          Upgrade
        </li>
       
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
