import { Link, NavLink, Outlet } from "react-router";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import NavLogo from "../shared/NavLogo";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaCheckCircle,
  FaCreditCard,
  FaBookmark,
  FaPlusCircle,
  FaTable,
  FaTags,
  FaBullhorn,
  FaUsersCog,
  FaUserFriends,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { role, roleLoading } = useUserRole();
  console.log(role);

  const menuItems = (
    <>
      <li>
        <NavLink to="/dashboard" end className="flex items-center gap-2">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-profile" className="flex items-center gap-2">
          <FaUser /> My Profile
        </NavLink>
      </li>
      {!roleLoading && role !== "admin" && (
      <li>
        <NavLink
          to="/dashboard/my-pending-bookings"
          className="flex items-center gap-2"
        >
          <FaClipboardList /> My Pending Bookings
        </NavLink>
      </li>
      )}

      {/* //member */}
      {!roleLoading && role === "member" && (
        <>
          <li>
            <NavLink
              to="/dashboard/approve-bookings"
              className="flex items-center gap-2"
            >
              <FaCheckCircle /> Approved Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/confirmed-bookings"
              className="flex items-center gap-2"
            >
              <FaBookmark /> Confirmed Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/payment-history"
              className="flex items-center gap-2"
            >
              <FaCreditCard /> Payment History
            </NavLink>
          </li>
        </>
      )}
      {/* admin */}
      {!roleLoading && role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard/approval-bookings"
              className="flex items-center gap-2"
            >
              <MdPendingActions /> Pending Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-court"
              className="flex items-center gap-2"
            >
              <FaPlusCircle /> Add Court
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/court" className="flex items-center gap-2">
              <FaTable /> All Courts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-coupons"
              className="flex items-center gap-2"
            >
              <FaTags /> Manage Coupons
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-bookings"
              className="flex items-center gap-2"
            >
              <FaClipboardList /> Manage Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-members"
              className="flex items-center gap-2"
            >
              <FaUserFriends /> Manage Members
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/users" className="flex items-center gap-2">
              <FaUsersCog /> All Users
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/dashboard/announcements"
          className="flex items-center gap-2"
        >
          <FaBullhorn /> Announcements
        </NavLink>
      </li>
      <li>
        <button
          onClick={() =>
            logOut()
              .then(() => toast.success("Successfully logged out"))
              .catch((err) => toast.error(err.message))
          }
          className="flex items-center text-red-500 hover:text-white hover:bg-red-600 mt-10"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="flex min-h-screen bg-linear-to-r from-[#0e101f] to-[#0e2136]">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:block fixed top-0 left-0 h-screen w-64 bg-base-300 shadow-lg py-5 z-40 overflow-y-auto">
        <div className="border-b border-t-primary pb-3 pl-2">
          <NavLogo />
        </div>

        <ul className="menu p-4 space-y-3 mt-2">{menuItems}</ul>
      </aside>

      {/* Main content area */}
      <div className="flex-1 lg:ml-64">
        {/* Top navbar for mobile */}
        <div className="lg:hidden flex justify-between items-center px-4 py-3 bg-base-300 shadow">
          <NavLogo />
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-2xl focus:outline-none cursor-pointer"
          >
            <FaBars />
          </button>
        </div>

        {/* Right sidebar drawer (mobile) */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsDrawerOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-64 bg-base-300 shadow-xl p-4 transform transition-transform duration-500 translate-x-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Icon */}
              <div className="flex justify-end items-center mt-2">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-2xl cursor-pointer hover:rounded-full hover:border hover:text-red-400 duration-500 transition-all"
                >
                  <IoMdClose />
                </button>
              </div>
              <ul className="menu space-y-2 ">{menuItems}</ul>
            </div>
          </div>
        )}

        {/* Page content */}
        <div className="max-w-7xl mx-auto my-5 md:my-8 lg:my-12 px-5 sm:px-8 overflow-x-auto">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
