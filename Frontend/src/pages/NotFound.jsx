import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[89.3vh] flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-4 py-10">
            <div className="text-center max-w-lg bg-white rounded-3xl shadow-2xl p-10 sm:p-12 transition-all duration-300">
                <AlertCircle className="w-20 h-20 text-indigo-600 mx-auto mb-6 animate-bounce" />
                <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 mb-4">404</h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">
                    Oops! The page you are looking for does not exist.
                </p>
                <Link
                    to="/"
                    className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
