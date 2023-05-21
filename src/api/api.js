import Axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "./token";
export const NETWORK_ERROR = 0;
export const AUTHENTICATION_ERROR_401 = 1;
export const AUTHORIZATION_ERROR_403 = 2;
export const SERVER_ERROR_500 = 3;
export const DUPLICATED_ENTRY_409 = 4;
export const BASE_URL = "http://localhost:3002";
const api = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
  // withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    let token = "Bearer " + String(getToken());
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
api.interceptors.response.use(null, (error) => {
  // console.log(error);
  if (error?.message === "Network Error") {
    return { errorCode: NETWORK_ERROR };
  }
  if (error?.response?.status === 403) {
    return { errorCode: AUTHORIZATION_ERROR_403 };
  } else if (error?.response?.status === 401) {
    return { errorCode: AUTHENTICATION_ERROR_401 };
  } else if (error?.response?.status === 500) {
    return { errorCode: SERVER_ERROR_500 };
  } else if (error?.response?.status === 409) {
    return { errorCode: DUPLICATED_ENTRY_409 };
  }
});

export default api;
