import Axios from "axios";

const api = Axios.create({
  baseURL: `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api`,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});

export default api;
