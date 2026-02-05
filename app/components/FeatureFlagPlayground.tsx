"use client";

import { useState } from "react";

type Flags = {
  darkMode: boolean;
  betaBanner: boolean;
  newCheckout: boolean;
};

export default function FeatureFlagPlayground() {
  const [flags, setFlags] = useState<Flags>({
    darkMode: false,
    betaBanner: true,
    newCheckout: false,
  });

  function toggleFlag(flag: keyof Flags) {
    setFlags((prev) => ({
      ...prev,
      [flag]: !prev[flag],
    }));
  }

  return (
    <div
      className={`p-6 rounded-xl border max-w-xl transition-all ${
        flags.darkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-black border-gray-300"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">
        Feature Flag Playground
      </h2>

      <div className="space-y-3">
        {Object.entries(flags).map(([key, value]) => (
          <label
            key={key}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="font-mono">{key}</span>
            <input
              type="checkbox"
              checked={value}
              onChange={() =>
                toggleFlag(key as keyof Flags)
              }
            />
          </label>
        ))}
      </div>

      {flags.betaBanner && (
        <div className="mt-5 p-3 bg-yellow-300 text-black rounded">
          🚧 Beta feature enabled
        </div>
      )}

      {flags.newCheckout ? (
        <div className="mt-5 p-4 border rounded bg-green-100">
          🛒 New Checkout Experience
        </div>
      ) : (
        <div className="mt-5 p-4 border rounded bg-gray-100">
          🛒 Legacy Checkout
        </div>
      )}
    </div>
  );
}
