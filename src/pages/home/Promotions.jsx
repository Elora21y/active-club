import { FaPercentage, FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
import couponImg from "../../assets/coupon.png"; // Replace with your actual path
import SectionTitle from "../../shared/SectionTitle";

const promotions = [
  {
    code: "SPORT10",
    discount: 10,
    description: "Enjoy 10% off on sports gear rentals!",
  },
  {
    code: "CLUB15",
    discount: 15,
    description: "15% off for club members on all sessions.",
  },
  {
    code: "WEEKEND20",
    discount: 5,
    description: "Weekend bookings? Grab 5% off instantly!",
  },
];

const copyToClipboard = (code) => {
  navigator.clipboard.writeText(code);
  toast.success(`Coupon "${code}" copied!`);
};

const Promotions = () => {
  return (
    <section id="promotions">
      <SectionTitle title={"Coupons"} />

      <div className="flex flex-col md:flex-row items-center  justify-around">
        {/* Left Column - Coupon Image */}
        <div className="hidden  md:flex flex-col justify-center items-center">
          <img
            src={couponImg}
            alt="Coupon Promotion"
            className="object-contain md:w-4/6"
          />
          <p className=" text-center text-xs max-w-sm leading-4">
            Unlock exclusive discounts with our special promo codes!
            these codes to save more and play more. Offers are updated
            regularly—don’t miss out on the latest deals!
          </p>
        </div>

        {/* Right Column - Coupon Cards */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-full shadow-md p-6 flex justify-between items-start"
            >
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                    {promo.code}
                  </h3>
                  <span className="btn btn-xs text-white bg-green-700  rounded-lg shadow ">
                    {promo.discount}% OFF
                  </span>
                </div>
                <p className="text-xs">{promo.description}</p>
              </div>

              {/* Right Copy Button */}
              <button
                onClick={() => copyToClipboard(promo.code)}
                className="btn btn-xs btn-outline btn-primary"
              >
                <FaCopy className="mr-1" />
                Copy Code
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
