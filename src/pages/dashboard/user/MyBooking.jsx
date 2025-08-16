import React from "react";
import { useQuery } from "@tanstack/react-query";;
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email || ""}`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      console.log(res)
      if (res.data.deletedCount > 0) {
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        refetch();
      }
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading bookings...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 text-xs md:text-sm ">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">My Pending Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 text-base">No bookings found.</div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-base-100 shadow p-4 rounded-lg border border-primary/10"
            >
              <div className="flex justify-between items-center flex-wrap gap-4 ">
                <div className="space-y-1">
                 <div className="flex gap-3 items-center">
                     <h3 className="text-lg md:text-xl font-semibold text-secondary">
                    {booking.court_type}
                  </h3>
                  <span
                      className={` badge badge-sm ${
                        booking.status === "pending"
                          ? "badge-warning"
                          : booking.status === "confirmed"
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {booking.status}
                    </span>
                 </div>
                  <p >
                    <span className="font-medium">Date :</span> {booking.booking_for}
                  </p>
                  <p >
                    <span className="font-medium">Slots :</span> {booking.slot_times.join(" || ")}
                  </p>
                  <p >
                    <span className="font-medium">Total Price :</span> ৳{booking.total_price}
                  </p>
                </div>

                <button
                  onClick={() => handleCancel(booking._id)}
                  className="btn btn-error btn-outline btn-sm"
                >
                  <FaTrash className="mr-1" /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;