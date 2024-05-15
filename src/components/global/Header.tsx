import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <div
      className={
        "bg-card border-b-2 w-full sticky top-0 p-4 flex justify-between"
      }
    >
      <Link href={"/"} className={"text-4xl"}>
        Travvely
      </Link>
      <div className="flex items-center space-x-2">
        <ModeToggle />
      </div>
    </div>
  );
}
