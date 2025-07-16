
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useAuth from "../../Api/useAuth";

const AllDonationRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  // Fetch all donation requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosSecure.get("/donation-requests");
        setRequests(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donation requests:", error);
        toast.error("Failed to load donation requests.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosSecure]);

  // Filter requests whenever filter changes
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(
        requests.filter((request) => request.status === statusFilter)
      );
    }
  }, [requests, statusFilter]);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastRequest = currentPage * pageSize;
  const indexOfFirstRequest = indexOfLastRequest - pageSize;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredRequests.length / pageSize);

  const deleteDonationRequest = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this donation request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/donation-requests/${id}`);
        toast.success("Donation request deleted successfully!");
        setRequests((prev) => prev.filter((request) => request._id !== id));
      } catch (err) {
        toast.error("Failed to delete the donation request!");
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosSecure.put(`/donation-requests/${id}`, { status: newStatus });
      setRequests((prev) =>
        prev.map((request) =>
          request._id === id ? { ...request, status: newStatus } : request
        )
      );
      toast.success(`Status updated to "${newStatus}"`);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Blood Donation Requests</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded"
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="InProgress">InProgress</option>
          <option value="Done">Done</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
              Recipient Name
            </th>
            <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
              Blood Group
            </th>
            <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
              Hospital
            </th>
            <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
              Requester Email
            </th>
            <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
              Status
            </th>
            {user?.role === "admin" && (
              <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentRequests.length > 0 ? (
            currentRequests.map((request) => (
              <tr key={request._id}>
                <td className="bg-gray-200 text-center dark:bg-gray-500 dark:text-white px-4 py-2">
                  {request.recipientName || "N/A"}
                </td>
                <td className="bg-gray-200 text-center dark:bg-gray-500 dark:text-white px-4 py-2">
                  {request.bloodGroup}
                </td>
                <td className="bg-gray-200 text-center dark:bg-gray-500 dark:text-white px-4 py-2">
                  {request.hospitalName}
                </td>
                <td className="bg-gray-200 text-center dark:bg-gray-500 dark:text-white px-4 py-2">
                  {request.requesterEmail}
                </td>
                <td className="bg-gray-200 text-center dark:bg-gray-500 dark:text-white px-4 py-2">
                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusUpdate(request._id, e.target.value)
                    }
                    className="bg-white dark:bg-gray-700 text-black dark:text-white rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </td>
                {user?.role === "admin" && (
                  <td className="bg-gray-200 text-center dark:bg-gray-500 dark:text-white px-4 py-2">
                    <button
                      onClick={() => deleteDonationRequest(request._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={user?.role === "admin" ? 6 : 5}
                className="bg-gray-200 dark:bg-gray-500 dark:text-white px-4 py-2 text-center"
              >
                No requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredRequests.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllDonationRequests;
