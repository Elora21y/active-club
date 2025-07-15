import React from "react";
import icon from "/favicon.png";

const NavLogo = () => {
  return (
    <div className="flex items-center gap-1 ">
      <img src={icon} alt="" className="w-6 sm:w-10" />
      <a href="/" className="mont text-secondary font-bold text-lg sm:text-2xl md:text-[28px]">
        Active Club
      </a>
    </div>
  );
};

export default NavLogo;
