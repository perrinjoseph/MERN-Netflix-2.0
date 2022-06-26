import axios from "axios";

export const baseURL = "https://netflixmernclone.herokuapp.com/api";
const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 4000,
});

export default axiosClient;
