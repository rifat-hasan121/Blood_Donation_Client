// import { createBrowserRouter } from "react-router";
// import MainLayout from "../layouts/MainLayout";
// import Home from "../Home/Home";
// import Login from "../pages/ErrorPage/Login";
// import Contact from "../Home/Contact";
// import About from "../Home/About";
// import DashBoardLayout from "../layouts/DashBoardLayout";
// import Profile from "../DashBoard/Profile";
// import AddBloodForm from "../Form/AddBloodForm";
// import MyDonationRequests from "../DashBoard/Donor/MyDonationRequests";
// import Registration from "../pages/Registration";
// import DonationRequestsDetails from "../Home/DonationRequestsDetails";
// import ManageUsers from "../DashBoard/Admin/ManageUsers";
// import AdminDashboard from "../DashBoard/Admin/AdminDashboard";
// import AllDonationRequests from "../DashBoard/Admin/AllDonationRequests";
// import ContentManagement from "../DashBoard/Admin/ContentManagement";
// import AddBlog from "../Home/AddBlog";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "about",
//         element: <About />,
//       },
//       {
//         path: "contact",
//         element: <Contact />,
//       },
//       {
//         path: "donation-request-details/:id",
//         element: <DonationRequestsDetails />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signUp",
//     element: <Registration />,
//   },
//   {
//     path: "/dashboard",
//     element: <DashBoardLayout />,
//     children: [
//       {
//         index: true,
//         element: <AdminDashboard />,
//       },
//       {
//         path: "all-blood-donation-request",
//         element: <AllDonationRequests />,
//       },
//       {
//         path: "content-management",
//         element: <ContentManagement />,
//       },
//       {
//         path: "content-management/add-blog",
//         element: <AddBlog />,
//       },
//       {
//         path: "profile",
//         element: <Profile />,
//       },
//       {
//         path: "add-request",
//         element: <AddBloodForm />,
//       },
//       {
//         path: "my-donation-request",
//         element: <MyDonationRequests />,
//       },
//       {
//         path: "manage-users",
//         element: <ManageUsers />,
//       },
//     ],
//   },
// ]);



// src/routes/router.jsx
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
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },

      // Admin Routes
      {
        element: <RoleBasedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "manage-users",
            element: <ManageUsers />,
          },
          {
            path: "all-request-donations",
            element: <AllDonationRequests />,
          },
          {
            path: "add-blog",
            element: <AddBlog />,
          },
        ],
      },

      // Donor Routes
      {
        element: <RoleBasedRoute allowedRoles={["donor"]} />,
        children: [
          {
            path: "overview",
            element: <DonorOverview />,
          },
          {
            path: "my-donation-request",
            element: <MyDonationRequests />,
          },
          {
            path: "add-request",
            element: <AddBloodForm />,
          },
        ],
      },

      // Shared Content Management Route for both admin and volunteer
      {
        element: <RoleBasedRoute allowedRoles={["admin", "volunteer"]} />,
        children: [
          {
            path: "content-management",
            element: <ContentManagement />,
          },
        ],
      },

      // Volunteer Routes (excluding content-management, since shared above)
      {
        element: <RoleBasedRoute allowedRoles={["volunteer"]} />,
        children: [
          {
            path: "all-blood-donation-request",
            element: <AllDonationRequests />,
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
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
