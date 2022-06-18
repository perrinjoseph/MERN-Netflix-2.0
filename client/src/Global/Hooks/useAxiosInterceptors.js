import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "../Api/axiosConfig";
import GLOBAL_ACTIONS from "../Redux/actions";

/*
  We want the interceptor to forward all 403 forbidden 
  status to the login page but only when the user is using the application 
  not when the page is loaded because then it will keep going to login screen
  because the user is not authorized, therefore the user wont be able to visits
  pages like / , /accountSetup and other public routes.
  */
function useAxiosInterceptors() {
  const dispatch = useDispatch();
  const appJustLoaded = useRef(true);

  useEffect(() => {
    axiosClient.interceptors.response.use(
      (data) => {
        return Promise.resolve(data);
      },
      (error) => {
        if (
          error?.response?.status === 403 &&
          appJustLoaded.current === false
        ) {
          console.log("**Token Expired**");
          dispatch(GLOBAL_ACTIONS.logoutUserSuccessAction());
        }
        return Promise.reject(error.response);
      }
    );
    appJustLoaded.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useAxiosInterceptors;
