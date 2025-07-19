import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, NavLink, Outlet } from "react-router";
import DashNav from "../DashBoard/Sidebar/Menu/DashNav";
import useAuth from "../Api/useAuth";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const DashBoardLayout = () => {
  const { user, logout } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user || !user.email) {
      setLoading(false);
      return;
    }
   
    const fetchUserRole = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/users/role/${user.email}`,
          { withCredentials: true }
        );
        setUserRole(res.data.role);
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);
   const handleLogout = () => {
     logout()
       .then(() => {
         Swal.fire({
           title: `${user.displayName} log out Successfully!`,
           icon: "success",
           draggable: true,
         });
       })
       .catch((error) => {
         toast.error(`${error}`);
       });
   };

  if (loading) {
    return (
      <div className="text-center p-10 text-lg">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar */}
      <aside
        className={`bg-blue-100 dark:bg-gray-700 dark:text-gray-200 text-gray-900 shadow-md w-64 fixed md:static top-0 left-0 z-40 h-screen transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
      >
        {/* Cross Icon on mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl bg-gray-200 p-2 rounded-md"
          >
            <FaTimes />
          </button>
        </div>

        {/* Logo */}
        <Link to="/">
          <div className="flex flex-col justify-center items-center bg-red-300 rounded-2xl my-6 mx-6 p-2">
            <img src={logo} alt="blood logo" className="max-w-20 max-h-20" />
          </div>
        </Link>

        {/* Sidebar content */}
        <div className="flex flex-col justify-between h-[calc(100%-120px)]">
          {/* Nav Links */}
          <div className="grid grid-cols-1 gap-4 px-4 text-lg font-bold">
            {userRole === "admin" && (
              <>
                <NavLink className={navLinkClass} to="/dashboard" end>
                  Overview
                </NavLink>
                <NavLink to="/dashboard/manage-users" className={navLinkClass}>
                  Manage Users
                </NavLink>
                <NavLink
                  to="/dashboard/all-request-donations"
                  className={navLinkClass}
                >
                  All Blood Donation Requests
                </NavLink>
                <NavLink to="/dashboard/funds-details" className={navLinkClass}>
                  Funds
                </NavLink>
                <NavLink
                  to="/dashboard/content-management"
                  className={navLinkClass}
                >
                  Content Management
                </NavLink>
                <NavLink to="/dashboard/add-blog" className={navLinkClass}>
                  Publish Blog
                </NavLink>
              </>
            )}

            {userRole === "donor" && (
              <>
                <NavLink to="/dashboard/overview" className={navLinkClass}>
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/my-donation-request"
                  className={navLinkClass}
                >
                  My Donation Requests
                </NavLink>
                <NavLink to="/dashboard/add-request" className={navLinkClass}>
                  Create Donation Request
                </NavLink>
              </>
            )}

            {userRole === "volunteer" && (
              <>
                <NavLink className={navLinkClass} to="/dashboard" end>
                  Overview
                </NavLink>
                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className={navLinkClass}
                >
                  All Blood Donation Requests
                </NavLink>
                <NavLink to="/dashboard/add-blog" className={navLinkClass}>
                  Publish Blog
                </NavLink>
                <NavLink
                  to="/dashboard/content-management"
                  className={navLinkClass}
                >
                  Content Management
                </NavLink>
              </>
            )}
          </div>

          {/* Profile at bottom */}
          <div className="mt-auto px-4 mb-24">
            <hr className="border-gray-400 my-6" />
            <NavLink to="/dashboard/profile" className={navLinkClass}>
              Profile
            </NavLink>
            <div className="mt-6">
              <button onClick={handleLogout} className="px-3">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto h-screen">
        <main className="p-6setSidebarOpen={setSidebarOpen} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 min-h-screen">
          <DashNav setSidebarOpen={setSidebarOpen} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// NavLink style helper
const navLinkClass = ({ isActive }) =>
  isActive
    ? "bg-blue-300 py-4 px-3 rounded-sm"
    : "transition duration-300 hover:bg-blue-200 py-4 px-3 rounded-sm";

export default DashBoardLayout;
