import { useEffect, useState } from "react";
import { FaCalendarCheck, FaSearch, FaTimes } from "react-icons/fa";
import Loading from "../../../shared/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosSecure.get("/bookings/confirm");
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [axiosSecure]);

  // Filtered bookings
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.court_type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2 text-primary">
        <FaCalendarCheck /> Manage Confirmed Bookings
      </h2>

      {/* Search Field */}
      <div className="flex items-center gap-2 mb-6 max-w-sm mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            className="input input-bordered w-full pl-10 pr-10"
            placeholder="Search by name or court title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          {searchQuery && (
            <FaTimes
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500"
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : filteredBookings.length === 0 ? (
        <div className="text-center text-gray-400">
          No confirmed bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg border border-base-300 rounded-lg">
          <table className="table table-zebra text-xs md:text-sm">
            <thead className="bg-base-200 text-base font-semibold text-base-content">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Court</th>
                <th>Slot</th>
                <th>Date</th>
                <th>Booked For</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.name}</td>
                  <td>{booking.court_type}</td>
                  <td>{booking.slot_times.length}</td>
                  <td>
                    {booking.booking_at
                      ? format(new Date(booking.booking_at), "dd MMM yyyy")
                      : "N/A"}
                  </td>
                  <td>
                    {format(
                      new Date(booking.booking_for),
                      "dd MMM yyyy"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
