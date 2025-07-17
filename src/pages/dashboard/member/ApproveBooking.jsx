import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const ApproveBooking = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()

  const { data: approvedBookings = [], refetch, isPending } = useQuery({
    queryKey: ['approved-bookings', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/approved?email=${user.email}`);
      // const res = await axiosSecure.get(`/bookings?email=${userEmail}&status=approved`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: 'Cancel this booking?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      if (res.status === 200) {
        Swal.fire('Cancelled!', 'Booking has been cancelled.', 'success');
        refetch();
      }
    } catch (error) {
      Swal.fire('Error', 'Could not cancel booking.', 'error');
      console.error(error);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-16">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4 shadow-md rounded-xl text-xs">
      <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
        Approved Bookings
      </h2>

      {approvedBookings.length === 0 ? (
        <p className="text-center text-gray-500">No approved bookings found.</p>
      ) : (
        <table className="table table-zebra text-xs">
          <thead className="uppercase">
            <tr>
              <th>No.</th>
              <th>Court</th>
              <th>Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedBookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.court_type || 'N/A'}</td>
                <td>{new Date(booking.booking_at).toLocaleDateString()}</td>
                <td>${booking.total_price}</td>
                
                  <td>
                <div className="flex gap-1 items-center">
                  <Link to={`/dashboard/payment/${booking._id}`}>
                    <button className="btn btn-xs btn-primary">Pay</button>
                  </Link>
                
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="btn btn-xs btn-error"
                  >
                    Cancel
                  </button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveBooking;
