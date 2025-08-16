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
import { FaUsers, FaTable, FaUserFriends } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../shared/Loading";

const AdminStats = () => {
  const axiosInstance = useAxios();

  const {
    data: stats = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/admin/stats");
      return res.data;
    },
  });

  const chartData = [
    { name: "Users", value: stats.totalUsers || 0, color: "#427D9D" },
    { name: "Courts", value: stats.totalCourts || 0, color: "#2D9596" },
    { name: "Members", value: stats.totalMembers || 0, color: "#493D9E" },
  ];

  const iconMap = {
    Users: <FaUsers className="text-4xl text-white/80" />,
    Courts: <FaTable className="text-4xl text-white/80" />,
    Members: <FaUserFriends className="text-4xl text-white/80" />,
  };

  if (isLoading) return <Loading/>

  if (isError) {
    return <div className="text-center text-red-600 text-lg font-semibold py-20">Failed to load admin stats.</div>;
  }

  return (
    <div className="px-5 py-10 max-w-6xl mx-auto">
      {/* Section Title */}
      <h2 className="text-3xl font-extrabold tracking-tight mb-10 relative inline-block">
         Overview
        <span className="block h-[4px] w-16 bg-gradient-to-r from-blue-400 to-purple-500 mt-2 rounded-full"></span>
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg text-white"
            style={{ backgroundColor: item.color }}
          >
            <div className="p-3 rounded-xl bg-white/10">
              {iconMap[item.name]}
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest opacity-90">{item.name}</p>
              <h3 className="text-3xl font-bold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-[400px] p-6 rounded-2xl shadow-inner">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
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
              fill="#205295"
              label={{ position: "top", fill: "#f9fafb" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStats;
