import React, { useState, use } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { MdEmail, MdPhone, MdLocationPin, MdBloodtype } from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";

const UserProfile = () => {
  const { user } = use(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      bloodGroup: "",
    },
  });

  // modal open হলে dynamic value বসাও
  const handleEditClick = () => {
    reset({
      name: user?.displayName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      bloodGroup: user?.bloodGroup || "",
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    // TODO: Backend এ update request পাঠাও
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mt-6 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="relative">
        <img
          src="/banner.jpg"
          alt="banner"
          className="w-full h-40 object-cover rounded-t-xl"
        />
        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold">
          {user?.displayName || "Unknown User"}
        </h2>
        <div className="mt-2 flex justify-center gap-3">
          <span className="badge badge-error">donor</span>
          <span className="badge badge-success">active</span>
        </div>
      </div>

      {/* Profile Details (Only Text) */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="flex items-center gap-4">
          <MdEmail className="text-2xl text-rose-500" />
          <div>
            <p className="text-sm font-semibold">Email</p>
            <p className="text-base">{user?.email || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MdPhone className="text-2xl text-rose-500" />
          <div>
            <p className="text-sm font-semibold">Phone</p>
            <p className="text-base">{user?.phone || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MdLocationPin className="text-2xl text-rose-500" />
          <div>
            <p className="text-sm font-semibold">Address</p>
            <p className="text-base">{user?.address || "Not Provided"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MdBloodtype className="text-2xl text-rose-500" />
          <div>
            <p className="text-sm font-semibold">Blood Group</p>
            <p className="text-base">{user?.bloodGroup || "Unknown"}</p>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleEditClick}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiEdit2 /> Edit Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-6 rounded-lg w-full max-w-xl">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              {/* Email (always disabled) */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="input input-bordered w-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  disabled
                />
              </div>

              {/* Name */}
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="input input-bordered w-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="label">Phone</label>
                <input
                  type="text"
                  {...register("phone")}
                  className="input input-bordered w-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>

              {/* Address */}
              <div>
                <label className="label">Address</label>
                <input
                  type="text"
                  {...register("address")}
                  className="input input-bordered w-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="label">Blood Group</label>
                <input
                  type="text"
                  {...register("bloodGroup")}
                  className="input input-bordered w-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
