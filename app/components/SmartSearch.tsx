"use client";

import { useState, useMemo, useEffect } from "react";

const data = [
  "Next.js Dashboard",
  "AI Job Interview Simulator",
  "Extreme Form Validation",
  "Notification Center",
  "Theme Toggle System",
  "Movies Recommendation Row",
  "User IP Monitor",
  "Real-time Chat UI",
  "Analytics Overview",
  "Admin Control Panel",
];

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const results = useMemo(() => {
    if (!query) return data;
    return data.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelected((s) => Math.min(s + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      setSelected((s) => Math.max(s - 1, 0));
    }
    if (e.key === "Enter") {
      alert("Selected: " + results[selected]);
    }
  };

  const highlight = (text: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-400 text-black rounded px-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl w-full max-w-md">
      <h2 className="font-bold mb-3 text-xl">Smart Search</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Search features..."
        className="w-full p-2 rounded bg-gray-800 text-white mb-3"
      />

      <div className="space-y-2">
        {results.length === 0 && (
          <p className="text-gray-400">No results found.</p>
        )}

        {results.map((item, index) => (
          <div
            key={item}
            className={`p-2 rounded cursor-pointer ${
              selected === index ? "bg-blue-500" : "bg-gray-800"
            }`}
          >
            {highlight(item)}
          </div>
        ))}
      </div>
    </div>
  );
}