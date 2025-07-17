import React from "react";
import { FaUserCircle, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  const { displayName, email, photoURL, metadata } = user;

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 sm:p-8 bg-base-100 shadow-xl rounded-2xl border border-primary/10">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="avatar">
          <div className="w-28 sm:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
              alt="User Avatar"
            />
          </div>
        </div>

        <div className="flex-1 space-y-4 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-secondary flex items-center justify-center sm:justify-start gap-2">
            <FaUserCircle className="text-primary" /> {displayName || "N/A"}
          </h2>

          <p className="flex items-center justify-center sm:justify-start text-sm text-gray-600 gap-2">
            <FaEnvelope className="text-primary" /> {email || "N/A"}
          </p>

          <p className="flex items-center justify-center sm:justify-start text-sm text-gray-500 gap-2">
            <FaCalendarAlt className="text-primary" />
            Registered on:{" "}
            {metadata?.creationTime
              ? new Date(metadata.creationTime).toLocaleDateString()
              : "N/A"}
          </p>

          <div className="badge badge-secondary badge-outline px-4 py-2 mt-2">
            Role: <span className="ml-1 font-semibold capitalize">User</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
