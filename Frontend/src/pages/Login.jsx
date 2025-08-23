import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LogIn, Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(form);
    setLoading(false);
    if (ok) {
      nav("/dashboard");
    } else {
      setError("Invalid username/email or password.");
    }
  };

  return (
    <div className="min-h-[89.3vh] flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transition-all duration-300">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <LogIn className="w-14 h-14 text-indigo-600 animate-bounce" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Username / Email */}
          <input
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md"
            placeholder="Username or Email"
            value={form.usernameOrEmail}
            onChange={(e) =>
              setForm({ ...form, usernameOrEmail: e.target.value })
            }
            required
          />

          {/* Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md pr-12"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:underline transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 flex justify-center items-center gap-2 ${loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
              }`}
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
