"use client";

import { Plus, X } from "lucide-react";

type BulletListEditorProps = {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  minItems?: number;
  maxItems?: number;
};

export function BulletListEditor({
  label,
  items,
  onChange,
  placeholder = "Add a point...",
  minItems = 1,
  maxItems = 10,
}: BulletListEditorProps) {
  const updateItem = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const removeItem = (index: number) => {
    if (items.length <= minItems) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    if (items.length >= maxItems) return;
    onChange([...items, ""]);
  };

  return (
    <div className="rounded-xl border border-deepNavy/7 bg-white p-5">
      <h3 className="mb-3 border-l-4 border-metallicGold pl-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-metallicGold">{label}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-md border border-deepNavy/12 px-3 py-2 text-sm focus:border-metallicGold focus:outline-none focus:ring-2 focus:ring-metallicGold/15"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              disabled={items.length <= minItems}
              className="rounded-md border border-deepNavy/10 p-2 text-mutedText transition hover:border-dangerRed/30 hover:text-dangerRed disabled:opacity-30"
              aria-label="Remove point"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      {items.length < maxItems && (
        <button
          type="button"
          onClick={addItem}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-metallicGold hover:underline"
        >
          <Plus size={14} /> Add point
        </button>
      )}
    </div>
  );
}
