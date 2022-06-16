import { useEffect, useRef } from "react";
import axiosClient from "../Api/axiosConfig";

function useAxiosInterceptors(navigate) {
  /*
  We want the interceptor to forward all 403 forbidden 
  status to the login page but only when the user is using the application 
  not when the page is loaded because then it will keep going to login screen
  because the user is not authorized, therefore the user wont be able to visits
  pages like / , /accountSetup and other public routes.
  */

  useEffect(() => {
    axiosClient.interceptors.response.use(
      (data) => {
        return Promise.resolve(data);
      },
      (error) => {
        if (error.response.status === 403) {
          console.log("**Token Expired**");
          navigate("/login");
        }
        return Promise.reject(error.response);
      }
    );
  }, []);
}

export default useAxiosInterceptors;
