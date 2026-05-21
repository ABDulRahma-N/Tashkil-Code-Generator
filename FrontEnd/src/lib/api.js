import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7291/api",
});
export default api;
