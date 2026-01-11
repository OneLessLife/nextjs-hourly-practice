'use client'

import { useState } from 'react'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className={`p-5 mt-10 rounded-lg max-w-sm ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-bold mb-3">Theme Toggle</h2>
      <p className="mb-4">Current Theme: {darkMode ? 'Dark' : 'Light'}</p>
      <button
  className={`px-4 py-2 rounded font-semibold ${
    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-200'
  } cursor-pointer`}
  onClick={() => setDarkMode(!darkMode)}
>
  Toggle Theme
</button>

    </div>
  )
}
