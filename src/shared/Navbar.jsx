import React from "react";
import { Link, NavLink } from "react-router";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import NavLogo from "./NavLogo";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/court">Courts</NavLink>
      </li>
    </>
  );
  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Successfully log out"))
      .catch((error) => toast.error(error));
  };
  return (
    <div className="bg-transparent shadow right-0 left-0 border-b border-primary/30 absolute">
      <div className=" max-w-7xl mx-auto px-2 sm:px-8 xl:px-0 navbar p-0">
        <div className="navbar-start gap-1">
        <NavLogo />
        </div>
        <div className="navbar-end gap-1 sm:gap-2 lg:gap-3 ">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-2 ">{links}</ul>
          </div>
          {user ? (
            <>
              <div className="dropdown ">
                <div tabIndex={0} role="button">
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_htyN2AsYGqluVNNRR2AIXtpLph4pk608Uw&s"
                    }
                    alt="Profile Pic"
                    className="w-8 h-8 sm:w-10 sm:h-10  md:w-12 md:h-12 rounded-full object-cover cursor-pointer "
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-10 w-48 p-2 shadow-sm right-0"
                >
                  <li>
                    <p>Hi! {user.displayName}</p>
                  </li>
                  <li>
                    {" "}
                    <Link to="/dashboard">Dashboard</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <button
                      onClick={handleLogout}
                      className="orange-btn btn btn-xs "
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
             
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="btn btn-xs sm:btn-md hover:text-white hover:bg-primary text-primary border border-primary bg-transparent "
              >
                Login
              </Link>
              {/* <Link
                to="/auth/register"
                className="btn btn-xs sm:btn-md orange-btn"
              >
                Register
              </Link> */}
            </>
          )}
          {/* menubar */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-transparent border-0 btn-sm lg:hidden "
            >
              <HiOutlineMenuAlt3 size={20} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm  dropdown-content bg-base-200 rounded-box z-20 mt-3 w-40 p-2 shadow right-0"
            >
              {links}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
