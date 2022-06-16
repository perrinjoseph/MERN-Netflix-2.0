import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { user } = useSelector(({ user }) => ({ user }));
  if (!user.data)
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  return children;
}

export default ProtectedRoute;
