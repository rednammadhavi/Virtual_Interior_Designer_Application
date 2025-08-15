import React from "react"
import { useRef, useState } from "react";
import ColorPicker from "./ColorPicker";

export default function DesignerCanvas({ background, items, setItems }) {
  const canvasRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const updateItem = (id, patch) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  const onMouseDown = (e, id) => {
    const startX = e.clientX;
    const startY = e.clientY;
    setSelectedId(id);
    const item = items.find((i) => i.id === id);
    const move = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      updateItem(id, { x: Math.max(0, (item.x || 10) + dx), y: Math.max(0, (item.y || 10) + dy) });
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const selected = items.find((i) => i.id === selectedId);

  return (
    <div className="flex-1 h-[70vh] bg-gray-100 relative overflow-hidden rounded">
      {background && (
        <img src={background} alt="room" className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
      )}
      {items.map((it) => (
        <div
          key={it.id}
          onMouseDown={(e) => onMouseDown(e, it.id)}
          className={"absolute border-2 cursor-move " + (selectedId === it.id ? "border-sky-500" : "border-transparent")}
          style={{ left: it.x || 10, top: it.y || 10, width: it.w, height: it.h, background: it.color || "#e5e7eb", borderRadius: 8 }}
          title={it.label}
        />
      ))}

      {selected && (
        <div className="absolute bottom-3 left-3 bg-white rounded shadow p-3 flex items-center gap-3">
          <div className="text-sm font-medium">{selected.label}</div>
          <ColorPicker value={selected.color || "#e5e7eb"} onChange={(c) => updateItem(selected.id, { color: c })} />
        </div>
      )}
    </div>
  );
}
