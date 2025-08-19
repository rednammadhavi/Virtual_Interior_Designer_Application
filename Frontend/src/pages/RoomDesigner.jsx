import React from "react"
import { useState } from "react";
import SidebarFurniture from "../components/SidebarFurniture";
import DesignerCanvas from "../components/DesignerCanvas";
import { saveDesign } from "../api/design";

export default function RoomDesigner() {
  const [background, setBackground] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);

  const onAdd = (tpl) => {
    setItems((prev) => [...prev, { ...tpl, id: tpl.id + "-" + (prev.length + 1), x: 10, y: 10, color: "#e5e7eb" }]);
  };

  const save = async () => {
    await saveDesign({ title: title || "My Room", imageFile, furnitureData: items });
    setTitle(""); setItems([]); setBackground(null); setImageFile(null);
    alert("Saved!");
  };


  return (
    <div className="flex max-w-6xl mx-auto p-4 gap-4">
      <SidebarFurniture onAdd={onAdd} />
      <main className="flex-1 space-y-3">
        <div className="bg-white rounded p-3 flex items-center gap-3">
          <input className="border p-2 rounded flex-1" placeholder="Design title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setImageFile(f);
            const url = URL.createObjectURL(f);
            setBackground(url);
          }} />
          <button onClick={save} className="px-4 py-2 rounded bg-sky-600 text-white">Save</button>
        </div>
        <DesignerCanvas background={background} items={items} setItems={setItems} />
      </main>
    </div>
  );
}
