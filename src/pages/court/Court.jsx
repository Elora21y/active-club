import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import UpdateCourt from "./UpdateCourt";


const Court = () => {
  const axiosSecure = useAxiosSecure();

  const [courtImage, setCourtImage] = useState("");


  const { data: courts = [], isLoading, refetch } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courts");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/courts/${id}`);
    //   console.log(res)
      if (res.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Court has been deleted.", "success");
        refetch();
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Courts</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Type</th>
              <th>Slots</th>
              <th>Price</th>
              <th>Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts.map((court, i) => (
              <tr key={court._id} className="">
                <td>{i + 1}</td>
                <td>
                  <img src={court.image} alt="court" className="w-16 h-10 object-cover rounded-lg" />
                </td>
                <td>{court.court_type}</td>
                <td>{court.slot_times.length}</td>
                <td>৳{court.price_per_session}</td>
                <td>{new Date(court.created_at).toLocaleDateString()}</td>
                <td className="flex gap-2 justify-center">
                    {/* edit button*/}
                      <button
                        className="text-secondary btn btn-xs border-primary/30 hover:bg-primary hover:text-white"
                        onClick={() =>
                          document
                            .getElementById(`my_modal_${court._id}`)
                            .showModal()
                        }
                      >
                        <RiEdit2Fill size={20} />
                      </button>
                      <dialog id={`my_modal_${court._id}`} className="modal">
                        <div className="modal-box">
                          <UpdateCourt court={court} setCourtImage={setCourtImage}  courtImage={courtImage} axiosSecure={axiosSecure} refetch={refetch} />

                          <form method="dialog" className="modal-backdrop">
                            <button className="btn btn-soft btn-error mt-3 ">
                              close
                            </button>
                          </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                  <button className="btn btn-xs btn-error btn-soft" onClick={() => handleDelete(court._id)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      
       
    </div>
  );
};

export default Court;
