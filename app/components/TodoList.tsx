'use client'

import { useState } from 'react'

export default function TodoList() {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, input])
    setInput('')
  }

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div className="p-5 mt-10 max-w-md bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-3">ToDo List</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 rounded text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button
  className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 cursor-pointer"
  onClick={addTodo}
>
  Add
</button>
      </div>
      <ul className="list-disc list-inside">
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center mb-1">
            <span>{todo}</span>
            <button
  className="text-red-500 font-semibold cursor-pointer"
  onClick={() => removeTodo(index)}
>
  X
</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
