import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaBookOpen, FaBullhorn } from "react-icons/fa";
import Loading from "../../../shared/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading: isBookingsLoading,
    isError: isBookingsError,
  } = useQuery({
    queryKey: ["user-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
  });

  const {
    data: announcements = [],
    isLoading: isAnnouncementsLoading,
    isError: isAnnouncementsError,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  const chartData = [
    {
      name: "Pending Bookings",
      value: bookings.length,
      color: "#9D44C0",
    },
    {
      name: "Announcements",
      value: announcements.length,
      color: "#5272F2",
    },
  ];

  const iconMap = {
    Bookings: <FaBookOpen className="text-4xl text-white/80" />,
    Announcements: <FaBullhorn className="text-4xl text-white/80" />,
  };

  if (isBookingsLoading || isAnnouncementsLoading) return <Loading />;

  if (isBookingsError || isAnnouncementsError) {
    return (
      <div className="text-center text-red-600 text-lg font-semibold py-20">
        Failed to load user stats.
      </div>
    );
  }

  return (
    <div className="px-5 py-10 max-w-6xl mx-auto">
      {/* Section Title */}
      <h2 className="text-3xl font-extrabold tracking-tight mb-10 relative inline-block text-white">
        My Activity
        <span className="block h-[4px] w-16 bg-gradient-to-r from-purple-400 to-blue-500 mt-2 rounded-full"></span>
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-4 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg text-white"
            style={{ backgroundColor: item.color }}
          >
            <div className="p-3 rounded-xl bg-white/10">
              {iconMap[item.name]}
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest opacity-90">
                {item.name}
              </p>
              <h3 className="text-3xl font-bold">
                {item.value > 0 ? item.value : "No " + item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-[400px] p-6 rounded-2xl shadow-inner ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#d1d5db" />
            <YAxis stroke="#d1d5db" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                color: "#f9fafb",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
              itemStyle={{ color: "#f9fafb" }}
              cursor={{ fill: "#6b7280", opacity: 0.2 }}
            />
            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              fill="#433878"
              label={{ position: "top", fill: "#f9fafb" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardUser;
