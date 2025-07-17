import { createBrowserRouter, Navigate, Outlet } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Home/Home";
import Login from "../pages/ErrorPage/Login";
import Contact from "../Home/Contact";
import About from "../Home/About";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Profile from "../DashBoard/Profile";
import AddBloodForm from "../Form/AddBloodForm";
import MyDonationRequests from "../DashBoard/Donor/MyDonationRequests";
import Registration from "../pages/Registration";
import DonationRequestsDetails from "../Home/DonationRequestsDetails";
import ManageUsers from "../DashBoard/Admin/ManageUsers";
import AdminDashboard from "../DashBoard/Admin/AdminDashboard";
import AllDonationRequests from "../DashBoard/Admin/AllDonationRequests";
import ContentManagement from "../DashBoard/Admin/ContentManagement";
import AddBlog from "../Home/AddBlog";
import { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import DonorOverview from "../DashBoard/Donor/DonorOverview";
import PrivateRoute from "./PrivateRoute";
import Payment from "../pages/pyments/Payment";
import FundsTable from "../DashBoard/Admin/FundsTable";

// Role Based Route Component
const RoleBasedRoute = ({ allowedRoles }) => {
  const { user, loading } = use(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "payment",
        Component: Payment,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "donation-request-details/:id",
        element: <DonationRequestsDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <Registration />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },

      // Admin Routes
      {
        element: <RoleBasedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "manage-users",
            element: (
              <PrivateRoute>
                <ManageUsers />
              </PrivateRoute>
            ),
          },
          {
            path: "all-request-donations",
            element: (
              <PrivateRoute>
                <AllDonationRequests />
              </PrivateRoute>
            ),
          },
        ],
      },

      // Donor Routes
      {
        element: <RoleBasedRoute allowedRoles={["donor"]} />,
        children: [
          {
            path: "overview",
            element: (
              <PrivateRoute>
                <DonorOverview />
              </PrivateRoute>
            ),
          },
          {
            path: "my-donation-request",
            element: (
              <PrivateRoute>
                <MyDonationRequests />
              </PrivateRoute>
            ),
          },
          {
            path: "add-request",
            element: (
              <PrivateRoute>
                <AddBloodForm />
              </PrivateRoute>
            ),
          },
        ],
      },

      // Shared Content Management Route for both admin and volunteer
      {
        element: <RoleBasedRoute allowedRoles={["admin", "volunteer"]} />,
        children: [
          {
            path: "content-management",
            element: (
              <PrivateRoute>
                <ContentManagement />
              </PrivateRoute>
            ),
          },
          {
            path: "funds-details",
            element: (
              <PrivateRoute>
               <FundsTable/>
              </PrivateRoute>
            ),
          },

          {
            path: "add-blog",
            element: (
              <PrivateRoute>
                <AddBlog />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/edit-blog/:id",
            element: <AddBlog />,
          },
        ],
      },

      // Volunteer Routes (excluding content-management, since shared above)
      {
        element: <RoleBasedRoute allowedRoles={["volunteer"]} />,
        children: [
          {
            path: "all-blood-donation-request",
            element: (
              <PrivateRoute>
                <AllDonationRequests />
              </PrivateRoute>
            ),
          },
        ],
      },

      // Common Profile Route
      {
        element: (
          <RoleBasedRoute allowedRoles={["admin", "donor", "volunteer"]} />
        ),
        children: [
          {
            path: "profile",
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);
