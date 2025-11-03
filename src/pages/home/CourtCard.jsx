import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi";
import { FaTableTennis } from "react-icons/fa";
import { motion } from "framer-motion";

const CourtCard = ({ court , index}) => {
  return (
    <motion.div 
    initial={{y: 60 , opacity : 0.2}}
    whileInView={{y: 0 , opacity : 1}}
    transition={{duration : 0.5 , delay : 0.15* index}}
    viewport={{amount : 0.4 }}
    className="rounded-bl-3xl rounded-tr-3xl w-full max-w-sm group relative overflow-hidden">
      {/* Image */}

      <img
        src={court.image}
        alt={court.court_type}
        className="object-cover w-full h-full transition-all duration-500 group-hover:scale-103"
      />
       {/* Court Type Badge (Top) */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
          className="absolute md:hidden top-2 right-2 bg-primary/90 backdrop-blur-sm px-2 py-[6px] rounded-full"
        >
          <p className="text-white font-semibold text-xs">{court.court_type}</p>
        </motion.div>

      {/* Hover Content */}
      <div className="hidden absolute inset-0 md:flex flex-col items-center justify-center bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 ">
        <h3 className="text-lg font-semibold text-blue-900">
          {court.court_type}
        </h3>
        <p className="text-blue-900">৳ {court.price_per_session} per session</p>
      </div>
    </motion.div>
  );
};

const RecentCourts = () => {
  const axiosSecure = useAxios();
  // fetch all courts (latest first)
  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courts");
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // we will show only the first 3 cards
  return (
    <section className="my-24">
      {/* Title */}
      <div className="mb-6">
        {/* Title + Icon */}
        <div data-aos="fade-right" className="flex items-center gap-2">
          <motion.h2
            // initial={{ x: -50, opacity: 0 }}
            // whileInView={{ x: 0, opacity: 1 }}
            // viewport={{ once: false }}
            // transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-bold"
          >
            Our Recent <span className="text-primary">Courts</span>
          </motion.h2>
          {/* icon */}
          <motion.span
            animate={{
              rotate: [1, 10, -12, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <FaTableTennis className="text-primary text-3xl" />
          </motion.span>
        </div>

        {/* small underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ amount: 0.8 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-primary h-1 w-28 rounded-full mt-1 origin-left"
        />

        <p data-aos="fade-left" className="max-w-xl mt-4">
          Discover our recently added sports courts with updated pricing and
          timing. Choose your preferred court and enjoy your next session!
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center">
        {courts.slice(0, 3).map((court , index) => (
          <CourtCard key={court._id} court={court} index={index}/>
        ))}
      </div>

      {/* See More Button */}
      <motion.div className="mt-6" initial={{ scale: 0.9, opacity: 0.2 }}
      whileInView={{scale : 1 , opacity : 1}}
      transition={{duration:0.8}}>
        <Link
          to="/courts"
          className="btn bg-primary rounded-t-2xl rounded-br-2xl hover:scale-101 duration-500 transition-all px-6"
        >
          See More{" "}
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <HiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
};

export default RecentCourts;
