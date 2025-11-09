import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BookCourtModal from "./BookCourtModal";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../../shared/Loading";
import useAxios from "../../hooks/useAxios";
import SectionTitle from "../../shared/SectionTitle";
import { FaSearch, FaFilter, FaClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";

const Courts = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [courtTypeFilter, setCourtTypeFilter] = useState("");
  const [sortOption, setSortOption] = useState("default");


  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courts");
      return res.data;
    },
  });

  const handleBookNow = (_id) => {
    if (!user) {
      return navigate("/auth/login", { state: location.pathname });
    }
    document.getElementById(`booking_modal_${_id}`).showModal();
  };

  const filteredCourts = courts.filter((court) => {
    const matchesSearch =
      court.court_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (court.location &&
        court.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPrice =
      !priceFilter || court.price_per_session <= parseInt(priceFilter);
    const matchesType =
      !courtTypeFilter || court.court_type === courtTypeFilter;

    return matchesSearch && matchesPrice && matchesType;
  });

  const sortedCourts = [...filteredCourts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price_per_session - b.price_per_session;
      case "price-high":
        return b.price_per_session - a.price_per_session;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const formatTimeSlots = (slots) => {
    return slots;
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 lg:py-36 xl:py-40">
      <div className="text-center mb-16" data-aos="fade-down">

      <SectionTitle title={"Available"} />
      </div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 rounded-lg"
        data-aos="fade-down"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex-grow"
          >
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by court type..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2 text-xs md:text-sm"
          >
            <div className="dropdown dropdown-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
                role="button"
                className="btn btn-sm md:btn-md bg-transparent border border-primary cursor-pointer"
              >
                <FaFilter className="mr-2" /> Filters
              </motion.div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-42 mt-2"
              >
                <li>
                  <select
                    className="select select-bordered bg-base-100 w-full max-w-xs"
                    value={courtTypeFilter}
                    onChange={(e) => setCourtTypeFilter(e.target.value)}
                  >
                    <option className="bg-base-100" value="">
                      All Court Types
                    </option>
                    {[...new Set(courts.map((court) => court.court_type))].map(
                      (type) => (
                        <option className="bg-base-100" key={type} value={type}>
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </li>
                <li className="mt-2">
                  <select
                    className="select select-bordered bg-base-100 w-full max-w-xs"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option className="bg-base-100" value="">
                      Any Price
                    </option>
                    <option className="bg-base-100" value="500">
                      Under ৳500
                    </option>
                    <option className="bg-base-100" value="1000">
                      Under ৳1000
                    </option>
                    <option className="bg-base-100" value="1500">
                      Under ৳1500
                    </option>
                  </select>
                </li>
              </ul>
            </div>

            <div className="dropdown dropdown-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
                role="button"
                className="btn btn-sm md:btn-md bg-transparent border border-primary cursor-pointer"
              >
                Sort
              </motion.div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48 mt-2"
              >
                <li>
                  <button onClick={() => setSortOption("default")}>
                    Default
                  </button>
                </li>
                <li>
                  <button onClick={() => setSortOption("price-low")}>
                    Price: Low to High
                  </button>
                </li>
                <li>
                  <button onClick={() => setSortOption("price-high")}>
                    Price: High to Low
                  </button>
                </li>
                {courts.some((c) => c.rating) && (
                  <li>
                    <button onClick={() => setSortOption("rating")}>
                      Highest Rating
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-4 flex justify-between items-center"
        data-aos="fade-up"
      >
        <div className="text-sm text-gray-500">
          Showing {sortedCourts.length} of {courts.length} courts
        </div>
        {sortedCourts.length > 0 && (
          <div className="text-sm">
            Sorted by:{" "}
            {sortOption === "price-low"
              ? "Price (Low to High)"
              : sortOption === "price-high"
              ? "Price (High to Low)"
              : sortOption === "rating"
              ? "Rating"
              : "Default"}
          </div>
        )}
      </motion.div>

      {/* Courts Grid */}
      <AnimatePresence mode="wait">
        {sortedCourts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-semibold">
              No courts found matching your criteria
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-ghost mt-4"
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("");
                setCourtTypeFilter("");
                setSortOption("default");
              }}
            >
              Clear all filters
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedCourts.map((court, index) => (
              <motion.div
                key={court._id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="bg-base-100 shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition-all flex flex-col border border-base-200"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={court.image}
                    alt={court.court_type}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Court+Image";
                    }}
                  />
                </div>

                <div className="p-4 flex flex-col gap-3 flex-grow">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-between items-start"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-secondary">
                      {court.court_type}
                    </h3>
                    <div className="badge badge-primary text-xs sm:text-sm">
                      ৳{court.price_per_session}/session
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 }}
                    className="mt-2"
                  >
                    <p className="font-semibold mb-1 flex items-center">
                      <FaClock className="mr-1" /> Available Sessions:
                    </p>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                      {formatTimeSlots(court.slot_times).map((slot, idx) => (
                        <motion.span
                          key={idx}
                          className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                        >
                          {slot}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <div className="mt-auto pt-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn btn-primary w-full"
                      onClick={() => handleBookNow(court._id)}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>

                <dialog id={`booking_modal_${court._id}`} className="modal">
                  <div className="modal-box max-w-3xl">
                    <BookCourtModal
                      user={user}
                      court={court}
                      selectedSlots={selectedSlots}
                      setSelectedSlots={setSelectedSlots}
                      bookingDate={bookingDate}
                      setBookingDate={setBookingDate}
                    />
                    <div className="modal-action">
                      <button 
                        className="btn btn-soft btn-error"
                        onClick={() => document.getElementById(`booking_modal_${court._id}`).close()}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                  <div 
                    className="modal-backdrop"
                    onClick={() => document.getElementById(`booking_modal_${court._id}`).close()}
                  >
                    <button></button>
                  </div>
                </dialog>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courts;