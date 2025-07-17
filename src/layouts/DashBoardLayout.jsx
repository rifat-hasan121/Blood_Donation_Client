
import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, NavLink, Outlet } from "react-router";
import DashNav from "../DashBoard/Sidebar/Menu/DashNav";
import useAuth from "../Api/useAuth"
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const DashBoardLayout = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
   if (!user || !user.email) {
     setLoading(false);
     return; // user না থাকলে আর fetch করো না
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


  if (loading) {
    return <div className="text-center p-10 text-lg"> <LoadingSpinner/></div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 dark:bg-gray-700 dark:text-gray-200 text-gray-900 shadow-md transition-all duration-300">
        <div>
          <Link to="/">
            <div className="flex flex-col justify-center items-center bg-red-300 rounded-2xl my-12 mx-6 p-2">
              <img src={logo} alt="blood logo" className="max-w-20 max-h-20" />
            </div>
          </Link>

          <div className="grid grid-cols-1 justify-center items-center gap-4 mt-6 my-12 px-4 text-lg font-bold">
            {/* Admin Routes */}
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
                <NavLink
                  to="/dashboard/funds-details"
                  className={navLinkClass}
                >
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

            {/* Donor Routes */}
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

            {/* Volunteer Routes */}
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

            {/* Profile - সবার জন্য */}
            <NavLink to="/dashboard/profile" className={navLinkClass}>
              Profile
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-all duration-300">
        <DashNav />
        <Outlet />
      </main>
    </div>
  );
};

// NavLink styling
const navLinkClass = ({ isActive }) =>
  isActive
    ? "bg-blue-300 py-4 px-3 rounded-sm"
    : "transition duration-300 hover:bg-blue-200 py-4 px-3 rounded-sm";

export default DashBoardLayout;

