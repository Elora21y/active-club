import React from "react";
import icon from "/favicon.png";

const NavLogo = () => {
  return (
    <div className="navbar-start gap-1">
      <img src={icon} alt="" className="w-6 sm:w-10" />
      <a className="mont text-secondary font-bold text-lg sm:text-2xl md:text-3xl">
        Active Club
      </a>
    </div>
  );
};

export default NavLogo;
