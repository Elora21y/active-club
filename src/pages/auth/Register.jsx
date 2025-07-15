import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SocialSignIn from './SocialSignIn';
// // import axios from 'axios';
import image from '../../assets/image-upload-icon.png'
import UploadImage from '../../shared/UploadImage';

const Register = () => {
    const { createUser, updateUser } = useAuth();
  const axiosInstance = useAxios();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [profilePic, setProfilePic] = useState("");
  // const [profileLoading, setProfileLoading] = useState(false);
  const form = location.state?.form || '/'
    console.log(location.state)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    const { email, password } = data;
    createUser(email, password)
      .then(async (result) => {
        console.log(result.user);

        //update userInfo in the database
        const userInfo = {
          email: data.email,
          role: "user",
          create_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        // const userRes = await axiosInstance.post(`/users`, userInfo);
        // console.log(userRes.data);

        // update user profile in firebase
        const updateInfo = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUser(updateInfo)
          .then(() => {
            // console.log("profile updated");
            // if(userRes.data.insertedId){
              toast.success("Successfully Login");
              navigate(form);
            // }
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const handleImgUpload = async (e) => {
  //   const img = e.target.files[0];
  //   // console.log(img);
  //   if (!img) return;

  //   const formData = new FormData();
  //   formData.append("image", img);

  //   //https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY
  //   const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
  //     import.meta.env.VITE_image_upload_key
  //   }`;
  //   setProfileLoading(true)
  //   try {
  //   const res = await axios.post(imgUploadUrl, formData);
  //   setProfilePic(res.data.data.url);
  // } catch (error) {
  //   console.error("Image upload failed", error);
  //   toast.error("Failed to upload image");
  // } finally {
  //   setProfileLoading(false); 
  // }
  // };
  return (
    <div>
      <h2 className="text-center text-4xl lg:text-5xl font-bold mb-5 text-secondary">
        Please Register
      </h2>
      <div className="card  shrink-0 shadow shadow-primary hover:shadow-md duration-500 transition-shadow">
        <div className="card-body w-[300px] sm:w-96 md:w-md">
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
       
                {/* name */}
            <label className="label inline-block">Name</label>
            <input
              type="text"
              className="input "
              placeholder="User Name"
              {...register("name", { required: true, minLength: 4 })}
            />
            
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
            {errors.name?.type === "minLength" && (
              <p className="text-red-500"> Minimum 4 character </p>
            )}
            {/* photo */}
            <UploadImage setProfilePic={setProfilePic} profilePic={profilePic} image={image} w={14}/>
            {/* <label className="label" 
            onChange={handleImgUpload}
            >
               <div className="flex text-center items-center justify-center py-2 mx-auto border w-full border-[#9ca3af8f] border-dashed rounded-lg min-h-14">
            {
              profileLoading ? 
              <span className="loading loading-spinner text-info"></span>
              :
               <img
                src={ profilePic ? profilePic : image}
                alt="profile"
                className="w-14 h-14 object-cover "
              />
            }
             </div>
              
              <input type="file" className="hidden" />
            </label> */}
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
                  minLength: 6,
                  pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                })}
                placeholder="Password"
                className="input border-[#9ca3af62] focus:border-2 focus:border-primary-300 focus:border-[#91C8E4] focus:outline-none focus:ring-4 focus:ring-[#f7945220] bg-transparent placeholder:text-gray-300 placeholder:text-xs w-full"
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
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">Password is must 6 character</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password is must a Lowercase letter & one Uppercase letter
                </p>
              )}
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
              to="/auth/login"
              state={location.state || "/"}
              className="hover:underline font-semibold text-[13px] sm:text-base"
            >
              {" "}
              {"  "}Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;