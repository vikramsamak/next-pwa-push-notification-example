import React from "react";
import { ModeToggle } from "./ui/ModeToggle";

function Header() {
  return (
    <header className="flex w-full justify-between p-2 items-center border-b-2 rounded-md">
      <h1 className="text-sm md:text-lg">
        PWA Push Notification Example Using Next Js
      </h1>
      <ModeToggle />
    </header>
  );
}

export default Header;
