import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SocialSignIn from './SocialSignIn';

const Login = () => {
  const { loginUser } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
//   const navigate = useNavigate();
//   const location = useLocation();
  // const form = location.state?.form || '/'
  //   console.log(location.state)
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        // toast.success("Successfully Login");
        // navigate(`${location.state ? location.state : "/"}`);
        // navigate(form)
      })
      .catch((error) => {
        if (error.code == "auth/invalid-credential")
          return setError("Incorrect email or password");
        if (error.code == "auth/invalid-email")
          return setError("Please enter your email");
        if (error.code == "auth/missing-password")
          return setError("Please enter your password");
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <div>
      <h2 className="text-center text-4xl lg:text-5xl font-bold mb-5 text-primary">
        Welcome Back
      </h2>
      <div className="card  shrink-0 shadow shadow-primary hover:shadow-md duration-500 transition-shadow">
        <div className="card-body w-[300px] sm:w-96 md:w-[400px]">
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input "
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            {/* password */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-400">
                Password
              </label>
              <input
                type={`${showPass ? "text" : "password"}`}
                {...register("password", {
                  required: true,
                })}
                placeholder="Password"
                className="input border-gray-300 focus:border-2 focus:border-primary-300 focus:border-[#FB9E3A] focus:outline-none focus:ring-4 focus:ring-[#f7945220] bg-transparent placeholder:text-gray-300 placeholder:text-xs w-full"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                type="button"
                className="absolute text-gray-400 btn btn-xs btn-ghost z-10 right-1 top-6 hover:bg-transparent border-0"
              >
                {showPass ? (
                  <FaRegEyeSlash size={15} />
                ) : (
                  <FaRegEye size={15} />
                )}
              </button>
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors && <p className="text-red-500">{error}</p>}
            </div>

            <button className="btn orange-btn mt-2" type="submit">
              Sign Up
            </button>
          </form>
          {/* social login */}
          <div className="flex items-center my-3 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-primary"></div>
            <p className=" text-sm text-center">OR</p>
            <div className="flex-1 h-px sm:w-16 bg-primary"></div>
          </div>
          <SocialSignIn />

          <p className="text-xs sm:text-[14px] text-center">
            Don't have an account? Please
            <Link
              to="/auth/register"
              state={location.state || "/"}
              className="hover:underline font-semibold text-[13px] sm:text-base"
            >
              {" "}
              {"  "}Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;