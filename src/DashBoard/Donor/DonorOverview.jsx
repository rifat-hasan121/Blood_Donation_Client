import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { AuthContext } from "../../Provider/AuthProvider";
import {
  FaEdit,
  FaTrashAlt,
  FaClock,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { axiosSecure } from "../../Hooks/useAxiosSecure";

const DonorOverview = () => {
  const { user, loading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/donation-requests/email/${user.email}`)
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);


  if (loading) return <LoadingSpinner />;

  const latestRequests = requests.slice(0, 3);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
            <FaClock /> Pending
          </span>
        );
      case "inprogress":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
            <FaSpinner className="animate-spin-slow" /> In Progress
          </span>
        );

      case "done":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
            <FaCheckCircle /> Done
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="py-12 my-12 p-6 rounded-xl bg-white shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        Recent Donation Requests
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestRequests.length > 0 ? (
          latestRequests.map((req) => (
            <div
              key={req._id}
              className="p-5 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg bg-white hover:bg-gray-50 border-l-4 border-yellow-500"
            >
              <h3 className="text-xl font-semibold mb-3 text-red-500">
                {req.patientName}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="flex items-center">
                  <span className="font-medium text-gray-600">
                    Blood Group:
                  </span>
                  <span className="ml-2 font-bold">{req.bloodGroup}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium text-gray-600">Hospital:</span>
                  <span className="ml-2 font-bold">{req.hospitalName}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium text-gray-600">Date:</span>
                  <span className="ml-2 font-bold">
                    {new Date(req.date).toLocaleDateString()}
                  </span>
                </p>
                <div className="flex justify-between items-center">
                  {getStatusBadge(req.status)}
                  <div className="flex space-x-2">
                    <button
                      title="Edit"
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No donation requests found.</p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate("/dashboard/my-donation-request")}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
        >
          See All Requests
        </button>
      </div>
    </div>
  );
};

export default DonorOverview;
