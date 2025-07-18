import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Announcement = () => {
  const axiosSecure = useAxios();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editId, setEditId] = useState(null);

  // Fetch announcements
  const {
    data: announcements = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  // Add or update announcement
  const onSubmit = async (data) => {
    if (editId) {
      // update
      try {
        const res = await axiosSecure.patch(`/announcements/${editId}`, data);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Announcement updated.", "success");
          reset();
          setEditId(null);
          refetch();
          document.getElementById("announcement_modal").close();
        }
      } catch {
        Swal.fire("Error!", "Update failed.", "error");
      }
    } else {
      // add
      try {
        const res = await axiosSecure.post("/announcements", data);
        if (res.data.insertedId) {
          Swal.fire("Added!", "Announcement added.", "success");
          reset();
          refetch();
          document.getElementById("announcement_modal").close();
        }
      } catch {
        Swal.fire("Error!", "Add failed.", "error");
      }
    }
  };

  // Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this announcement?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/announcements/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Announcement deleted.", "success");
            refetch();
          }
        } catch {
          Swal.fire("Error!", "Delete failed.", "error");
        }
      }
    });
  };

  // Open modal for edit
  const handleEdit = (announcement) => {
    setEditId(announcement._id);
    setValue("title", announcement.title);
    setValue("message", announcement.message);
    document.getElementById("announcement_modal").showModal();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📢 Announcements</h2>
        <button
          onClick={() => {
            reset();
            setEditId(null);
            document.getElementById("announcement_modal").showModal();
          }}
          className="btn btn-primary btn-sm"
        >
          + New Announcement
        </button>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : announcements.length === 0 ? (
        <div className="text-center text-gray-400">No announcements yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead className="bg-base-100 text-base-content font-semibold">
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement, idx) => (
                <tr key={announcement._id}>
                  <td>{idx + 1}</td>
                  <td>{announcement.title}</td>
                  <td>{announcement.message}</td>
                  <td >
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="btn btn-sm text-blue-100 hover:text-blue-300 flex items-center gap-1"
                      >
                        <FaEdit size={20}/>
                      </button>

                      <button
                        onClick={() => handleDelete(announcement._id)}
                        className="btn btn-sm text-red-400 hover:text-red-200  flex items-center gap-1"
                      >
                        <FaTrash size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <dialog id="announcement_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {editId ? "Edit" : "Add"} Announcement
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("title", { required: true })}
              placeholder="Title"
              className="input input-bordered w-full"
            />
            <textarea
              {...register("message", { required: true })}
              placeholder="Message"
              className="textarea textarea-bordered w-full"
              rows={4}
            ></textarea>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                {editId ? "Update" : "Add"}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  document.getElementById("announcement_modal").close();
                  reset();
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Announcement;
