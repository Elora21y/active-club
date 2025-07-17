import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaMoneyCheckAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApproveBooking = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ["approvedBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        user?.email
          ? `/bookings?email=${user.email}`
          : "/bookings"
      );
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this approved booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Cancelled", "Booking has been cancelled.", "success");
        refetch();
      }
    }
  };

  const handlePayment = (booking) => {
    // You can integrate Stripe or redirect here
    Swal.fire("Coming Soon", "Payment system will be integrated.", "info");
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
        <td>Blue</td>
        <td>Blue</td>
      
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>
  );
};

export default ApproveBooking;
