import axios from "axios";

const API = axios.create({
    baseURL: "https://adoptocare.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});


export const PublicAPI = axios.create({
    baseURL: "https://adoptocare.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const AuthAPI = axios.create({
    baseURL: "https://adoptocare.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use((req) => {
  
    if (!req.url.endsWith("/login") && !req.url.endsWith("/register")) {
        const token = localStorage.getItem("token");
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
            console.log("[DEBUG] Axios: Added Authorization header for URL:", req.url);
        } else {
            console.log("[DEBUG] Axios: No token found in localStorage for URL:", req.url);
        }
    } else {
        console.log("[DEBUG] Axios: Skipping token for auth endpoint:", req.url);
    }
    return req;
});


AuthAPI.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
        console.log("[DEBUG] AuthAPI: Added Authorization header for URL:", req.url);
        console.log("[DEBUG] AuthAPI: Token:", token.substring(0, 20) + "...");
    } else {
        console.log("[DEBUG] AuthAPI: No token found in localStorage for URL:", req.url);
    }
    return req;
});

export default API;
