import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";

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
    <section className="my-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Top <span className="text-primary">User Reviews</span>
        </h2>
        <p className="max-w-xl mt-2">
          Read what real users say about their bookings and in-court experience.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="relative"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-primary/10 rounded-2xl p-5 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-primary p-[2px]">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-xs text-gray-500">
                    {review.location} • {review.court_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FaStar key={i} className="fill-yellow-500 w-5 h-5" />
                ))}
              </div>

              <p className="text-sm">{review.review}</p>
              <p className="text-xs text-gray-500 mt-3">{review.date}</p>
            </div>
          </SwiperSlide>
        ))}

        {/* Small navigation buttons */}
        <div className="swiper-button-prev !w-6 !h-6 !text-primary"></div>
        <div className="swiper-button-next !w-6 !h-6 !text-primary"></div>
      </Swiper>

      {/* Pagination dots styling */}
      <style>
        {`
          .swiper-pagination-bullet {
            background-color: #d1d5db; /* gray-300 */
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background-color: #14b8a6; /* primary color */
          }
        `}
      </style>
    </section>
  );
};

export default ReviewSection;
