import API from "./api";

export const register = (formData) => API.post("/auth/register", formData);

export const login = (payload) => API.post("/auth/login", payload);

export const logout = () => API.post("/auth/logout");

export const refresh = (refreshToken) => API.post("/auth/refresh-token", { refreshToken });

export const getCurrentUser = () => API.get("/auth/current-user");

export const updateDetails = (payload) => API.patch("/auth/update-details", payload);

export const updatePassword = (payload) => API.post("/auth/update-password", payload);

export const forgotPassword = (email) => API.post("/auth/forgot-password", { email });

export const resetPassword = (token, payload) => API.post(`/auth/reset-password/${token}`, payload);
