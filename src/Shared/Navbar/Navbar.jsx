import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { MdErrorOutline, MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineBloodtype } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiCommand, BiSolidDonateBlood } from "react-icons/bi";
import { TbLogin } from "react-icons/tb";
import { AiOutlineContacts, AiOutlineLogout } from "react-icons/ai";
import toast from "react-hot-toast";
import ThemeProvider from "../../Provider/ThemeProvider";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { IoHomeOutline } from "react-icons/io5";
import LoadingSpinner from "../LoadingSpinner";

const Navbar = () => {
  const { user, logout, loading } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

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
  const links = (
    <>
      <li>
        <NavLink className="flex gap-2 " to="/">
          <span>
            <IoHomeOutline />
          </span>
          <span>Home</span>
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink className="flex gap-2" to="/donor">
            <span>
              <MdOutlineBloodtype />
            </span>
            <span>Donor</span>
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink className="flex gap-2" to="/campaigns">
            <span>
              <MdErrorOutline />
            </span>
            <span>Campaigns</span>
          </NavLink>
        </li>
      )}

      <li>
        <NavLink className="flex gap-2" to="/about">
          <span>
            <MdErrorOutline />
          </span>
          <span>About</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="flex gap-2" to="/contact">
          <span>
            <AiOutlineContacts />
          </span>
          <span>Contact</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white text-black dark:bg-gray-700 dark:text-white fixed top-0 right-0 left-0 z-50">
      <div className="navbar w-full sm:w-11/12 mx-auto">
        <div className="navbar-start">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                className="w-14 h-14 rounded-full"
                src="https://i.ibb.co/1YR9g5j4/world-blood-donor-day-with-save-hand.png"
                alt=""
              />
              <h2 className=" hidden sm:text-xl md:flex text-2xl font-bold">
                Blood<span className="text-red-400">Donation</span>
              </h2>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 text-[20px] font-bold text-black dark:text-white">
            {links}
          </ul>
        </div>
        <div className="navbar-end space-x-4">
          <div>
            <ThemeProvider />
          </div>
          {/* User Profile and Dropdown */}
          <div className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 md:p-2 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
              <AiOutlineMenu className="md:hidden block" size={24} />
              <div className="hidden md:block">
                {user?.photoURL ? (
                  <img
                    className="rounded-full w-10 h-10 object-cover"
                    referrerPolicy="no-referrer"
                    src={user.photoURL}
                    alt="profile"
                  />
                ) : (
                  <FaUserCircle size={30} className="text-gray-500" />
                )}
              </div>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute rounded-lg border border-gray-200 shadow-md w-[50vw] md:w-[12vw] bg-white dark:bg-gray-600 dark:text-white overflow-hidden right-0 top-12 text-sm transition-all duration-200 ease-in-out">
                <div className="flex flex-col cursor-pointer">
                  {/* Profile Section (Only if user is logged in) */}
                  {user && (
                    <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-200 bg-neutral-50 dark:bg-neutral-400">
                      <img
                        className="rounded-full w-10 h-10 object-cover"
                        src={user.photoURL}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                      />
                      <p className="font-semibold text-gray-700">
                        {user?.name || user?.displayName || "Unknown User"}
                      </p>
                    </div>
                  )}

                  {user ? (
                    <>
                      {window.innerWidth < 640 && (
                        <NavLink
                          className="flex gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200"
                          to="/"
                        >
                          <span>
                            <IoHomeOutline />
                          </span>
                          <span>Home</span>
                        </NavLink>
                      )}

                      {window.innerWidth < 640 && (
                        <NavLink
                          className="flex gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200"
                          to="/about"
                        >
                          <span>
                            <MdErrorOutline />
                          </span>
                          <span>About</span>
                        </NavLink>
                      )}
                      {window.innerWidth < 640 && (
                        <NavLink
                          className="flex gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200"
                          to="/contact"
                        >
                          <span>
                            <AiOutlineContacts />
                          </span>
                          <span>Contact</span>
                        </NavLink>
                      )}
                      <NavLink
                        to="/dashboard/profile"
                        className="flex gap-2 items-center px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200"
                      >
                        <span>
                          <CgProfile />
                        </span>
                        <span>Profile</span>
                      </NavLink>
                      <NavLink
                        to="/dashboard"
                        className="flex gap-2 items-center px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200"
                      >
                        <span>
                          <MdOutlineDashboardCustomize />
                        </span>
                        <span> Dashboard</span>
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className="flex gap-2 items-center px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200"
                      >
                        <span>
                          <BiSolidDonateBlood />
                        </span>
                        <span> Donate</span>
                      </NavLink>
                      <div className="px-4 py-3 flex text-red-500 items-center gap-2 hover:bg-neutral-100 transition font-semibold cursor-pointer border-b border-gray-200">
                        <button className="flex gap-2 items-center" onClick={handleLogout}>
                          <span>
                            <AiOutlineLogout />
                          </span>
                          <span>Log Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {window.innerWidth < 640 && (
                        <NavLink
                          className="flex gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200"
                          to="/"
                        >
                          <span>
                            <IoHomeOutline />
                          </span>
                          <span>Home</span>
                        </NavLink>
                      )}

                      {window.innerWidth < 640 && (
                        <NavLink
                          className="flex gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200"
                          to="/about"
                        >
                          <span>
                            <MdErrorOutline />
                          </span>
                          <span>About</span>
                        </NavLink>
                      )}
                      {window.innerWidth < 640 && (
                        <NavLink
                          className="flex gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200"
                          to="/contact"
                        >
                          <span>
                            <AiOutlineContacts />
                          </span>
                          <span>Contact</span>
                        </NavLink>
                      )}
                      <NavLink
                        to="/login"
                        className="flex gap-2 items-center px-4 py-3 hover:bg-neutral-100 transition font-semibold border-b border-gray-200"
                      >
                        <span>
                          <TbLogin />
                        </span>
                        <span>Login</span>
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className=" flex gap-2 items-center px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                      >
                        <span>
                          <BiCommand />
                        </span>
                        <span> Sign Up</span>
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
