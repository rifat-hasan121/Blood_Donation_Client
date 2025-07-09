import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Home/Home";
import Login from "../pages/ErrorPage/Login";
import Contact from "../Home/Contact";
import About from "../Home/About";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Profile from "../DashBoard/Profile";

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
        path: '/about',
        Component: About,
      },
      {
        path: '/contact',
        Component:Contact
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },

  {
    path: '/dashboard',
    element: <DashBoardLayout />,
    children: [
      {
        path: '/dashboard/profile',
        Component: Profile
      },
    ]
},
]);