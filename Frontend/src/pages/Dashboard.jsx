import React from "react"
import { useEffect, useState } from "react";
import { getUserDesigns } from "../api/design";

export default function Dashboard() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUserDesigns();
        setDesigns(data?.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Designs</h2>
      {loading ? "Loading…" : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {designs.map((d) => (
            <div key={d._id} className="bg-white rounded shadow overflow-hidden">
              <img src={d.imageUrl} alt={d.title} className="w-full h-48 object-cover" />
              <div className="p-3">
                <div className="font-medium">{d.title}</div>
                <div className="text-xs text-gray-500">{new Date(d.createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
          {!designs.length && <div className="text-gray-600">No designs yet.</div>}
        </div>
      )}
    </div>
  );
}
