import { useEffect, useState } from "react";

import { format } from "date-fns";
import { FaMoneyCheckAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // assuming your context provides user

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get(`/payments?email=${user?.email}`);
        setPayments(res.data);
      } catch (error) {
        console.error("Failed to fetch payments", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchPayments();
  }, [axiosSecure, user?.email]);

  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2 text-primary">
        <FaMoneyCheckAlt className="text-xl" /> Payment History
      </h2>

      {loading ? (
        <div className="text-center py-10">
          <span className="loading loading-bars loading-lg text-primary" />
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center text-gray-500">No payment records found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-base-300  text-xs">
          <table className="table table-zebra ">
            <thead className="bg-base-100 text-base font-semibold text-base-content">
              <tr>
                <th>No</th>
                <th>Transaction ID</th>
                <th>Amount (৳)</th>
                <th>Paid At</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.transactionId}</td>
                  <td>৳{payment.amount}</td>
                  <td >
                    {format(new Date(payment.paid_at), "PPPp")}
                  </td>
                  <td >{payment.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
