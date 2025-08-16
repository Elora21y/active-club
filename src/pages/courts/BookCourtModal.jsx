import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const BookCourtModal = ({
  user,
  court,
  selectedSlots,
  setSelectedSlots,
  bookingDate,
  setBookingDate,
}) => {
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const axiosSecure = useAxios()

  useEffect(() => {
    // Calculate price based on selected slots
    setCalculatedPrice(selectedSlots?.length * court.price_per_session);
  }, [selectedSlots, court.price_per_session]);

  const handleSlotToggle = (slot) => {
    setSelectedSlots((prev) =>
      prev?.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleBooking = async(e) => {
    e.preventDefault();
    const bookingInfo = {
      name: user?.displayName,
      email: user?.email,
      courtId: court._id,
      court_type: court.court_type,
      slot_times: selectedSlots, // multiple slots
      booking_for: bookingDate,
      booking_at: new Date().toISOString(),
      price_per_session: court.price_per_session,
      total_price: calculatedPrice,
      payments_status : 'unpaid',
      status : 'pending'
    };
    // console.log("Booking Info:", bookingInfo);
    // TODO: Send to server...
     try {
    const res = await axiosSecure.post('/bookings', bookingInfo);
    // console.log(res)
    if (res.data.insertedId) {
      document.getElementById(`booking_modal_${court._id}`).close();
      toast.success('Booking request submitted!');
    }
  } catch (err) {
    // console.log(err)
    toast.error('Booking failed. Try again!');
  }
  };

  return (
    <>
      <h3 className="font-bold text-lg">Book: {court.court_type}</h3>
      <form onSubmit={handleBooking} className="space-y-3 mt-4">
        {/* Court Type */}
        <input
          value={court.court_type}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Price Per Session */}
        <input
          value={`৳${court.price_per_session} per session`}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Multi Slot Selection */}
        <div>
          <p className="font-semibold mb-1">Select Session Slots</p>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border p-2 rounded">
            {court.slot_times.map((slot) => (
              <label key={slot} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={slot}
                  checked={(selectedSlots || []).includes(slot)}
                  onChange={() => handleSlotToggle(slot)}
                  className="checkbox checkbox-sm"
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Booking Date */}
        <input
          type="date"
          className="input input-bordered w-full"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
        />

        {/* Total Price */}
        <input
          value={`Total: ৳${calculatedPrice}`}
          readOnly
          className="input input-bordered w-full font-bold"
        />

        <div className="modal-action">
          <button type="submit" className="btn btn-primary w-full">
            Confirm Booking
          </button>
        </div>
      </form>
    </>
  );
};

export default BookCourtModal;
