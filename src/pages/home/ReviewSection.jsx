import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Shahriar Hasan",
    avatar: "https://i.ibb.co.com/CpycpSQw/man.webp",
    rating: 5,
    review:
      "Great court with proper facilities and well maintained environment. I really enjoyed playing here!",
    date: "27 July 2025",
    court_name: "Table Tennis",
    location: "Dhaka, Bangladesh",
  },
  {
    name: "Mahiya Islam",
    avatar: "https://i.ibb.co.com/xPCpnb9/man.jpg",
    rating: 4,
    review:
      "Good experience overall. The slots were perfectly organized and the staffs were very friendly.",
    date: "22 July 2025",
    court_name: "Badminton",
    location: "Chattogram, Bangladesh",
  },
  {
    name: "Ridwan Ahmed",
    avatar: "https://i.ibb.co.com/KjphP5fN/gardener10.jpg",
    rating: 5,
    review:
      "Amazing place to spend a sporty evening. Highly recommended for regular players!",
    date: "19 July 2025",
    court_name: "Table Tennis",
    location: "Dhaka, Bangladesh",
  },
  {
    name: "Sanjida Rahman",
    avatar: "https://i.ibb.co.com/Ldh3q5wK/gardener7.webp",
    rating: 4,
    review:
      "Clean court and proper lighting. I loved everything about the service. Will visit again!",
    date: "15 July 2025",
    court_name: "Basketball",
    location: "Sylhet, Bangladesh",
  },
  {
    name: "Fariha Islam",
    avatar: "https://i.ibb.co.com/Jw6XmYnj/gardener5.jpg",
    rating: 5,
    review:
      "The booking process was very smooth and the court was in excellent condition. Totally worth it!",
    date: "11 July 2025",
    court_name: "Badminton",
    location: "Dhaka, Bangladesh",
  },
];
const ReviewSection = () => {
  return (
    <section className="my-24">
      <div className="mb-6">
         <motion.h2
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl  font-bold"
          >
            Top <span className="text-primary">User Reviews</span>
          </motion.h2>
        {/* Animated Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-1 w-32 bg-gradient-to-r from-primary to-secondary rounded-full my-2 origin-left"
        />
        <p className="max-w-xl mt-2"
        data-aos="fade-right">
          Read what real users say about their bookings and in-court experience.
        </p>
      </div>

     {/* Swiper Container */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            prevEl: ".review-button-prev",
            nextEl: ".review-button-next",
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="relative pb-12"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div
                className="bg-gradient-to-br from-base-300 to-base-100 rounded-2xl p-6 h-68 relative overflow-hidden group  transition-colors duration-300"
              >
                {/* Quote Icon Background */}
                {/* <motion.div
                  initial={{ scale: 0, rotate: -45, opacity: 0 }}
                  whileInView={{ scale: 1, rotate: 0, opacity: 0.1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute top-4 right-4 text-primary"
                >
                  <FaQuoteRight className="text-6xl" />
                </motion.div> */}

                {/* Gradient Overlay on Hover */}
                {/* <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary to-secondary"
                /> */}

                {/* User Info */}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.03, rotate: 3 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-primary p-[2px] bg-gradient-to-br from-primary to-secondary">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </motion.div>

                  <div>
                    <h4 className="font-bold text-base flex items-center gap-2">
                      {review.name}
                    </h4>
                    <p className="text-xs opacity-70">
                      {review.location}
                    </p>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full inline-block mt-1">
                      {review.court_name}
                    </span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3 relative z-10">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                    >
                      <FaStar
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400"
                            : "fill-gray-400"
                        }`}
                      />
                    </div>
                  ))}
                  <span className="text-xs ml-1 opacity-70">
                    ({review.rating}.0)
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm leading-relaxed mb-4 relative z-10 opacity-90">
                  {review.review}
                </p>

                {/* Date */}
                <p className="text-xs opacity-60 relative z-10">
                  {review.date}
                </p>

                {/* Decorative Corner */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="absolute bottom-0 right-0 w-16 h-16 border-b-3 border-r-3 border-primary/20 rounded-br-2xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.9 }}
            className="review-button-prev btn btn-circle btn-primary btn-sm"
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.9 }}
            className="review-button-next btn btn-circle btn-primary btn-sm"
          >
            →
          </motion.button>
        </div>
      </div>

      {/* Custom Pagination Styling */}
      <style jsx>{`
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.3);
          opacity: 1;
          width: 8px;
          height: 6px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #14b8a6, #3b82f6);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default ReviewSection;
