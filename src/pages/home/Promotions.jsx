import { FaPercentage, FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
import couponImg from "../../assets/coupon.png"; // Replace with your actual path
import SectionTitle from "../../shared/SectionTitle";
import { motion } from "framer-motion";

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
<div className="hidden md:flex flex-col justify-center items-center">
  <div className="relative overflow-hidden inline-block">
    <img
      data-aos="fade-right"
      src={couponImg}
      alt="Coupon Promotion"
      className="object-contain w-full max-w-md mx-auto"
    />
    
    {/* Diagonal Shine Effect (Top-Left to Bottom-Right) */}
    <motion.div
      initial={{ x: "-150%", y: "-150%" }}
      animate={{ 
        x: "150%", 
        y: "150%",
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatDelay: 4,
        ease: "easeInOut",
      }}
      viewport={{amount : 0.1}}
      className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/20 to-transparent w-[200%] h-[200%] -rotate-12 pointer-events-none"
      style={{
        transform: 'translateX(-150%) translateY(-150%) rotate(-12deg)',
      }}
    />
  </div>
  
  <p 
    data-aos="fade-up" 
    data-aos-delay="200" 
    className="text-center text-xs max-w-sm leading-4 mt-4"
  >
    Unlock exclusive discounts with our special promo codes!
    Use these codes to save more and play more. Offers are updated
    regularly - don't miss out on the latest deals!
  </p>
</div>

        {/* Right Column - Coupon Cards */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {promotions.map((promo, index) => (
            <div
            data-aos="fade-left"
            data-delay={700 * index}
              key={index}
              className="bg-[#0F3460] rounded-full shadow-md p-6 flex justify-between items-start"
            >
              {/* Left Content */}
              <div>
                <div className="flex items-start gap-2">
                  <h3 className="sm:text-lg font-bold flex items-start gap-2 ">
                    {promo.code}
                  </h3>
                  <span className="btn btn-xs border-0 text-white bg-green-700  rounded-lg shadow ">
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
                Code
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
