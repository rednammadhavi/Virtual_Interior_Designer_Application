// Frontend/src/pages/Login.jsx
import React from "react"
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const onSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form);
    if (ok) nav("/dashboard");
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={onSubmit} className="space-y-3 bg-white p-5 rounded shadow">
        <input className="w-full border p-2 rounded" placeholder="Username or Email"
          value={form.usernameOrEmail} onChange={(e) => setForm({ ...form, usernameOrEmail: e.target.value })} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-sky-600 text-white py-2 rounded">Login</button>
      </form>
      <p className="mt-3 text-sm">No account? <Link className="text-sky-600" to="/register">Register</Link></p>
    </div>
  );
}
