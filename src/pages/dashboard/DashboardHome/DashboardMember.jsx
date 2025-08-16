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
import { FaMoneyCheckAlt, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";

const DashboardMember = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Bookings
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

  // Payments
  const {
    data: payments = [],
    isLoading: isPaymentsLoading,
    isError: isPaymentsError,
  } = useQuery({
    queryKey: ["user-payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  // Confirmed Bookings
  const {
    data: confirmedBookings = [],
    isLoading: isConfirmedLoading,
    isError: isConfirmedError,
  } = useQuery({
    queryKey: ["confirmed-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/confirm?email=${user?.email}`);
      return res.data;
    },
  });

  const isLoading = isBookingsLoading || isPaymentsLoading || isConfirmedLoading;
  const isError = isBookingsError || isPaymentsError || isConfirmedError;

  const chartData = [
    {
      name: "Pending Bookings",
      value: bookings.length,
      color: "#427D9D",
    },
    {
      name: "Payments",
      value: payments.length,
      color: "#2D9596",
    },
    {
      name: "Confirmed",
      value: confirmedBookings.length,
      color: "#493D9E",
    },
  ];

  const iconMap = {
    Bookings: <FaBookOpen className="text-4xl text-white/80" />,
    Payments: <FaMoneyCheckAlt className="text-4xl text-white/80" />,
    Confirmed: <FaCheckCircle className="text-4xl text-white/80" />,
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="text-center text-red-600 text-lg font-semibold py-20">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="px-5 py-10 max-w-6xl mx-auto">
      {/* Section Title */}
      <h2 className="text-3xl font-extrabold tracking-tight mb-10 relative inline-block text-white">
        Member Dashboard
        <span className="block h-[4px] w-20 bg-gradient-to-r from-blue-400 to-green-400 mt-2 rounded-full"></span>
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-4 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg text-white"
            style={{ backgroundColor: item.color }}
          >
            <div className="p-3 rounded-xl bg-white/10">{iconMap[item.name]}</div>
            <div>
              <p className="text-sm uppercase tracking-widest opacity-90">
                {item.name}
              </p>
              <h3 className="text-xl font-bold">
                {item.value > 0 ? item.value : `No ${item.name}`}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
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
              fill="#205295"
              label={{ position: "top", fill: "#f9fafb" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardMember;
