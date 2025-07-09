import React, { useState, useEffect, useContext } from "react";
import banner from "../assets/images/27577819_ravi24_may_8.jpg";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { MdEmail, MdPhone, MdLocationPin, MdBloodtype } from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import LoadingSpinner from "../Shared/LoadingSpinner";

const UserProfile = () => {
  const { user, updateUser, loading } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      bloodGroup: "",
    },
  });

  // ✅ Function to fetch user profile from backend
  const fetchUserProfile = async (email) => {
    setIsFetching(true);
    try {
      const res = await fetch(`http://localhost:3000/profile/${email}`);
      const data = await res.json();

      // Save user to global context
      updateUser(data);

      // Populate form with fetched data
      reset({
        name: data?.name || data?.displayName || "",
        email: data?.email || "",
        phone: data?.phone || "",
        address: data?.address || "",
        bloodGroup: data?.bloodGroup || "",
      });

      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile!");
      setIsFetching(false);
    }
  };

  // ✅ Fetch profile on mount
  useEffect(() => {
    if (user?.email) {
      fetchUserProfile(user.email);
    }
  }, [user?.email]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  // ✅ Save updated profile to backend
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`http://localhost:3000/profile/${data.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      toast.success("Profile updated successfully! 🎉");

      // Fetch again to refresh UI
      fetchUserProfile(data.email);

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed!");
    }
  };

  if (loading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mt-6 text-gray-800 dark:text-gray-200">
      {/* Banner */}
      <div className="relative">
        <img
          src={banner}
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
          {user?.name || user?.displayName || "Unknown User"}
        </h2>
        <div className="mt-2 flex justify-center gap-3">
          <span className="badge badge-error">donor</span>
          <span className="badge badge-success">active</span>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <ProfileRow
          icon={<MdEmail className="text-2xl text-rose-500" />}
          label="Email"
          value={user?.email || "N/A"}
        />
        <ProfileRow
          icon={<MdPhone className="text-2xl text-rose-500" />}
          label="Phone"
          value={user?.phone || "N/A"}
        />
        <ProfileRow
          icon={<MdLocationPin className="text-2xl text-rose-500" />}
          label="Address"
          value={user?.address || "Not Provided"}
        />
        <ProfileRow
          icon={<MdBloodtype className="text-2xl text-rose-500" />}
          label="Blood Group"
          value={user?.bloodGroup || "Unknown"}
        />
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
              <InputField label="Email" register={register("email")} disabled />
              <InputField label="Name" register={register("name")} />
              <InputField label="Phone" register={register("phone")} />
              <InputField label="Address" register={register("address")} />
              <InputField
                label="Blood Group"
                register={register("bloodGroup")}
              />

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

// ✅ Small reusable components
const ProfileRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    {icon}
    <div>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-base">{value}</p>
    </div>
  </div>
);

const InputField = ({ label, register, disabled = false }) => (
  <div>
    <label className="label">{label}</label>
    <input
      type="text"
      {...register}
      disabled={disabled}
      className="input input-bordered w-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    />
  </div>
);
