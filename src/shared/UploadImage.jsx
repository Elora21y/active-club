import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';


const UploadImage = ({setProfilePic, profilePic, image, w}) => {
      const [profileLoading, setProfileLoading] = useState(false);
    const handleImgUpload = async (e) => {
    const img = e.target.files[0];
    // console.log(img);
    if (!img) return;

    const formData = new FormData();
    formData.append("image", img);

    //https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY
    const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    setProfileLoading(true)
    try {
    const res = await axios.post(imgUploadUrl, formData);
    setProfilePic(res.data.data.url);
  } catch (error) {
    console.error("Image upload failed", error);
    toast.error("Failed to upload image, try sometime later");
  } finally {
    setProfileLoading(false); 
  }
  };
   return (
    <label className="label" 
                onChange={handleImgUpload}
                >
                   <div className="flex text-center items-center justify-center py-2 mx-auto border w-full border-[#9ca3af8f] border-dashed rounded-lg min-h-14 ">
                {
                  profileLoading ? 
                  <span className="loading loading-spinner text-info"></span>
                  :
                    <img
                    src={ profilePic ? profilePic : image}
                    className={`w-${w} h-14 object-cover`}
                  />
                }
                 </div>
                  
                  <input type="file" className="hidden" />
                </label>
   )
};

export default UploadImage;