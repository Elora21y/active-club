// Payment.jsx
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PaymentForm from "./PaymentForm";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
  const { bookings_id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', bookings_id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${bookings_id}`);
      return res.data;
    },
  });
// console.log(booking)
  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm booking={booking} />
      </Elements>
    </div>
  );
};

export default Payment;
