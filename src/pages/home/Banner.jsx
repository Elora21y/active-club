import React, { useState } from "react";
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
import {AnimatePresence, motion} from 'framer-motion'

const Banner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);
const slides = [
  {
    url: play,
    title: "Play Your Game, Own the Moment",
    subtitle: "Step into the court with confidence - feel the thrill, the energy, and the win.",
    buttonText: "Join Now",
    buttonLink: "/auth/register",
  },
  {
    url: activities,
    title: "Explore Dynamic Sports Activities",
    subtitle: "From tennis to badminton - find your game, meet new players, and keep the passion alive.",
    buttonText: "Explore Activities",
    buttonLink: "/courts",
  },
  {
    url: club,
    title: "Join the Club, Join the Community",
    subtitle: "More than just a game - build friendships, train together, and celebrate every match.",
    buttonText: "Become a Member",
    buttonLink: "/dashboard",
  },
  {
    url: court,
    title: "Book Your Court, Anytime, Anywhere",
    subtitle: "No waiting, no hassle - reserve your favorite court instantly and play on your schedule.",
    buttonText: "Book a Court",
    buttonLink: "/courts",
  },
];


  return (
    <div className="relative">
      {/* slider */}
    <Swiper
    onSwiper={setSwiperInstance}
  spaceBetween={30}
  effect={"fade"}
  navigation={{
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  }}
  modules={[EffectFade, Navigation, Autoplay]}
 autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="banner-swiper"
>
  {slides.map((slide, index) => (
    <SwiperSlide key={index}>
      <div
        className="text-white w-full h-[80vh]  md:h-[90vh] overflow-hidden flex flex-col justify-center items-center text-center px-4 sm:px-8"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(${slide.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 xl:space-y-5 text-sm sm:text-base">
          {/* title */}
           <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.h3
                      key={`title-${index}`}
                      initial={{ y: 60, opacity: 0, scale: 0.95 }}
                      animate={{ 
                        y: 0, 
                        opacity: 1, 
                        scale: 1,
                      }}
                      exit={{ y: -60, opacity: 0, scale: 0.95 }}
                      transition={{ 
                        duration: 0.7, 
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.2 
                      }}
                      className="baby text-[34px] sm:text-4xl md:text-5xl xl:text-6xl font-medium  md:font-semibold tracking-wide md:tracking-wider"
                    >
                      {slide.title}
                    </motion.h3>
                  )}
                </AnimatePresence>
                {/* context */}
         <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.p
                      key={`subtitle-${index}`}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.4,
                        ease: "easeOut" 
                      }}
                      className="text-md md:text-lg max-w-lg mx-auto"
                    >
                      {slide?.subtitle}
                    </motion.p>
                  )}
                </AnimatePresence>
         
         {/* Animated Button */}
                {slide.buttonText && slide.buttonLink && (
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.div
                        key={`button-${index}`}
                        initial={{ scale: 0.80, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.6,
                          stiffness: 200
                        }}
                      >
                        <Link
                          to={slide.buttonLink}
                          className="inline-block group"
                        >
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn border-0 rounded-full bg-linear-to-r from-sky-700 to-primary text-white hover:shadow-2xl transition-all duration-300"
                          >
                            <span className="flex items-center gap-2">
                              {slide.buttonText}
                              <motion.span
                                animate={{ 
                                  x: [0, 3, 0],
                                }}
                                transition={{ 
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatType: "loop"
                                }}
                              >
                                <MdOutlineArrowOutward size={20} />
                              </motion.span>
                            </span>
                          </motion.button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
   {/* Custom Pagination Indicator  */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <motion.div
            key={index}
             onClick={() => swiperInstance?.slideTo(index)}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: activeIndex === index ? 1.1 : 0.8,
              width: activeIndex === index ? "2rem" : "0.5rem"
            }}
            transition={{ duration: 0.3 }}
            className={`cursor-pointer h-2 rounded-full ${
              activeIndex === index 
                ? "bg-primary" 
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
