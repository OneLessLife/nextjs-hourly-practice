"use client";

import { useState } from "react";

const MAX_REQUESTS = 20;

export default function SmartRateLimiter() {
  const [requests, setRequests] = useState<number[]>([]);
  const [blocked, setBlocked] = useState(false);

  function sendRequest() {
    if (blocked) return;

    const now = Date.now();

    const lastMinute = requests.filter(
      (t) => now - t < 60000
    );

    if (lastMinute.length >= MAX_REQUESTS) {
      setBlocked(true);
      return;
    }

    setRequests([...lastMinute, now]);
  }

  function resetLimiter() {
    setRequests([]);
    setBlocked(false);
  }

  const usage = Math.min(
    Math.round((requests.length / MAX_REQUESTS) * 100),
    100
  );

  function predictLimit() {
    if (requests.length === 0) return "Safe";

    if (usage > 80) return "High Risk";
    if (usage > 50) return "Moderate";

    return "Healthy";
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-xl">
      <h2 className="text-xl font-bold text-orange-400 mb-4">
        API Rate Limiter Simulator
      </h2>

      <button
        onClick={sendRequest}
        disabled={blocked}
        className={`px-5 py-2 rounded font-bold ${
          blocked
            ? "bg-red-600 cursor-not-allowed"
            : "bg-orange-500 text-black"
        }`}
      >
        Send API Request
      </button>

      <button
        onClick={resetLimiter}
        className="ml-3 px-4 py-2 bg-gray-700 rounded"
      >
        Reset
      </button>

      <div className="mt-6">
        <p className="text-sm text-gray-400 mb-2">
          Usage: {requests.length} / {MAX_REQUESTS}
        </p>

        <div className="w-full bg-gray-800 h-3 rounded">
          <div
            className="h-3 bg-orange-500 rounded transition-all"
            style={{ width: `${usage}%` }}
          />
        </div>

        <p className="mt-3 text-sm">
          Status:{" "}
          <span
            className={`font-bold ${
              blocked
                ? "text-red-400"
                : usage > 70
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {blocked ? "BLOCKED" : predictLimit()}
          </span>
        </p>
      </div>
    </div>
  );
}
