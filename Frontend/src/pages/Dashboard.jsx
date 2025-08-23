import React, { useEffect, useState } from "react";
import { getUserDesigns } from "../api/design";
import { Link } from "react-router-dom";

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
    <div className="min-h-[89.3vh] bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-indigo-600">My Designs</h2>

        {loading ? (
          <div className="text-gray-600 text-center py-20">Loading…</div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {designs.length > 0
              ? designs.map((d) => (
                <div
                  key={d._id}
                  className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="h-56 w-full overflow-hidden rounded-t-3xl">
                    <img
                      src={d.imageUrl}
                      alt={d.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="font-semibold text-lg text-gray-800">{d.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(d.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
              : (
                <Link
                  to="/design"
                  className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 h-56 text-center hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="text-indigo-600 text-4xl mb-3">+</div>
                  <div className="text-lg font-semibold text-gray-800">Create Your First Design</div>
                  <div className="text-sm text-gray-500 mt-1">Click here to start designing your room</div>
                </Link>
              )
            }
          </div>
        )}
      </div>
    </div>
  );
}
