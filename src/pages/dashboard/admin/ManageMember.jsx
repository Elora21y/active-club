import { useEffect, useState } from "react";
import { FaUsers, FaSearch, FaTimes } from "react-icons/fa";
import Loading from "../../../shared/Loading";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageMember = () => {
  const axiosSecure = useAxios();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosSecure.get("/users/members");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [axiosSecure]);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${id}`);
        console.log(res)
        if (res.data.deletedCount) {
          toast.success("User deleted successfully.");
          setUsers((prev) => prev.filter((u) => u._id !== id));
        } else {
          toast.error("User not found.");
        }
      } catch (err) {
        toast.error("Failed to delete user.");
        console.error(err);
      }
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2 text-primary">
        <FaUsers /> Manage Members
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

      {loading ? (
        <Loading />
      ) : users.length === 0 ? (
        <div className="text-center text-gray-400">No users found.</div>
      ) : (
        <div className="overflow-x-auto shadow-lg border border-base-300 rounded-lg">
          <table className="table table-zebra text-xs  md:text-sm">
            <thead className="bg-base-100 text-base font-semibold text-base-content">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.create_at
                      ? new Date(user.create_at).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
                    </button>
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

export default ManageMember;
