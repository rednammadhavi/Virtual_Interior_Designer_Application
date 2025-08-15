import React from "react"

const ITEMS = [
  { id: "sofa", label: "Sofa", w: 180, h: 70 },
  { id: "table", label: "Table", w: 100, h: 60 },
  { id: "bed", label: "Bed", w: 200, h: 120 },
  { id: "lamp", label: "Lamp", w: 30, h: 60 },
];

export default function SidebarFurniture({ onAdd }) {
  return (
    <aside className="w-56 border-r bg-white">
      <div className="p-3 font-semibold">Furniture</div>
      <ul className="p-2 space-y-2">
        {ITEMS.map((it) => (
          <li key={it.id}>
            <button
              onClick={() => onAdd(it)}
              className="w-full text-left px-3 py-2 rounded border hover:bg-gray-50"
            >
              + {it.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
