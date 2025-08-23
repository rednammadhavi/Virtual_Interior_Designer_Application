import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Palette, LayoutDashboard } from "lucide-react";
import useAuth from "../hooks/useAuth"; // import your auth hook

export default function Home() {
  const { user } = useAuth(); // or however your hook exposes login state
  const isAuthenticated = !!user; // true if user is logged in

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-28 pb-32">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Virtual Interior <span className="text-indigo-600">Designer</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your room with AI-powered redesigns.
          Visualize layouts, experiment with colors, and create your dream space.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/design"
                className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-semibold shadow-lg hover:bg-indigo-600 transition"
              >
                Create Design
              </Link>
              <Link
                to="/design-with-ai"
                className="px-6 py-3 rounded-xl bg-indigo-400 text-white font-semibold shadow-lg hover:bg-indigo-500 transition"
              >
                Create with AI
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl border border-gray-300 bg-white font-semibold text-gray-700 shadow hover:bg-gray-50 transition"
              >
                Learn More
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid gap-8 md:grid-cols-3">
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
          <Sparkles className="mx-auto text-indigo-600 w-12 h-12" />
          <h3 className="mt-4 text-xl font-bold text-gray-800">AI Redesigns</h3>
          <p className="mt-2 text-gray-600">
            Generate multiple room styles instantly with smart AI-powered transformations.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
          <Palette className="mx-auto text-indigo-600 w-12 h-12" />
          <h3 className="mt-4 text-xl font-bold text-gray-800">Color Experiments</h3>
          <p className="mt-2 text-gray-600">
            Try new paint shades, furniture tones, and decor accents with one click.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
          <LayoutDashboard className="mx-auto text-indigo-600 w-12 h-12" />
          <h3 className="mt-4 text-xl font-bold text-gray-800">Smart Layouts</h3>
          <p className="mt-2 text-gray-600">
            Optimize space with intelligent room arrangement suggestions.
          </p>
        </div>
      </div>
    </div>
  );
}
