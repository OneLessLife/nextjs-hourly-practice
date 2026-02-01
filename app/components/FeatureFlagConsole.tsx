"use client";

import { useState } from "react";

type Feature = {
  key: string;
  name: string;
  enabled: boolean;
  rollout: number; // %
};

const initialFeatures: Feature[] = [
  { key: "new-dashboard", name: "New Dashboard UI", enabled: true, rollout: 100 },
  { key: "ai-search", name: "AI Search", enabled: false, rollout: 0 },
  { key: "beta-payments", name: "Beta Payments", enabled: true, rollout: 30 },
];

export default function FeatureFlagConsole() {
  const [features, setFeatures] = useState(initialFeatures);

  function toggleFeature(key: string) {
    setFeatures((prev) =>
      prev.map((f) =>
        f.key === key ? { ...f, enabled: !f.enabled } : f
      )
    );
  }

  function updateRollout(key: string, value: number) {
    setFeatures((prev) =>
      prev.map((f) =>
        f.key === key ? { ...f, rollout: value } : f
      )
    );
  }

  function isFeatureActive(feature: Feature) {
    if (!feature.enabled) return false;
    const userHash = Math.random() * 100;
    return userHash <= feature.rollout;
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-3xl">
      <h2 className="text-xl font-bold text-emerald-400 mb-4">
        Feature Flag Console
      </h2>

      <div className="space-y-4">
        {features.map((feature) => {
          const activeForUser = isFeatureActive(feature);

          return (
            <div
              key={feature.key}
              className="bg-gray-800 p-4 rounded border border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{feature.name}</h3>

                <button
                  onClick={() => toggleFeature(feature.key)}
                  className={`px-3 py-1 text-sm rounded font-bold ${
                    feature.enabled
                      ? "bg-green-500 text-black"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {feature.enabled ? "ENABLED" : "DISABLED"}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Rollout:</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={feature.rollout}
                  onChange={(e) =>
                    updateRollout(feature.key, Number(e.target.value))
                  }
                />
                <span className="text-sm">{feature.rollout}%</span>
              </div>

              <p className="mt-2 text-sm">
                Status for current user:{" "}
                <span
                  className={`font-bold ${
                    activeForUser ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {activeForUser ? "ACTIVE" : "INACTIVE"}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
