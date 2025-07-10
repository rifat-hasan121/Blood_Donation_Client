import { createBrowserRouter } from "react-router";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "donation-request-details/:id",
        element: <DonationRequestsDetails />,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signUp",
    Component: Registration,
  },

  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: "/dashboard",
        Component: AdminDashboard
      },
      {
        path: "/dashboard/all-blood-donation-request",
        Component:AllDonationRequests
      },
      {
        path:"/dashboard/content-management",
        element: <ContentManagement />
      },
      {
        path: "/dashboard/content-management/add-blog",
        element:< AddBlog />
    },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
      {
        path: "/dashboard/add-request",
        Component: AddBloodForm,
      },

      {
        path: "/dashboard/My-donation-request",
        element: <MyDonationRequests />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers />,
      },
    ],
  },
]);