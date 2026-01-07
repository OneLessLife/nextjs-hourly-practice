'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-6 rounded-xl border p-4 max-w-sm">
      <h2 className="text-xl font-semibold">Counter Example</h2>

      <p className="my-4 text-lg">Count: {count}</p>

      <div className="flex gap-3">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          +
        </button>

        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          -
        </button>
      </div>
    </div>
  )
}
