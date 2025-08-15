import React from "react"
import { createContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, login as apiLogin, register as apiRegister, logout as apiLogout } from "../api/auth";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (saved && token) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = async (creds) => {
    try {
      const { data } = await apiLogin(creds);
      const { user: u, accessToken } = data?.data || {};
      if (accessToken) localStorage.setItem("token", accessToken);
      if (u) {
        setUser(u);
        localStorage.setItem("user", JSON.stringify(u));
      }
      toast.success("Logged in");
      return true;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Login failed");
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const { data } = await apiRegister(formData);
      toast.success("Registered! Please login.");
      return data;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Registration failed");
      throw e;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch { }
    localStorage.clear();
    setUser(null);
    toast.info("Logged out");
  };

  const value = useMemo(() => ({ user, setUser, login, register, logout, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
