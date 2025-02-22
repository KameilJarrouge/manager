import Axios from "axios";

const api = Axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});

export default api;
