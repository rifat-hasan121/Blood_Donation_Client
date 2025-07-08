import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Home/Home";
import Login from "../pages/ErrorPage/Login";
import Contact from "../Home/Contact";
import About from "../Home/About";

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
]);