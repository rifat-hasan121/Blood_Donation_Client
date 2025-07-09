import { use } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { Link, useNavigate } from "react-router";

import logo from '../../assets/images/logo.png'
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const Sidebar = () => {
    const { user, logout } = use(AuthContext);
    const navigate = useNavigate();


   const handleLogout = () => {
     logout()
       .then(() => {
         Swal.fire({
           title: `${user.displayName} log out Successfully!`,
           icon: "success",
           draggable: true,
         });
           navigate('/')
           
           
       })
       .catch((error) => {
         toast.error(`${error}`);
       });
   };


 

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img src={logo} alt="logo" width="60" height="60" />
            </Link>
          </div>
        </div>

        <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200">
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div className="z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-red-200 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform">
        <div>
          <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-red-100 mx-auto">
            <Link to="/">
              <img src={logo} alt="logo" width="70" height="70" />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6"></div>
        </div>

        <div>
          <hr />

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
