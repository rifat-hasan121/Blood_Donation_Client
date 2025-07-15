import { Tooltip } from "react-tooltip";
import { AuthContext } from "../../../Provider/AuthProvider";
import { use } from "react";
import ThemeProvider from "../../../Provider/ThemeProvider";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const DashNav = () => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800">
        <div>
          <h3 className="text-2xl md:text-4xl font-bold flex items-center gap-2">
            Welcome{" "}
            <span className="text-primary">{user?.displayName || "User"}</span>
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <ThemeProvider />
          <div>
            <div className="relative"></div>
          </div>
          <div>
            {user && (
              <div className="relative hidden md:flex">
                <div
                 
                  className="cursor-pointer ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2"
                >
                  <img
                    id="my-anchor-element"
                    src={user?.photoURL || "https://img.daisyui.com"}
                    className="rounded-full"
                    alt="avatar"
                  />
                  <Tooltip
                    anchorSelect="#my-anchor-element"
                    content={`${user?.displayName || "User"}`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashNav;
