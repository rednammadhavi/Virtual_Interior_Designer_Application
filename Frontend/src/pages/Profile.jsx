import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getCurrentUser, updateDetails, updatePassword } from "../api/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { User, AtSign, Mail, Lock, Edit2, Save, X, Eye, EyeOff } from "lucide-react";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [mode, setMode] = useState("view"); // "view", "edit", "password"
  const [form, setForm] = useState({ fullName: "", username: "" });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState({ oldPassword: false, newPassword: false, confirmPassword: false });
  const [loading, setLoading] = useState(false);

  const loadProfile = async () => {
    try {
      const { data } = await getCurrentUser();
      setProfile(data.data);
      setForm({
        fullName: data.data.fullName || "",
        username: data.data.username || "",
      });
    } catch {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    if (!profile) loadProfile();
  }, []);

  const saveDetails = async () => {
    setLoading(true);
    try {
      const { data } = await updateDetails({ fullName: form.fullName, username: form.username });
      if (data?.data?.user) {
        setUser(data.data.user);
        setProfile(data.data.user);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        toast.success("Profile updated successfully");
        setMode("view");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const changePwd = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await updatePassword({ oldPassword: passwordForm.oldPassword, newPassword: passwordForm.newPassword });
      toast.success("Password updated successfully");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setMode("view");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <div className="text-center py-20 text-gray-600">Loading profile...</div>;

  return (
    <div className="min-h-[89.3vh] bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6 sm:p-10 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">

        {/* View Mode */}
        {mode === "view" && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 space-y-4 transition hover:shadow-xl">
            <h2 className="text-3xl font-bold text-indigo-600 mb-4 text-center">Your Profile</h2>
            <div className="space-y-2 text-gray-700 flex flex-col gap-4">
              <p className="flex items-center gap-2"><User className="w-5 h-5 text-indigo-500" /> <strong>Full Name:</strong> {profile.fullName}</p>
              <p className="flex items-center gap-2"><AtSign className="w-5 h-5 text-indigo-500" /> <strong>Username:</strong> {profile.username}</p>
              <p className="flex items-center gap-2"><Mail className="w-5 h-5 text-indigo-500" /> <strong>Email:</strong> {profile.email}</p>
            </div>
            <div className="flex gap-6 flex-wrap justify-end">
              <button
                onClick={() => setMode("edit")}
                className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <Edit2 className="w-4 h-4" /> Edit Profile
              </button>
              <button
                onClick={() => setMode("password")}
                className="flex items-center gap-2 px-5 py-2 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <Lock className="w-4 h-4" /> Change Password
              </button>
            </div>
          </div>
        )}

        {/* Edit Profile Mode */}
        {mode === "edit" && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 space-y-4 transition hover:shadow-xl">
            <h2 className="text-3xl font-bold text-indigo-600 mb-4 text-center">Edit Profile</h2>
            <div className="space-y-3">
              {/* Full Name */}
              <div className="flex items-center gap-2 relative">
                <User className="w-5 h-5 text-indigo-500" />
                <input
                  placeholder="Full Name"
                  value={form.fullName || profile.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md"
                />
              </div>

              {/* Username */}
              <div className="flex items-center gap-2 relative">
                <AtSign className="w-5 h-5 text-indigo-500" />
                <input
                  placeholder="Username"
                  value={form.username || profile.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            <div className="flex gap-4 flex-wrap justify-end mt-2">
              <button
                onClick={saveDetails}
                disabled={loading}
                className={`px-5 py-2 rounded-2xl font-semibold transition transform hover:-translate-y-1 ${loading
                  ? "bg-indigo-400 cursor-not-allowed text-white"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-xl"
                  }`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setMode("view")}
                className="px-5 py-2 rounded-2xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Change Password Mode */}
        {mode === "password" && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 space-y-4 transition hover:shadow-xl">
            <h2 className="text-3xl font-bold text-indigo-600 mb-4 text-center">Change Password</h2>
            <div className="space-y-3">
              {["oldPassword", "newPassword", "confirmPassword"].map((field, idx) => (
                <div key={idx} className="flex items-center gap-2 relative">
                  <Lock className="w-5 h-5 text-indigo-500" />
                  <input
                    type={showPassword[field] ? "text" : "password"}
                    placeholder={
                      field === "oldPassword" ? "Current Password" :
                        field === "newPassword" ? "New Password" :
                          "Confirm Password"
                    }
                    value={passwordForm[field]}
                    onChange={(e) => setPasswordForm({ ...passwordForm, [field]: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, [field]: !showPassword[field] })}
                    className="absolute right-3"
                  >
                    {showPassword[field] ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                onClick={changePwd}
                disabled={loading}
                className={`flex items-center gap-2 px-5 py-2 rounded-2xl font-semibold transition transform hover:-translate-y-1 ${loading
                  ? "bg-indigo-400 cursor-not-allowed text-white"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-xl"
                  }`}
              >
                <Save className="w-4 h-4" /> {loading ? "Updating..." : "Update Password"}
              </button>
              <button
                onClick={() => setMode("view")}
                className="flex items-center gap-2 px-5 py-2 rounded-2xl border border-gray-300 hover:bg-gray-100 transition"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
