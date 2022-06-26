import { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { authenticateUserThunk } from "../Redux/thunks";

function useAuthentication() {
  const [isLoading, setIsLoading] = useState(true);
  const [authorized, setAuthorized] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserAuthentication = async () => {
      const response = await dispatch(authenticateUserThunk());
      setAuthorized(response);
      setIsLoading(false);
    };
    getUserAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isLoading, authorized];
}

export default useAuthentication;
