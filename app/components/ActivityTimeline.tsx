"use client";

import { useState } from "react";

type Activity = {
  id: number;
  action: string;
  user: string;
  time: string;
  status: "success" | "warning" | "error";
};

const initialData: Activity[] = [
  { id: 1, action: "User login", user: "admin@site.com", time: "2 minutes ago", status: "success" },
  { id: 2, action: "Password changed", user: "john@site.com", time: "10 minutes ago", status: "warning" },
  { id: 3, action: "Failed login attempt", user: "unknown", time: "12 minutes ago", status: "error" },
  { id: 4, action: "New user registered", user: "maria@site.com", time: "30 minutes ago", status: "success" },
];

export default function ActivityTimeline() {
  const [activities] = useState<Activity[]>(initialData);

  const statusColor = {
    success: "bg-green-500",
    warning: "bg-yellow-400",
    error: "bg-red-500",
  };

  return (
    <div className="bg-gray-900 p-5 rounded-xl max-w-xl mx-auto text-white">
      <h2 className="text-xl font-bold mb-4">System Activity Log</h2>

      <div className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start gap-3">
            <div className={`w-3 h-3 mt-2 rounded-full ${statusColor[act.status]}`} />
            <div className="flex-1">
              <p className="font-semibold">{act.action}</p>
              <p className="text-sm text-gray-400">
                {act.user} • {act.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
