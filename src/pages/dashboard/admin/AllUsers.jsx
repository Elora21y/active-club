import {useState } from "react";
import { FaUsers, FaSearch, FaTimes } from "react-icons/fa";
import Loading from "../../../shared/Loading";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

const { data: users = [], refetch, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  },
});

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { mutate: updateRole } = useMutation({
    mutationFn: async ({ email, role }) => {
      return await axiosSecure.patch(`/users/role/${email}`, { role });
    },
    onSuccess: (res, { role }) => {
      if (res?.data?.modifiedCount > 0) {
        toast.success(
          role === "admin"
            ? "User promoted to Admin"
            : "Admin removed successfully"
        );
         refetch();
        queryClient.invalidateQueries(["users"]);
      } else {
        toast.error("No changes made to user role.");
      }
    },

    onError: () => {
      toast.error("Role update failed");
    },
  });
  if (isLoading) {
  return <Loading/>
}


  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2 text-primary">
        <FaUsers /> All Users
      </h2>

      <div className="flex items-center gap-2 mb-6 max-w-sm mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            className="input input-bordered w-full pl-10 pr-10"
            placeholder="Search by email or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          {searchQuery && (
            <FaTimes
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500"
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center text-gray-400">No users found.</div>
      ) : (
        <div className="overflow-x-auto shadow-lg border border-base-300 rounded-lg">
          <table className="table table-zebra text-xs  md:text-sm">
            <thead className="bg-base-100 text-base font-semibold text-base-content">
              <tr>
                <th>No.</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role || "user"}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() =>
                          updateRole({ email: user.email, role: "user" })
                        }
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() =>
                          updateRole({ email: user.email, role: "admin" })
                        }
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
