// hooks/useUserRole.js
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUserRole = () => {
  const { user, loading } = useAuth(); // Get logged-in user
  const axiosSecure = useAxiosSecure();

  const {
    data: role = 'user',
    isPending,
    isError,
    refetch,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role;
    },
  });

  return { role, roleLoading: isPending || loading, isError, refetch };
};

export default useUserRole;
