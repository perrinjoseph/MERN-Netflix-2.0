import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Global/Components/Footer";

function PublicRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useSelector(({ user: { data } }) => ({
    data,
  }));

  useEffect(() => {
    const from = location.state?.from?.pathname || "/home";
    if (data) navigate(from, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data)
    return (
      <>
        <Outlet />
        <Footer />
      </>
    );
}

export default PublicRoute;
