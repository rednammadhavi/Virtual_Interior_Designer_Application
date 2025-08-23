import React, { useState } from "react";
import { redesignRoom } from "../api/ai";
import { toast } from "react-toastify";

export default function AIDesigner() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setOutput("");
  };

  const handleGenerate = async () => {
    if (!imageFile || !prompt) {
      toast.warn("Please upload an image and provide a prompt!");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("prompt", prompt);

      const { data } = await redesignRoom(formData);
      const aiImage = data?.data?.aiImageUrl;

      if (!aiImage) {
        toast.error("Failed to generate AI redesign.");
        return;
      }

      setOutput(aiImage);
      toast.success("AI redesign generated successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!output) {
      toast.warning("Generate an AI design before saving!");
      return;
    }
    toast.success(`AI Design "${title || "Untitled"}" saved successfully!`);
  };

  return (
    <div className="min-h-[89.3vh] bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6 sm:p-10">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Left Panel: Inputs + Preview */}
        <div className="lg:w-1/2 bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-4 transition-all duration-300">
          <h3 className="text-xl font-bold text-indigo-600">Design with AI Assistance</h3>

          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Design title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-3 rounded-xl cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md"
            />
          </div>

          <div className="border border-gray-200 rounded-2xl p-2 flex items-center justify-center min-h-[250px] overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full rounded-2xl shadow-md object-contain" />
            ) : (
              <p className="text-gray-400 text-center">
                Uploaded image preview will appear here
              </p>
            )}
          </div>

          <input
            type="text"
            placeholder="Style prompt, e.g., 'Scandinavian minimalism'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 flex justify-center items-center gap-2 ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
              }`}
          >
            {loading ? "Generating..." : "Generate Redesign"}
          </button>


        </div>

        {/* Right Panel: AI Output */}
        <div className="lg:w-1/2 bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center min-h-[400px] gap-4 transition-all duration-300">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin mb-3"></div>
              <p className="text-indigo-600 font-semibold">Generating AI redesign...</p>
            </div>
          ) : output ? (
            <>
              <img src={output} alt="AI redesign" className="w-full rounded-2xl shadow-md object-contain" />
              <button
                onClick={handleSave}
                className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
              >
                Save AI Design
              </button>
            </>
          ) : (
            <p className="text-gray-400 text-center">
              AI-generated image will appear here
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
