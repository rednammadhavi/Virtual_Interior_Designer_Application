import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  forgotPassword as apiForgotPassword,
  resetPassword as apiResetPassword,
} from "../api/auth";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await getCurrentUser();
          if (data?.data) {
            setUser(data.data);
            localStorage.setItem("user", JSON.stringify(data.data));
          } else {
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }
        }
      } catch (e) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Login
  const login = async (creds) => {
    try {
      const { data } = await apiLogin(creds);
      const { user: u, accessToken } = data?.data || {};
      if (accessToken) localStorage.setItem("token", accessToken);
      if (u) {
        setUser(u);
        localStorage.setItem("user", JSON.stringify(u));
      }
      toast.success("Logged in successfully");
      return true;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Login failed");
      return false;
    }
  };

  // Register
  const register = async (formData) => {
    try {
      const { data } = await apiRegister(formData);
      toast.success("Registered successfully! Please login.");
      return data;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Registration failed");
      throw e;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await apiLogout();
    } catch { }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out");
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    try {
      await apiForgotPassword(email);
      toast.success("Password reset link sent to your email");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to send reset link");
      throw e;
    }
  };

  // Reset Password
  const resetPassword = async (token, passwords) => {
    try {
      await apiResetPassword(token, passwords);
      toast.success("Password has been reset successfully");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to reset password");
      throw e;
    }
  };

  const value = useMemo(
    () => ({ user, setUser, login, register, logout, forgotPassword, resetPassword, loading }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
