// Frontend/src/api/api.js
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    // If you prefer httpOnly cookie auth (sent by backend), enable withCredentials: true
    // withCredentials: true
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers = req.headers || {};
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
