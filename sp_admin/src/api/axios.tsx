import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
const accessToken = Cookies.get("accessToken");

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: `${accessToken}`,
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export default instance;
