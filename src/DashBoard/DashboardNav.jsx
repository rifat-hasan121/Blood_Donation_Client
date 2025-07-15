import React from "react";
import { NavLink } from "react-router";

const DashboardNav = ({ role }) => {
  let navItems = [];

  if (role === "admin") {
    navItems = [
      { to: "/dashboard", label: "Overview" },
      { to: "/dashboard/manage-users", label: "Manage Users" },
      {
        to: "/dashboard/all-request-donations",
        label: "All Request Donations",
      },
      { to: "/dashboard/content-management", label: "Content Management" },
      { to: "/dashboard/profile", label: "Profile" },
    ];
  } else if (role === "donor") {
    navItems = [
      { to: "/dashboard", label: "Overview" },
      { to: "/dashboard/my-donation-requests", label: "My Donation Requests" },
      {
        to: "/dashboard/create-donation-request",
        label: "Create Donation Request",
      },
      { to: "/dashboard/profile", label: "Profile" },
    ];
  } else if (role === "volunteer") {
    navItems = [
      { to: "/dashboard", label: "Overview" },
      {
        to: "/dashboard/all-request-donations",
        label: "All Request Donations",
      },
      { to: "/dashboard/content-management", label: "Content Management" },
      { to: "/dashboard/profile", label: "Profile" },
    ];
  }

  return (
    <nav className="flex flex-col space-y-2">
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-semibold"
              : "text-gray-700 hover:text-red-600"
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default DashboardNav;
