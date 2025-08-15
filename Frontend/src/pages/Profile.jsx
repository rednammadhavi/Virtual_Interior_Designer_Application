import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { updateDetails, updatePassword } from "../api/auth";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [pwd, setPwd] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const saveDetails = async () => {
    const { data } = await updateDetails({ fullName, username });
    if (data?.data?.user) {
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }
  };

  const changePwd = async () => {
    await updatePassword(pwd);
    setPwd({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded shadow p-5 space-y-3">
        <h3 className="font-semibold">Account</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="border p-2 rounded" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <button className="px-4 py-2 bg-sky-600 text-white rounded" onClick={saveDetails}>Save</button>
      </div>

      <div className="bg-white rounded shadow p-5 space-y-3">
        <h3 className="font-semibold">Password</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <input className="border p-2 rounded" type="password" placeholder="Current password" value={pwd.oldPassword} onChange={(e) => setPwd({ ...pwd, oldPassword: e.target.value })} />
          <input className="border p-2 rounded" type="password" placeholder="New password" value={pwd.newPassword} onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })} />
          <input className="border p-2 rounded" type="password" placeholder="Confirm password" value={pwd.confirmPassword} onChange={(e) => setPwd({ ...pwd, confirmPassword: e.target.value })} />
        </div>
        <button className="px-4 py-2 bg-gray-900 text-white rounded" onClick={changePwd}>Update Password</button>
      </div>
    </div>
  );
}
