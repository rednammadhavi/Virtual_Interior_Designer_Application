import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function ForgotPassword() {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await forgotPassword(email);
            setSuccess("Reset link sent! Check your email.");
        } catch (err) {
            setError("Failed to send reset link. Try again.");
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
                        <Mail className="w-14 h-14 text-indigo-600 animate-bounce" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Forgot Password</h2>
                    <p className="mt-2 text-gray-600 text-sm sm:text-base">
                        Enter your email to receive a password reset link
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="email"
                        className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Error / Success */}
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    {success && <p className="text-sm text-green-600 text-center">{success}</p>}

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
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
