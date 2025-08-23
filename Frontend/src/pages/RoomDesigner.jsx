import React, { useState } from "react";
import SidebarFurniture from "../components/SidebarFurniture";
import DesignerCanvas from "../components/DesignerCanvas";
import { saveDesign } from "../api/design";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

export default function RoomDesigner() {
  const [background, setBackground] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tempTitle, setTempTitle] = useState("");

  const onAdd = (tpl) => {
    if (!background) {
      toast.warning("Upload a room image before adding furniture!");
      return;
    }
    setItems((prev) => [
      ...prev,
      {
        ...tpl,
        id: tpl.id + "-" + (prev.length + 1),
        x: 20,
        y: 20,
        color: "#e5e7eb",
      },
    ]);
  };

  const handleSaveClick = () => {
    if (!items.length) {
      toast.warning("Add some furniture before saving!");
      return;
    }
    setTempTitle("");
    setModalOpen(true);
  };

  const handleModalSave = async () => {
    try {
      await saveDesign({ title: tempTitle || "My Room", imageFile, furnitureData: items });
      setItems([]);
      setBackground(null);
      setImageFile(null);
      toast.success("Design saved successfully!");
      setModalOpen(false);
    } catch (err) {
      toast.error("Failed to save design. Try again.");
    }
  };

  const handleImageUpload = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    const url = URL.createObjectURL(f);
    setBackground(url);
  };

  return (
    <div className="min-h-[89.3vh] bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6 sm:p-10">
      <h3 className="text-3xl font-bold text-indigo-600 text-center p-4"></h3>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-6">
        {/* Sidebar */}
        <aside
          className={`lg:w-64 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl
            ${!background ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        >
          <div>
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Customize your Room</h2>
            <SidebarFurniture onAdd={onAdd} disabled={!background} />
          </div>

          {/* Save Button at Bottom */}
          <button
            onClick={handleSaveClick}
            className="mt-4 w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!background || !items.length}
          >
            Save Design
          </button>
        </aside>

        {/* Main Designer */}
        <main className="flex-1 flex flex-col space-y-5">
          {/* Designer Canvas with integrated image upload */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-5 min-h-[400px] md:min-h-[500px] flex justify-center items-center overflow-auto relative transition-all duration-300 hover:shadow-xl">
            {!background && (
              <label className="flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-indigo-400 rounded-2xl w-full h-full text-indigo-500 hover:bg-indigo-50 transition-all duration-300 p-10 animate-pulse">
                <Plus className="w-10 h-10 mb-2" />
                <span>Click or tap to upload room image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
            {background && (
              <DesignerCanvas
                background={background}
                items={items}
                setItems={setItems}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 w-full max-w-md space-y-4 transform transition-all duration-300 scale-95 animate-fade-in">
            <h3 className="text-xl font-semibold text-indigo-600">Save Your Design</h3>
            <input
              type="text"
              placeholder="Enter design title"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm hover:shadow-md"
            />
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-2xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition shadow-md hover:shadow-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
