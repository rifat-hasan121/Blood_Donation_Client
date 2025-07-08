import Navbar from "../Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      {/* Main content area */}
      <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
