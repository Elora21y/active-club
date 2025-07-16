import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BookCourtModal from "./BookCourtModal";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Courts = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courts");
      return res.data;
    },
  });
  const navigate = useNavigate();
const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingDate, setBookingDate] = useState("");

  const handleBookNow = (_id) => {
    if (!user) {
      return navigate("/login");
    }
    document.getElementById(`booking_modal_${_id}`).showModal();
  };

  if (isLoading)
    return <div className="text-center py-10">Loading courts...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h2 className="text-3xl font-bold text-center mb-8">Available Courts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <div
            key={court._id}
            className="bg-base-100 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
          >
            <img
              src={court.image}
              alt={court.court_type}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col gap-3 flex-grow">
              <h3 className="text-xl font-bold text-secondary">
                {court.court_type}
              </h3>

              <div>
                <p className="font-semibold mb-1">Available Session:</p>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto ">
                  {court.slot_times.map((slot, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-full border border-primary text-white text-[9px]"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              <p className="">
                <span className="font-semibold">Price:</span> ৳
                {court.price_per_session} per session
              </p>

              <button className="mt-auto btn btn-primary w-full" onClick={()=>handleBookNow(court._id)}>
                Book Now
              </button>
              <dialog id={`booking_modal_${court._id}`} className="modal">
                <div className="modal-box">
                  {/* Booking Modal */}
                  <BookCourtModal
                  user={user}
                    court={court}
                    selectedSlots={selectedSlots}
                    setSelectedSlots={setSelectedSlots}
                    bookingDate={bookingDate}
                    setBookingDate={setBookingDate}
                  />

                  <form method="dialog" className="modal-backdrop">
                    <button className="btn btn-soft btn-error mt-3 " >
                      close
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courts;
