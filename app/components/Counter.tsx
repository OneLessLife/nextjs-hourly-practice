'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-6 rounded-xl bg-gray-900 shadow-lg p-6 max-w-sm mx-auto transition-transform transform hover:scale-105">
  <h2 className="text-2xl font-bold mb-4 text-white">Counter Example</h2>

  <p className="my-4 text-lg text-gray-200 transition-all duration-300">
    Count: <span className="font-semibold text-red-500">{count}</span>
  </p>

  <div className="flex gap-3">
    <button
      onClick={() => setCount(count + 1)}
      className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow hover:from-green-600 hover:to-green-800 transition-all duration-200 cursor-pointer"
    >
      +
    </button>

    <button
      onClick={() => setCount(count - 1)}
      className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow hover:from-red-600 hover:to-red-800 transition-all duration-200 cursor-pointer"
    >
      -
    </button>
  </div>
</div>

  )
}
