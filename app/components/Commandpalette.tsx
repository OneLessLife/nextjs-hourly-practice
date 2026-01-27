"use client";

import { useEffect, useState } from "react";

type Command = {
  id: number;
  name: string;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commands: Command[] = [
    { id: 1, name: "Go to Dashboard", action: () => alert("Dashboard") },
    { id: 2, name: "Open Settings", action: () => alert("Settings") },
    { id: 3, name: "Create New Project", action: () => alert("New Project") },
    { id: 4, name: "Logout", action: () => alert("Logout") },
  ];

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "/") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filtered = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  function runCommand(cmd: Command) {
    cmd.action();
    setOpen(false);
    setQuery("");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-start justify-center pt-40 z-50">
      <div className="bg-gray-900 w-full max-w-xl rounded-xl border border-gray-700 shadow-xl">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command..."
          className="w-full bg-gray-800 px-4 py-3 rounded-t-xl outline-none"
        />

        <div className="max-h-60 overflow-y-auto">
          {filtered.map((cmd) => (
            <div
              key={cmd.id}
              onClick={() => runCommand(cmd)}
              className="px-4 py-3 hover:bg-gray-700 cursor-pointer"
            >
              {cmd.name}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-4 py-3 text-gray-500">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
