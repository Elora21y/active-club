import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ConfirmedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: confirmed = [], isLoading } = useQuery({
    queryKey: ["confirmedBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/confirm?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
//   console.log(confirmed)

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Confirmed Bookings</h2>
     {
      confirmed.length >0 ?
       <div className="overflow-x-auto rounded shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-100">
            <tr>
              <th>No.</th>
              <th>Court</th>
              <th>Session</th>
              <th>Date</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {confirmed.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.court_type}</td>
                <td>{booking.slot_times.length}</td>
                <td>{new Date(booking.booking_for).toLocaleDateString()}</td>
                <td className="text-success">Paid</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      :
      <p className="text-center text-gray-500 mt-10">No confirmed bookings found.</p>
     }
    </div>
  );
};

export default ConfirmedBookings;
