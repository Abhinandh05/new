import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Replace with your backend base URL
  withCredentials: true, // Ensures cookies are sent with requests
});

export default api;
