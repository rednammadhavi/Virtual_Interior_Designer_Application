import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Key, Eye, EyeOff, Loader2 } from "lucide-react";

export default function ResetPassword() {
    const { resetPassword } = useAuth();
    const { token } = useParams();
    const nav = useNavigate();

    const [form, setForm] = useState({ password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        setLoading(true);
        try {
            await resetPassword(token, form.password);
            setTimeout(() => nav("/login"), 1500);
        } catch (err) {
            setError("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[89.3vh] flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transition-all duration-300">

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                        <Key className="w-14 h-14 text-indigo-600 animate-bounce" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm sm:text-base">
                        Enter your new password
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* New Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md pr-12"
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

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md pr-12"
                            value={form.confirmPassword}
                            onChange={(e) =>
                                setForm({ ...form, confirmPassword: e.target.value })
                            }
                            required
                        />
                        <button
                            type="button"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 flex justify-center items-center gap-2 ${loading
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                            }`}
                    >
                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
