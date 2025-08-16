import {  useState } from "react";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit, FaGift } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();

  const [editingCoupon, setEditingCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

 const handleAddCoupon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const code = form.code.value;
    const discount = parseFloat(form.discount.value);

    try {
      const res = await axiosSecure.post("/coupons", { code, discount });
      if (res.data.insertedId) {
        toast.success("Coupon added");
        form.reset();
        refetch();
      }
    } catch (error) {
        console.log(error)
      toast.error("Add failed");
    }
  };

  const handleDeleteCoupon = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/coupons/${id}`);
        // console.log(res)
        if (res.data.result.deletedCount > 0) {
          Swal.fire("Deleted!", "Coupon has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        console.log(error)
        Swal.fire("Failed!", "Delete operation failed.", "error");
      }
    }
  };

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCoupon = {
      code: form.code.value,
      discount: parseFloat(form.discount.value),
    };

    try {
      const res = await axiosSecure.patch(`/coupons/${editingCoupon._id}`, updatedCoupon);
    //   console.log(res)
      if (res.data.result.modifiedCount > 0) {
        toast.success("Coupon updated successfully!");
        setIsModalOpen(false);
        setEditingCoupon(null);
        refetch()
      }
    } catch (error) {
      toast.error("Update failed");
      console.log(error)
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-semibold text-center mb-6 flex justify-center items-center gap-2 text-primary">
        <FaGift /> Manage Coupons
      </h2>

      {/* Add Coupon Form */}
      <form
        onSubmit={handleAddCoupon}
        className="max-w-md mx-auto bg-base-100 p-4 rounded-lg shadow mb-8 space-y-4"
      >
        <div>
          <label className="label">Coupon Code</label>
          <input
            type="text"
            name="code"
            required
            placeholder="e.g. SAVE20"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Discount (%)</label>
          <input
            type="number"
            name="discount"
            required
            min={1}
            max={100}
            placeholder="e.g. 20"
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Coupon
        </button>
      </form>

      {/* All Coupons Table */}
     
        <div className="overflow-x-auto shadow border border-base-300 rounded-lg">
          <table className="table table-zebra text-sm">
            <thead className="bg-base-100 text-base font-semibold text-base-content">
              <tr>
                <th>No</th>
                <th>Code</th>
                <th>Discount (%)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={coupon._id}>
                  <td>{index + 1}</td>
                  <td className="uppercase">{coupon.code}</td>
                  <td>{coupon.discount}%</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => {
                        setEditingCoupon(coupon);
                        setIsModalOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteCoupon(coupon._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      

      {/* Edit Modal */}
      {isModalOpen && editingCoupon && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-center text-primary">
              Update Coupon
            </h3>
            <form
              onSubmit={handleUpdateCoupon}
              className="space-y-4"
            >
              <div>
                <label className="label">Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  defaultValue={editingCoupon.code}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  defaultValue={editingCoupon.discount}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="modal-action flex justify-between">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCoupon(null);
                  }}
                >
                  Cancel
                </button>
                <button
                 type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCoupons;
