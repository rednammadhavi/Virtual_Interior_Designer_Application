import React from "react"

export default function ColorPicker({ value, onChange, label = "Color" }) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm text-gray-600">{label}</span>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-8 w-12 p-0 border rounded" />
    </label>
  )
}
