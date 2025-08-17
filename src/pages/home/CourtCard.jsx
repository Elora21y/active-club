import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi";
import { FaTableTennis } from "react-icons/fa";

const CourtCard = ({ court }) => {
  return (
    <div className="rounded-bl-3xl rounded-tr-3xl w-full max-w-sm group relative overflow-hidden">
      {/* Image */}
 
        <img
          src={court.image}
          alt={court.court_type}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-103"
        />

        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/70 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-lg font-semibold text-accent">
            {court.court_type}
          </h3>
          <p className="text-accent">৳ {court.price_per_session} per  session</p>
        </div>
   
    </div>
  );
};


const RecentCourts = () => {
    const axiosSecure = useAxios()
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
  <div className="flex items-center gap-2">
    <h2 className="text-3xl font-bold">
      Our Recent <span className="text-primary">Courts</span>
    </h2>
    {/* icon */}
  <FaTableTennis className="text-primary text-3xl" />
  </div>

  {/* small underline */}
  <div className="bg-primary h-[3px] w-24 rounded-full mt-1"></div>

  <p className="max-w-xl mt-4">
    Discover our recently added sports courts with updated pricing and timing.
    Choose your preferred court and enjoy your next session!
  </p>
</div>


      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center">
        {courts.slice(0, 3).map((court) => (
          <CourtCard key={court._id} court={court} />
        ))}
      </div>

      {/* See More Button */}
      <div className="mt-6">
        <Link
          to="/courts"
          className="btn bg-primary rounded-t-2xl rounded-br-2xl hover:scale-101 duration-500 transition-all"
        >
          See More <HiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default RecentCourts;
