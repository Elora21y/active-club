import React from "react";
import forbidden from "../../assets/animation.svg";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-xl mx-auto">
          <img src={forbidden} alt="" />
        <Link
          to="/"
          className="btn text-white bg-linear-to-r from-blue-500 to-primary  rounded-full font-medium transition duration-200"
        >
          Go Back Home
        </Link>
    </div>
  );
};

export default Unauthorized;
