'use client'

import { useState } from 'react'

type User = {
  ip: string
  online: boolean
}

export default function UserIPList() {
  const users: User[] = Array.from({ length: 10 }).map((_, i) => ({
    ip: `192.168.0.${i + 1}`,
    online: Math.random() > 0.5,
  }))

  const [selectedIP, setSelectedIP] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {users.map((user, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center p-4 bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div>
            <span className="font-semibold">IP:</span> {user.ip}
          </div>

          <div className="flex gap-3 items-center">
            <span
              className={`px-2 py-1 rounded-full text-sm font-semibold ${
                user.online ? 'bg-green-500 text-black' : 'bg-red-500 text-white'
              }`}
            >
              {user.online ? 'Online' : 'Offline'}
            </span>

            <button
              onClick={() => setSelectedIP(user.ip)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              Show Location
            </button>
          </div>
        </div>
      ))}

      {/* Iframe για χάρτη */}
      {selectedIP && (
        <div className="mt-6 w-full h-[400px] rounded-xl overflow-hidden border border-gray-700">
          <iframe
            src={`https://www.iplocation.net/ip-lookup?query=${selectedIP}`}
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  )
}
