'use client'

import { useState } from 'react'

type Tab = {
  name: string
  content: React.ReactNode
}

type TabsProps = {
  tabs: Tab[]
}

export default function TabsNavbar({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="w-full">
      {}
      <div className="flex bg-gray-800 rounded-t-xl overflow-hidden shadow-lg">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex-1 py-3 text-white font-semibold relative transition-all duration-300 hover:bg-gray-700 cursor-pointer ${
              activeTab === index ? 'bg-gray-700' : ''
            }`}
          >
            {tab.name}
            {activeTab === index && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-red-500 animate-slide-in"></span>
            )}
          </button>
        ))}
      </div>

      {}
      <div className="p-6 bg-gray-900 rounded-b-xl shadow-lg transition-all duration-300">
        {tabs[activeTab].content}
      </div>
    </div>
  )
}
