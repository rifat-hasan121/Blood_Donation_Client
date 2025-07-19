import { Tooltip } from "react-tooltip";
import { AuthContext } from "../../../Provider/AuthProvider";
import { use } from "react";
import ThemeProvider from "../../../Provider/ThemeProvider";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { FaBars } from "react-icons/fa6";

const DashNav = ({ setSidebarOpen }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <nav className="flex items-center justify-between p-4 lg:px-12 bg-white shadow-md dark:bg-gray-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-rose-500 dark:text-red-800">
            Dashboard
          </h2>
          <h3>Welcome back to your dashboard</h3>
        </div>
        <div className="flex items-center gap-4">
          <ThemeProvider />
          {/* Hamburger only on small screen */}
          <button
            className="block md:hidden text-xl p-2 bg-gray-200 rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          {user && (
            <div className="relative hidden md:flex">
              <div className="cursor-pointer ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                <img
                  id="my-anchor-element"
                  src={user?.photoURL || "https://img.daisyui.com"}
                  className="rounded-full"
                  alt="avatar"
                />
                <Tooltip
                  anchorSelect="#my-anchor-element"
                  content={user?.name || user?.displayName || "Unknown User"}
                />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default DashNav;
