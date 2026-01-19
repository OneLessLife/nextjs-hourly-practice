"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  minutes: number;
  completed: boolean;
  createdAt: string;
  running: boolean;
};

export default function ProductivityDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("");
  const [search, setSearch] = useState("");
  const [streak, setStreak] = useState(0);

  // Load
  useEffect(() => {
    const saved = localStorage.getItem("extreme_tasks");
    const savedStreak = localStorage.getItem("extreme_streak");
    if (saved) setTasks(JSON.parse(saved));
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("extreme_tasks", JSON.stringify(tasks));
    localStorage.setItem("extreme_streak", String(streak));
  }, [tasks, streak]);

  // Timer engine
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.running ? { ...t, minutes: t.minutes + 1 } : t
        )
      );
    }, 60000); // κάθε 1 λεπτό

    return () => clearInterval(interval);
  }, []);

  function addTask() {
    if (!title) return;

    const task: Task = {
      id: Date.now(),
      title,
      minutes: Number(minutes) || 0,
      completed: false,
      createdAt: new Date().toLocaleString(),
      running: false,
    };

    setTasks((prev) => [task, ...prev]);
    setTitle("");
    setMinutes("");
  }

  function toggleRun(id: number) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, running: !t.running } : t
      )
    );
  }

  function toggleComplete(id: number) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id && !t.completed) {
          setStreak((s) => s + 1);
        }
        return t.id === id ? { ...t, completed: !t.completed } : t;
      })
    );
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // Drag reorder
  function onDragStart(e: React.DragEvent, id: number) {
    e.dataTransfer.setData("id", String(id));
  }

  function onDrop(e: React.DragEvent, targetId: number) {
    const draggedId = Number(e.dataTransfer.getData("id"));
    if (draggedId === targetId) return;

    const newTasks = [...tasks];
    const draggedIndex = newTasks.findIndex((t) => t.id === draggedId);
    const targetIndex = newTasks.findIndex((t) => t.id === targetId);

    const [draggedItem] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedItem);

    setTasks(newTasks);
  }

  function exportCSV() {
    const csv = [
      ["Title", "Minutes", "Completed", "Created At"],
      ...tasks.map((t) => [
        t.title,
        t.minutes,
        t.completed ? "Yes" : "No",
        t.createdAt,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.csv";
    a.click();
  }

  // Stats
  const totalMinutes = tasks.reduce((sum, t) => sum + t.minutes, 0);
  const completedMinutes = tasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.minutes, 0);

  const productivity =
    totalMinutes === 0 ? 0 : Math.round((completedMinutes / totalMinutes) * 100);

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-zinc-950 text-white rounded-xl shadow-2xl border border-zinc-800">
      <h1 className="text-4xl font-bold mb-2">⚡ Extreme Productivity System</h1>
      <p className="text-zinc-400 mb-6">
        Real-time tracking • Analytics • Persistence • Drag ordering
      </p>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6 text-center">
        <Stat title="Total Minutes" value={totalMinutes} />
        <Stat title="Completed Minutes" value={completedMinutes} />
        <Stat title="Productivity" value={`${productivity}%`} />
        <Stat title="Daily Streak" value={`${streak}🔥`} />
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-4">
        <input
          className="flex-1 p-2 rounded bg-zinc-900 border border-zinc-700"
          placeholder="New task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-28 p-2 rounded bg-zinc-900 border border-zinc-700"
          placeholder="Minutes"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <button
          onClick={addTask}
          className="px-4 bg-green-600 rounded font-semibold"
        >
          Add
        </button>
        <button
          onClick={exportCSV}
          className="px-4 bg-blue-600 rounded font-semibold"
        >
          Export CSV
        </button>
      </div>

      {/* Search */}
      <input
        className="w-full p-2 mb-4 rounded bg-zinc-900 border border-zinc-700"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, task.id)}
            className="flex justify-between items-center bg-zinc-900 p-3 rounded border border-zinc-800 cursor-move"
          >
            <div>
              <p
                className={`font-semibold ${
                  task.completed ? "line-through text-zinc-500" : ""
                }`}
              >
                {task.title}
              </p>
              <p className="text-xs text-zinc-500">
                {task.minutes} min • {task.createdAt}
                {task.running && " • ⏱ Running"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleRun(task.id)}
                className="px-3 py-1 rounded bg-yellow-600 text-sm"
              >
                {task.running ? "Stop" : "Start"}
              </button>
              <button
                onClick={() => toggleComplete(task.id)}
                className="px-3 py-1 rounded bg-purple-600 text-sm"
              >
                {task.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 rounded bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="text-zinc-500 text-center mt-6">
            No tasks yet — add one above 🚀
          </p>
        )}
      </div>
    </div>
  );
}

// Small stat card
function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
