'use client'

import { useState } from 'react'

type Tab = {
  name: string
  content: React.ReactNode
}

type TabsProps = {
  tabs: Tab[]
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="mt-10">
      <div className="flex gap-2 border-b border-gray-500">
        {tabs.map((tab, index) => (
          <button
  key={index}
  className={`px-4 py-2 rounded-t font-semibold ${
    activeTab === index
      ? 'bg-gray-800 text-white'
      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
  } cursor-pointer`}
  onClick={() => setActiveTab(index)}
>
  {tab.name}
</button>

        ))}
      </div>
      <div className="p-5 bg-gray-900 text-white rounded-b-lg">
        {tabs[activeTab].content}
      </div>
    </div>
  )
}
