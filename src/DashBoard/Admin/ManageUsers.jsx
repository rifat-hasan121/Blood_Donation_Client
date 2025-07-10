import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/all-users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  const filteredUsers =
    filter === "all" ? users : users.filter((user) => user.status === filter);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axiosSecure.put(`/users/status/${userId}`, { status: newStatus });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );

      toast.success(
        `User ${
          newStatus === "active" ? "unblocked" : "blocked"
        } successfully!`,
        { position: "top-center" }
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error changing status:", error);
      toast.error("Failed to change user status", { position: "top-center" });
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosSecure.put(`/users/role/${id}`, { role: newRole });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );

      toast.success(`User role changed to ${newRole}`, {
        position: "top-center",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("Failed to change user role", { position: "top-center" });
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight text-red-600 flex items-center">
          Manage Users
        </h2>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <label htmlFor="filter" className="mr-2 text-red-600">
              Filter by Status:
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-red-600"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-red-600 mt-5">Loading users...</p>
        ) : (
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">
                      Avatar
                    </th>
                    <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">
                      Role
                    </th>
                    <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b bg-red-100 text-red-600 text-left text-sm uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="px-5 py-5 border-b bg-red-50 text-sm">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="px-5 py-5 border-b bg-red-50 text-sm">
                        {user.name}
                      </td>
                      <td className="px-5 py-5 border-b bg-red-50 text-sm">
                        {user.email}
                      </td>
                      <td className="px-5 py-5 border-b bg-red-50 text-sm">
                        {user.role}
                      </td>
                      <td className="px-5 py-5 border-b bg-red-50 text-sm">
                        {user.status || "N/A"}
                      </td>
                      <td className="px-5 py-5 border-b bg-red-50 text-sm">
                        <button
                          className="px-4 py-2 bg-red-200 rounded text-red-600"
                          onClick={() => openModal(user)}
                        >
                          Actions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-red-200 rounded text-red-600"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-red-600">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 bg-red-200 rounded text-red-600"
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-1/2">
            <h2 className="text-xl font-semibold text-red-600">User Actions</h2>
            <p className="my-2">
              What would you like to do with {selectedUser.name}?
            </p>

            <div className="mt-4 flex justify-start gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() =>
                  handleStatusChange(
                    selectedUser._id,
                    selectedUser.status === "active" ? "blocked" : "active"
                  )
                }
              >
                {selectedUser.status === "active" ? "Block" : "Unblock"}
              </button>
              <button
                className="px-4 py-2 bg-yellow-600 text-white rounded"
                onClick={() => handleRoleChange(selectedUser._id, "volunteer")}
              >
                Make Volunteer
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => handleRoleChange(selectedUser._id, "admin")}
              >
                Make Admin
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
