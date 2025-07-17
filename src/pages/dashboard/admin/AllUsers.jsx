import { useEffect, useState } from "react";
import {  FaUsers, FaSearch, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../shared/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
   const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [axiosSecure]);
  
    const filteredUsers = users.filter((user) =>
    (user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase()))
  );


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

      {loading ? (
        <Loading/>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-400">No users found.</div>
      ) : (
        <div className="overflow-x-auto shadow-lg border border-base-300 rounded-lg">
          <table className="table table-zebra text-xs  md:text-sm">
            <thead className="bg-base-200 text-base font-semibold text-base-content">
              <tr>
                <th>No.</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined At</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td >{user.email}</td>
                  <td className="capitalize">{user.role || "user"}</td>
                  <td >
                    {user.create_at
                      ? new Date(user.create_at).toLocaleString()
                      : "N/A"}
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
