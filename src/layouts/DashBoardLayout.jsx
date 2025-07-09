import React from 'react';
import logo from '../assets/images/logo.png'
import { Link, NavLink, Outlet } from 'react-router';
import DashNav from '../DashBoard/Sidebar/Menu/DashNav';

const DashBoardLayout = () => {
    return (
      <div className="flex min-h-screen">
        <>
          {/* Sidebar */}
          <aside className="w-64 bg-blue-100 dark:bg-gray-700 dark:text-gray-200 text-gray-900 shadow-md transition-all duration-300">
            <div>
              <Link to="/">
                <div className="flex flex-col justify-center items-center bg-red-300 rounded-2xl my-12 mx-6 p-2">
                  <img
                    src={logo}
                    alt="blood logo"
                    className="max-w-20 max-h-20"
                  />
                </div>
              </Link>

              <div className="grid grid-cols-1 justify-center items-center gap-4 mt-6 my-12 px-4 text-lg font-bold">
                <NavLink
                  className="transition duration-300 hover:bg-blue-200 py-4 px-3 rounded-sm"
                  to="/dashboard"
                  end
                >
                  Overview
                </NavLink>

                <NavLink
                  className="transition duration-300 hover:bg-blue-200 py-4 px-3 rounded-sm"
                  to="posted-tasks"
                >
                  My Donation Requests
                </NavLink>
                <NavLink
                  className="transition duration-300 hover:bg-blue-200 py-4 px-3 rounded-sm"
                  to="add-task"
                >
                  Create Donation Request
                </NavLink>
              </div>
            </div>
            <div>
              <NavLink
                to="profile"
                className="transition duration-300 hover:bg-blue-200 py-4 px-3 rounded-sm"
              >
                Profile
              </NavLink>
            </div>
          </aside>
          <hr />
        </>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-all duration-300">
          <DashNav />
          <Outlet />
        </main>
      </div>
    );
};

export default DashBoardLayout;