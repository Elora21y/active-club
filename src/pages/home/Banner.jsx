import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import play from "../../assets/banner/play.jpg";
import activities from "../../assets/banner/activities.jpg";
import club from "../../assets/banner/club.jpg";
import court from "../../assets/banner/court.jpg";
import { Link } from "react-router";
import { MdOutlineArrowOutward } from "react-icons/md";

const Banner = () => {
  const slides = [
  {
    url: play,
    title: "Play Your Game, Own the Moment",
    subtitle: "Step into a world where passion meets performance.",
    buttonText: "Join Now",
    buttonLink: "/auth/register",
  },
  {
    url: activities,
    title: "Explore Dynamic Sports Activities",
    subtitle: "From tennis to badminton, discover all the action.",
    buttonText: "Explore Activities",
    buttonLink: "/courts",
  },
  {
    url: club,
    title: "Join the Club, Join the Community",
    subtitle: "Connect, play, and grow with like-minded people.",
    buttonText: "Become a Member",
    buttonLink: "/dashboard",
  },
  {
    url: court,
    title: "Book Your Court, Anytime Anywhere",
    subtitle: "Your game, your schedule — reserve your court now.",
    buttonText: "Book a Court",
    buttonLink: "/courts",
  },
];

  return (
    <>
      {/* slider */}
    <Swiper
  spaceBetween={30}
  effect={"fade"}
  pagination={{ clickable: true }}
  navigation={{
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  }}
  modules={[EffectFade, Navigation, Pagination, Autoplay]}
  autoplay={{ delay: 4000 }}
>
  {slides.map((slide, index) => (
    <SwiperSlide key={index}>
      <div
        className="text-white w-full h-[80vh]  md:h-[90vh] overflow-hidden flex flex-col justify-center items-center text-center px-4 sm:px-8"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${slide.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base">
          <h3 className=" baby text-3xl sm:text-4xl lg:text-4xl xl:text-6xl font-medium md:font-semibold  md:tracking-widest">
            {slide.title}
          </h3>
            <p>
              {slide?.subtitle}
            </p>
         
          {slide.buttonText && slide.buttonLink && (
            <Link
              to={slide.buttonLink}
              className="btn border-0  rounded-full bg-linear-to-r from-sky-700 to-primary text-white hover:bg-opacity-90 transition"
            >
              <div className="flex items-center gap-1">
                {slide.buttonText}
              <MdOutlineArrowOutward size={20}/>
              </div>
            </Link>
          )}
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </>
  );
};

export default Banner;
