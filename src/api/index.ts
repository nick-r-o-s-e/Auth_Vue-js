import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
