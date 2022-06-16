import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function useAuthorization() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useSelector(({ user: { data } }) => ({ data }));
  useEffect(() => {
    if (data) navigate(location.state?.from?.pathname || "/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}

export default useAuthorization;
