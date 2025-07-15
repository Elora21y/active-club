// import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import UploadImage from '../../shared/UploadImage';
import image from '../../assets/upload-img.png'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const AddCourt = () => {
    const [courtImage, setCourtImage] = useState("");
const axiosSecure = useAxiosSecure()
  const [selectedSlots, setSelectedSlots] = useState([]);

  const availableSlots = [
    "06:00 AM - 07:00 AM",
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
    "08:00 PM - 09:00 PM",
    "09:00 PM - 10:00 PM",
  ];

  const handleSlotChange = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const court_type = form.courtType.value;
  const price = form.price.value;

  const newCourt = {
    court_type,
    slot_times: selectedSlots,
    price_per_session: parseInt(price),
    image: courtImage,
    created_at: new Date().toISOString(),
  };
// console.log(newCourt)
  try {
    const res = await axiosSecure.post("/courts", newCourt);
    if (res.data?.insertedId) {
      // ✅ Show success modal
      Swal.fire({
        title: "Success!",
        text: "Court added successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#10b981", // Tailwind green-500
      });

      form.reset();
      setCourtImage("");
      setSelectedSlots([]);
    }
  } catch (err) {
    toast.error(err.response?.data?.error || "Failed to add court");
  }
};


  return (
    <div className="max-w-xl mx-auto ">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Court</h2>

      <form onSubmit={handleSubmit} className="space-y-5 w-full fieldset bg-base-100 shadow-md p-6 rounded-xl">
        {/* Court Type */}
        <div>
          <label className="label font-semibold mb-3">Court Type</label>
          <select name="courtType" className="select w-full select-bordered" required defaultValue=''>
            <option disabled  value="">Select Court Type</option>
            <option>Badminton</option>
            <option>Volleyball</option>
            <option>Tennis</option>
            <option>Table Tennis</option>
            <option>Squash</option>
            <option>Basketball</option>
            <option>Futsal</option>
            <option>Hockey</option>
            <option>Cricket Net Practice</option>
          </select>
        </div>

        {/* Slot Times */}
        <div>
          <label className="label font-semibold mb-3">Select Slot Times</label>
          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            {availableSlots.map((slot) => (
              <label key={slot} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={slot}
                  checked={selectedSlots.includes(slot)}
                  onChange={() => handleSlotChange(slot)}
                  className="checkbox checkbox-sm"
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="label font-semibold mb-3">Price per Session (৳)</label>
          <input
            type="number"
            name="price"
            min="0"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Image Upload */}
      
        <UploadImage setProfilePic={setCourtImage} profilePic={courtImage} image={image} w={20}/>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">Add Court</button>
      </form>
    </div>
  );
};

export default AddCourt;