import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";


const PrivetRoute = ({ children }) => {
  const { user2, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <p>loading....</p>;
  }
  if (user2 && user2.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivetRoute;
