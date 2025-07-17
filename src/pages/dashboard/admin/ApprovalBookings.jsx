import { useQuery } from '@tanstack/react-query';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ApprovalBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch, isPending } = useQuery({
    queryKey: ['pending-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings');
      return res.data;
    },
  });

  const handleAction = async (id, status) => {
    const confirm = await Swal.fire({
      title: `Are you sure you want to ${status} this booking?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: status === 'approved' ? '#16a34a' : '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${status} it!`,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.put(`/bookings/${id}`, { status });
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: `Booking ${status} successfully!`,
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      Swal.fire('Error', 'Something went wrong', 'error');
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
        Pending Booking Requests
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No pending bookings found.</p>
      ) : (
        <table className="table table-zebra ">
          <thead className="  uppercase ">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Court</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id} className="hover text-xs">
                <td>{index + 1}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.court_type || 'N/A'}</td>
                <td>{new Date(booking.booking_at).toLocaleDateString()}</td>
                <td>
                  <span className="badge text-xs badge-warning">{booking.status}</span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-success btn-xs tooltip"
                    data-tip="Approve"
                    onClick={() => handleAction(booking._id, 'approved')}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="btn btn-error btn-xs tooltip"
                    data-tip="Reject"
                    onClick={() => handleAction(booking._id, 'rejected')}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovalBookings;
