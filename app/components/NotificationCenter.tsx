"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

type Notification = {
  id: number;
  message: string;
  read: boolean;
};

const messages = [
  "New user signed up",
  "Server backup completed",
  "Payment received",
  "New comment posted",
  "New order created",
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  // 🔔 Fake realtime notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now(),
        message: messages[Math.floor(Math.random() * messages.length)],
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev].slice(0, 8));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  }

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-800"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50">
          <div className="flex justify-between items-center p-3 border-b border-gray-700">
            <span className="font-semibold">Notifications</span>
            <button
              onClick={markAllRead}
              className="text-xs text-blue-400 hover:underline"
            >
              Mark all read
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="p-4 text-sm text-gray-400">No notifications yet</p>
            )}

            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 text-sm border-b border-gray-800 ${
                  n.read ? "text-gray-500" : "bg-gray-800"
                }`}
              >
                {n.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
