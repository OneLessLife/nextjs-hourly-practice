"use client";

import { useState } from "react";

export default function TimeTravelEditor() {
  const [history, setHistory] = useState<string[]>([""]);
  const [step, setStep] = useState(0);

  const currentValue = history[step];

  function updateValue(value: string) {
    const newHistory = history.slice(0, step + 1);
    setHistory([...newHistory, value]);
    setStep(newHistory.length);
  }

  function undo() {
    if (step > 0) setStep(step - 1);
  }

  function redo() {
    if (step < history.length - 1) setStep(step + 1);
  }

  function reset() {
    setHistory([""]);
    setStep(0);
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-2xl">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">
        Time Travel Text Editor
      </h2>

      <textarea
        value={currentValue}
        onChange={(e) => updateValue(e.target.value)}
        className="w-full h-40 bg-gray-800 p-3 rounded resize-none"
        placeholder="Start typing..."
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={undo}
          disabled={step === 0}
          className="bg-yellow-500 text-black px-4 py-2 rounded disabled:opacity-40"
        >
          Undo
        </button>

        <button
          onClick={redo}
          disabled={step === history.length - 1}
          className="bg-green-500 text-black px-4 py-2 rounded disabled:opacity-40"
        >
          Redo
        </button>

        <button
          onClick={reset}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Step {step + 1} of {history.length}
      </p>
    </div>
  );
}
