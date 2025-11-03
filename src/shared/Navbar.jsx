import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AiFillHome } from "react-icons/ai";
import { MdArticle, MdGroups, MdOutlineFeedback, MdSportsTennis } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import NavLogo from "./NavLogo";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'

const Navbar = () => {
  const { user, logOut} = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const links = (
    <>
      <li>
        <NavLink to="/">
          <AiFillHome className="inline-block mr-1" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/courts">
          <MdSportsTennis className="inline-block mr-1" /> Courts
        </NavLink>
      </li>
      <li>
        <NavLink to="/our-team">
          <MdGroups  className="inline-block mr-1" /> Team
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog">
          <MdArticle className="inline-block mr-1" /> Blog
        </NavLink>
      </li>
      <li>
        <NavLink to="/give-feedback">
          <MdOutlineFeedback className="inline-block mr-1" />Feedback
        </NavLink>
      </li>
    </>
  );
  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Successfully log out"))
      .catch((error) => toast.error(error));
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    //removed the prevent memory leaks
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full transition-all duration-300 ease-in-out  top-0   ${
        isScrolled ? "bg-base-300/85 shadow-2xl backdrop-blur-2xl" : " bg-transparent border-0 lg:pt-2"
      }`}
    >
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 navbar p-0">
        <motion.div
        initial={{opacity:0 , x:-60}}
        whileInView={{opacity:1 , x:0}}
        transition={{duration:0.6, delay : 0.2}}
        animate={{opacity:1 , x:0}}
         className="navbar-start gap-1">
          <NavLogo />
        </motion.div>
        <div className="navbar-end gap-2 lg:gap-3 ">
          <div className="navbar-center hidden lg:flex">
            <ul data-aos="fade-down" className="menu menu-horizontal font-semibold px-2 space-x-2">{links}</ul>
          </div>
          {user ? (
            <>
              <div className="dropdown " >
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_htyN2AsYGqluVNNRR2AIXtpLph4pk608Uw&s"
                    }
                    alt="Profile Pic"
                    className="w-8 h-8 sm:w-10 sm:h-10  md:w-12 md:h-12  rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-10 w-48 p-2 py-3 shadow-sm right-0 space-y-3"
                >
                  
                    <p className="text-lg text-center font-semibold cursor-none">Hi! {user.displayName}</p>
                  
                  <li>
                    <Link to="/dashboard">
                      <MdDashboardCustomize className="inline-block mr-1" />{" "}
                      Dashboard
                    </Link>
                  </li>
                  <li>
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
              >
                <motion.div 
                initial={{scale : 0.7 , opacity : 0.1}}
                whileInView={{scale : 1 , opacity : 1}}
                transition={{duration : 0.5 , delay : 0.2}}
                className="btn btn-xs sm:btn-md hover:text-white hover:bg-primary text-primary border border-primary bg-transparent ">
                  Login
                </motion.div>
              </Link>
            </>
          )}
          
        

          {/* menubar */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-transparent border-0 btn-sm lg:hidden  shadow-none"
            >
              <HiOutlineMenuAlt3 size={20} />
            </div>
            <ul
              
              tabIndex={0}
              className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-20 mt-3 w-40 p-2 pr-6 shadow right-0 space-y-3"
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
