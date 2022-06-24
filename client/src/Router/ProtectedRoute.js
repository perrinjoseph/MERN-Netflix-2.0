import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../Global/Components/Footer";
import { navbarTypes } from "../Global/Components/Navbar/constants";
import Navbar from "../Global/Components/Navbar/Navbar";
import MovieInformation from "../Global/Components/MovieInformation";

function ProtectedRoute() {
  const location = useLocation();
  const { data, open } = useSelector(
    ({ user: { data }, movieMoreInfo: { open } }) => ({ data, open })
  );

  if (!data)
    return <Navigate to={"/login"} state={{ from: location }} replace />;

  return (
    <>
      <Navbar type={navbarTypes.HOME_SCREEN} />
      {open && <MovieInformation />}
      <Outlet />
      <Navbar type={navbarTypes.MOBILE_HOME} />
      <Footer />
    </>
  );
}

export default ProtectedRoute;
