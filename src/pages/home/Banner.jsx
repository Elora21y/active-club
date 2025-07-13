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

const Banner = () => {
  const slides = [
    {
      url: play,
      title: "Play Your Game, Own the Moment",
    },
    {
      url: activities,
      title: "Explore Dynamic Sports Activities",
    },
    {
      url: club,
      title: "Join the Club, Join the Community",
    },
    {
      url: court,
      title: "Book Your Court, Anytime Anywhere",
    },
  ];

  return (
    <>
      {/* slider */}
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        pagination={{ clickable: true }}
        navigation={ {
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4000 }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide>
            <div
              key={index}
              className={`text-white w-full h-[70vh] md:h-[90vh]  overflow-hidden flex flex-col justify-center items-center text-center 
              }`}
              style={{
                backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.5), rgba(0,0,0,0.28)) , url(${slide.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center max-w-sm sm:max-w-lg md:max-w-xl xl:max-w-2xl">
                {slide.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
