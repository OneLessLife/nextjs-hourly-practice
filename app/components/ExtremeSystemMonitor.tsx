"use client";

import { useEffect, useState } from "react";

type Metric = {
  label: string;
  value: number;
  unit: string;
  dangerThreshold: number;
};

export default function ExtremeSystemMonitor() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  // generate fake live system data
  const generateMetrics = () => [
    {
      label: "CPU Usage",
      value: Math.floor(Math.random() * 100),
      unit: "%",
      dangerThreshold: 85,
    },
    {
      label: "Memory Usage",
      value: Math.floor(40 + Math.random() * 60),
      unit: "%",
      dangerThreshold: 90,
    },
    {
      label: "Network Latency",
      value: Math.floor(10 + Math.random() * 200),
      unit: "ms",
      dangerThreshold: 150,
    },
    {
      label: "Disk Activity",
      value: Math.floor(Math.random() * 100),
      unit: "%",
      dangerThreshold: 80,
    },
  ];

  useEffect(() => {
    setMetrics(generateMetrics());

    const interval = setInterval(() => {
      setMetrics(generateMetrics());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">
        Live System Status Monitor
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {metrics.map((m) => {
          const danger = m.value >= m.dangerThreshold;

          return (
            <div
              key={m.label}
              className={`p-4 rounded-lg border transition-all duration-500 ${
                danger
                  ? "border-red-500 bg-red-500/10 animate-pulse"
                  : "border-gray-700 bg-gray-800"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{m.label}</span>
                <span
                  className={`font-bold ${
                    danger ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {m.value}
                  {m.unit}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 transition-all duration-500 ${
                    danger ? "bg-red-500" : "bg-cyan-400"
                  }`}
                  style={{ width: `${Math.min(m.value, 100)}%` }}
                />
              </div>

              {danger && (
                <p className="text-xs text-red-400 mt-2">
                  ⚠ Threshold exceeded
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
