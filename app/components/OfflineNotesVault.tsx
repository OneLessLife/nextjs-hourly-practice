"use client";

import { useEffect, useState } from "react";

type SyncState = "synced" | "syncing" | "offline";

export default function OfflineNotesVault() {
  const [note, setNote] = useState("");
  const [syncState, setSyncState] = useState<SyncState>("synced");
  const [online, setOnline] = useState(true);

  // Load saved note
  useEffect(() => {
    const saved = localStorage.getItem("vault-note");
    if (saved) setNote(saved);
  }, []);

  // Auto save
  useEffect(() => {
    localStorage.setItem("vault-note", note);

    if (!online) {
      setSyncState("offline");
      return;
    }

    setSyncState("syncing");

    const t = setTimeout(() => {
      setSyncState("synced");
    }, 600);

    return () => clearTimeout(t);
  }, [note, online]);

  function toggleNetwork() {
    setOnline((prev) => !prev);
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-2xl">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-purple-400">
          Offline Notes Vault
        </h2>

        <button
          onClick={toggleNetwork}
          className={`px-3 py-1 rounded text-sm font-semibold ${
            online
              ? "bg-green-500 text-black"
              : "bg-red-500 text-white"
          }`}
        >
          {online ? "Online" : "Offline"}
        </button>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes..."
        className="w-full h-40 bg-gray-800 p-3 rounded resize-none outline-none"
      />

      <div className="mt-3 text-sm">
        {syncState === "synced" && (
          <span className="text-green-400">✓ Synced</span>
        )}
        {syncState === "syncing" && (
          <span className="text-yellow-400">⟳ Syncing...</span>
        )}
        {syncState === "offline" && (
          <span className="text-red-400">Offline — changes saved locally</span>
        )}
      </div>
    </div>
  );
}
