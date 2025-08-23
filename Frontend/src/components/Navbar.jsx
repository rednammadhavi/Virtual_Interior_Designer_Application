import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = "block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-100 transition";
  const activeLink = ({ isActive }) =>
    isActive
      ? "bg-indigo-200 text-indigo-900 " + linkClasses
      : "text-gray-700 " + linkClasses;

  return (
    <header className="bg-indigo-50 border-b shadow-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl text-indigo-600">
          VID
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={activeLink}>Home</NavLink>
          <NavLink to="/design" className={activeLink}>Designer</NavLink>
          <NavLink to="/design-with-ai" className={activeLink}>AI Designer</NavLink>
          {user && <NavLink to="/dashboard" className={activeLink}>Dashboard</NavLink>}
          {user && <NavLink to="/profile" className={activeLink}>Profile</NavLink>}
        </div>

        {/* Authentication Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/" className={activeLink} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/design" className={activeLink} onClick={() => setIsOpen(false)}>Designer</NavLink>
            <NavLink to="/design-with-ai" className={activeLink} onClick={() => setIsOpen(false)}>AI Designer</NavLink>
            {user && <NavLink to="/dashboard" className={activeLink} onClick={() => setIsOpen(false)}>Dashboard</NavLink>}
            {user && <NavLink to="/profile" className={activeLink} onClick={() => setIsOpen(false)}>Profile</NavLink>}

            <div className="mt-2 space-y-1">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 rounded-lg border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>

  );
}
