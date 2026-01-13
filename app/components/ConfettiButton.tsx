"use client";

import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function ConfettiButton() {
  const [active, setActive] = useState(false);
  const { width, height } = useWindowSize();

  return (
    <div className="flex flex-col items-center space-y-3">
      <button
        onClick={() => setActive(true)}
        className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-500 transition"
      >
        Celebrate 🎉
      </button>

      {active && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          recycle={false}
          gravity={0.3}
          onConfettiComplete={() => setActive(false)}
        />
      )}
    </div>
  );
}
