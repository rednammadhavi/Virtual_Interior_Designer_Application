import React from "react"
import { useState } from "react";
import { redesignRoom } from "../api/ai";

export default function AIDesigner() {
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  const run = async () => {
    const { data } = await redesignRoom({ imageUrl, prompt });
    setOutput(data?.data?.aiImageUrl || "");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-3">
      <h2 className="text-2xl font-semibold">AI Room Redesign</h2>
      <div className="bg-white p-4 rounded shadow space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Room image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Style prompt, e.g. 'Scandinavian minimalism'" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button onClick={run} className="px-4 py-2 bg-sky-600 text-white rounded">Generate</button>
      </div>
      {output && (
        <div className="bg-white p-4 rounded shadow">
          <img src={output} alt="AI redesign" className="w-full rounded" />
        </div>
      )}
    </div>
  );
}
