import React, { useState } from "react";
import UploadImage from "../../shared/UploadImage";
import toast from "react-hot-toast";

const availableSlots = [
  "06:00 AM - 07:00 AM",
  "07:00 AM - 08:00 AM",
  "08:00 AM - 09:00 AM",
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
const UpdateCourt = ({
  court,

  setCourtImage,

  courtImage,
  axiosSecure,
  refetch,
}) => {
    const [selectedSlots, setSelectedSlots] = useState(court.slot_times || []);
  const { court_type, slot_times, price_per_session, image, _id } = court;

  const handleSlotChange = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };
  const handleUpdateSubmit = async (e) => { 
    e.preventDefault();
    const form = e.target;
    const updatedCourt = {
      court_type: form.courtType.value,
      slot_times: selectedSlots || slot_times,
      price_per_session: parseInt(form.price.value),
      image: courtImage || image,
    };
    // console.log(updatedCourt);

    const res = await axiosSecure.put(`/courts/${_id}`, updatedCourt);
    if (res.data?.modifiedCount > 0) {
        // console.log(res)
        document.getElementById(`my_modal_${_id}`).close();
      toast.success("Court updated successfully");
      refetch();
    }
  };
  return (
    <div>
      <h3 className="font-bold text-xl mb-4">Update Court Info</h3>

      <form onSubmit={handleUpdateSubmit} className="space-y-4 fieldset">
        <div>
          <label className="label">Court Type</label>
          <select
            name="courtType"
            defaultValue={court_type}
            className="select select-bordered w-full"
          >
            <option disabled value="">
              Select Court Type
            </option>
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

        <div>
          <label className="label">Slot Times</label>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
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

        <div>
          <label className="label">Price per session (৳)</label>
          <input
            type="number"
            name="price"
            defaultValue={price_per_session}
            min="0"
            className="input input-bordered w-full"
          />
        </div>

        <UploadImage
          setProfilePic={setCourtImage}
          profilePic={courtImage}
          image={image}
          w={20}
        />

        <div className="modal-action">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCourt;
