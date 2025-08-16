// PaymentForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = ({ booking }) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const navigate = useNavigate();

  const totalPrice = booking?.total_price - (booking?.total_price * discount/100 || 0);

  const handleCouponApply = () => {
    if (couponCode === "SPORT10") {
      setDiscount(10);
      toast.success("Coupon applied! for 10% Discount");
    } else {
      toast.error("Invalid coupon");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
const card =  elements.getElement(CardElement)
    if (card == null || !card) return;
    setProcessing(true);

    try {
        // valid the card
 const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      toast.error(methodError.message);
      setProcessing(false);
      return;
    }
    console.log('payment method', paymentMethod)
    const amount = totalPrice
        //create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amount,
        booking_id : booking._id
      });
      console.log('res form intent' ,res)
      const clientSecretData = res.data.clientSecret
//conformation payment 
      const result = await stripe.confirmCardPayment(clientSecretData, {
        payment_method: {
          card,
          billing_details: {
            name : user.displayname,
            email: booking?.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
            console.log(result)
            // send confirmed to DB
          const insetRes= await axiosSecure.post("/payments", {
            booking_id: booking._id,
            transactionId: result.paymentIntent.id,
            amount: totalPrice,
            email: user.email,
            paid_at_string: new Date().toISOString(),
            paid_at: new Date(),
          });
          console.log(insetRes)
// if(insetRes.data.insertResult.insertedId){
     toast.success("Payment successful!");
          navigate("/dashboard/confirmed-bookings");
// }
         
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4  p-6 rounded-xl shadow-lg">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="input input-bordered w-full"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          type="button"
          onClick={handleCouponApply}
          className="btn btn-accent"
        >
          Apply
        </button>
      </div>

      <input className="input  " value={booking?.email} readOnly />
      <input className="input " value={booking?.court_type} readOnly />
      <input className="input " value={booking?.slot_times?.join(", ")} readOnly />
      <input className="input " value={new Date(booking?.booking_at).toLocaleTimeString()} readOnly />
      <input className="input " value={`৳${totalPrice}`} readOnly />

      <div className="p-3 border rounded ">
        <CardElement options={{ hidePostalCode: true, style: {
      base: {
        color: '#91C8E4', // ✅ your desired text color (blue-700 for example)
        // '::placeholder': {
        //   color: '#9CA3AF', // optional: placeholder color (gray-400)
        // },
      },
      invalid: {
        color: '#DC2626', // optional: red-600 for error input
      },
    }, }} />
      </div>

      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={!stripe || !elements || processing}
      >
        {processing ? "Processing..." : `Pay ৳${totalPrice} Now`}
      </button>
    </form>
  );
};

export default PaymentForm;
