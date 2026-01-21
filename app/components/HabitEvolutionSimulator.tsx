"use client";

import { useEffect, useState } from "react";

type Habit = {
  id: number;
  name: string;
  xp: number;
  life: number;
  level: number;
  lastCheck: string;
};

export default function HabitEvolutionSimulator() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");

  // Load
  useEffect(() => {
    const saved = localStorage.getItem("habits_evolution");
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("habits_evolution", JSON.stringify(habits));
  }, [habits]);

  // Daily decay simulation
  useEffect(() => {
    const today = new Date().toDateString();

    setHabits((prev) =>
      prev.map((h) => {
        if (h.lastCheck !== today) {
          return {
            ...h,
            life: Math.max(0, h.life - 10),
            lastCheck: today,
          };
        }
        return h;
      })
    );
  }, []);

  function addHabit() {
    if (!name) return;

    const newHabit: Habit = {
      id: Date.now(),
      name,
      xp: 0,
      life: 100,
      level: 1,
      lastCheck: new Date().toDateString(),
    };

    setHabits((prev) => [...prev, newHabit]);
    setName("");
  }

  function completeHabit(id: number) {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const newXp = h.xp + 20;
          const newLevel = Math.floor(newXp / 100) + 1;
          return {
            ...h,
            xp: newXp,
            level: newLevel,
            life: Math.min(100, h.life + 15),
          };
        }
        return h;
      })
    );
  }

  function deleteHabit(id: number) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-950 text-white rounded-xl border border-slate-800 shadow-xl">
      <h2 className="text-3xl font-bold mb-2">🧬 Habit Evolution Simulator</h2>
      <p className="text-slate-400 mb-6">
        Habits grow if you feed them. Neglected habits fade.
      </p>

      {/* Add Habit */}
      <div className="flex gap-3 mb-6">
        <input
          className="flex-1 p-2 rounded bg-slate-900 border border-slate-700"
          placeholder="New habit name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addHabit}
          className="px-4 bg-green-600 rounded font-semibold"
        >
          Create
        </button>
      </div>

      {/* Habits */}
      <div className="space-y-4">
        {habits.map((h) => (
          <div
            key={h.id}
            className="p-4 bg-slate-900 rounded border border-slate-800"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-bold text-lg">{h.name}</p>
                <p className="text-xs text-slate-500">
                  Level {h.level} • XP {h.xp}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => completeHabit(h.id)}
                  className="px-3 py-1 bg-green-600 rounded text-sm"
                >
                  Did it ✔
                </button>
                <button
                  onClick={() => deleteHabit(h.id)}
                  className="px-3 py-1 bg-red-600 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Life Bar */}
            <div className="w-full bg-slate-800 rounded h-3">
              <div
                className="h-3 rounded transition-all"
                style={{
                  width: `${h.life}%`,
                  background:
                    h.life > 60
                      ? "#22c55e"
                      : h.life > 30
                      ? "#eab308"
                      : "#ef4444",
                }}
              />
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Life {h.life}%
            </p>
          </div>
        ))}

        {habits.length === 0 && (
          <p className="text-slate-500 text-center mt-10">
            No habits created yet 🌱
          </p>
        )}
      </div>
    </div>
  );
}
