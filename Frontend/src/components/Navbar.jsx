import React from "react"
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const link = "px-3 py-2 rounded hover:bg-sky-100";
  const active = ({ isActive }) => (isActive ? "bg-sky-200 " + link : link);

  return (
    <header className="border-b bg-white">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-3">
        <Link to="/" className="font-bold text-xl text-sky-600">VID</Link>
        <div className="flex items-center gap-2">
          <NavLink to="/" className={active}>Home</NavLink>
          <NavLink to="/design" className={active}>Designer</NavLink>
          <NavLink to="/ai" className={active}>AI Designer</NavLink>
          {user && <NavLink to="/dashboard" className={active}>Dashboard</NavLink>}
          {user && <NavLink to="/profile" className={active}>Profile</NavLink>}
        </div>
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-2 rounded border">Login</Link>
              <Link to="/register" className="px-3 py-2 rounded bg-sky-600 text-white">Sign up</Link>
            </>
          ) : (
            <button onClick={logout} className="px-3 py-2 rounded bg-gray-900 text-white">Logout</button>
          )}
        </div>
      </nav>
    </header>
  );
}
