import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddCourt = () => {
    const [courtImage, setCourtImage] = useState("");
  const [imgLoading, setImgLoading] = useState(false);

  const [selectedSlots, setSelectedSlots] = useState([]);

  const availableSlots = [
    "06:00 AM - 07:00 AM",
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
  ];

  const handleSlotChange = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImgLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData
      );
      setCourtImage(res.data.data.url);
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setImgLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const courtType = form.courtType.value;
    const price = form.price.value;

    const newCourt = {
      courtType,
      slotTimes: selectedSlots,
      pricePerSession: parseInt(price),
      imageUrl: courtImage,
    };

    // 🔁 Send to server here
    console.log(newCourt);
    toast.success("Court added successfully!");
    form.reset();
    setCourtImage("");
    setSelectedSlots([]);
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Court</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Court Type */}
        <div>
          <label className="label font-semibold">Court Type</label>
          <select name="courtType" className="select w-full select-bordered" required>
            <option disabled selected value="">Select Court Type</option>
            <option>Badminton</option>
            <option>Volleyball</option>
            <option>Tennis</option>
            <option>Table Tennis</option>
            <option>Squash</option>
            <option>Basketball</option>
            <option>Futsal</option>
            <option>Cricket Net Practice</option>
            <option>Yoga Hall</option>
            <option>Gym Area</option>
          </select>
        </div>

        {/* Slot Times */}
        <div>
          <label className="label font-semibold">Select Slot Times</label>
          <div className="grid grid-cols-2 gap-2">
            {availableSlots.map((slot) => (
              <label key={slot} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={slot}
                  checked={selectedSlots.includes(slot)}
                  onChange={() => handleSlotChange(slot)}
                  className="checkbox checkbox-sm"
                />
                <span className="text-sm">{slot}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="label font-semibold">Price per Session (৳)</label>
          <input
            type="number"
            name="price"
            min="0"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="label font-semibold">Court Image</label>
          <div className="flex items-center gap-4">
            {imgLoading ? (
              <div className="loading loading-spinner text-primary w-12 h-12" />
            ) : courtImage ? (
              <img src={courtImage} alt="Court" className="w-16 h-16 rounded object-cover" />
            ) : (
              <div className="w-16 h-16 rounded border border-dashed flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered file-input-sm w-full"
              required={!courtImage}
            />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">Add Court</button>
      </form>
    </div>
  );
};

export default AddCourt;