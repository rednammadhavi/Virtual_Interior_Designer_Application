import React from "react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "", avatar: null });

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === "avatar") { if (v) fd.append("avatar", v) }
      else fd.append(k, v);
    });
    await register(fd);
    nav("/login");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      <form onSubmit={onSubmit} className="space-y-3 bg-white p-5 rounded shadow">
        <input className="w-full border p-2 rounded" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="email" className="w-full border p-2 rounded" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, avatar: e.target.files?.[0] || null })} />
        <button className="w-full bg-sky-600 text-white py-2 rounded">Register</button>
      </form>
      <p className="mt-3 text-sm">Have an account? <Link className="text-sky-600" to="/login">Login</Link></p>
    </div>
  );
}
