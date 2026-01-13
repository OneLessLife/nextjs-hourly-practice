"use client";

import { useState, useRef, useEffect } from "react";

type Question = {
  text: string;
  keywords: string[];
};

type Role = "Frontend" | "Backend" | "Fullstack";

const questionsByRole: Record<Role, Question[]> = {
  Frontend: [
    { text: "Explain the difference between relative and absolute positioning in CSS.", keywords: ["relative", "absolute", "position"] },
    { text: "What is a React hook? Name two examples.", keywords: ["hook", "useState", "useEffect"] },
    { text: "How does virtual DOM improve performance?", keywords: ["virtual DOM", "performance", "diffing"] },
  ],
  Backend: [
    { text: "Explain the difference between SQL and NoSQL databases.", keywords: ["SQL", "NoSQL", "database"] },
    { text: "What is a REST API?", keywords: ["REST", "API", "HTTP"] },
    { text: "How would you handle authentication in a Node.js app?", keywords: ["authentication", "JWT", "token"] },
  ],
  Fullstack: [
    { text: "How do you handle state in a fullstack web application?", keywords: ["state", "frontend", "backend"] },
    { text: "Explain how you would connect a frontend form to a backend API.", keywords: ["form", "API", "request"] },
    { text: "What strategies do you use to debug a fullstack project?", keywords: ["debug", "logs", "network"] },
  ],
};

export default function AIJobInterview() {
  const [role, setRole] = useState<Role>("Frontend");
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState<{ question: string; answer: string; score: number }[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const askNext = () => {
    setAnswer("");
    setFeedback(null);
    setCurrentQ((prev) => (prev + 1 < questionsByRole[role].length ? prev + 1 : 0));
  };

  const submitAnswer = () => {
    const question = questionsByRole[role][currentQ];
    let score = 0;
    question.keywords.forEach((kw) => {
      if (answer.toLowerCase().includes(kw.toLowerCase())) score += 1;
    });

    const total = question.keywords.length;
    const perc = Math.round((score / total) * 100);

    setHistory((prev) => [...prev, { question: question.text, answer, score: perc }]);
    setFeedback(`AI Feedback: You included ${score} of ${total} keywords. Score: ${perc}%`);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI Job Interview Simulator</h2>

      <div className="mb-4 flex gap-2">
        {(["Frontend", "Backend", "Fullstack"] as Role[]).map((r) => (
          <button
            key={r}
            onClick={() => { setRole(r); setCurrentQ(0); setHistory([]); setFeedback(null); }}
            className={`px-3 py-1 rounded ${role === r ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"}`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mb-3">
        <p className="font-semibold">Question {currentQ + 1}:</p>
        <p className="mb-2">{questionsByRole[role][currentQ].text}</p>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          rows={3}
          placeholder="Type your answer here..."
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={submitAnswer} className="bg-green-500 px-3 py-1 rounded hover:bg-green-400">
          Submit Answer
        </button>
        <button onClick={askNext} className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-400">
          Next Question
        </button>
      </div>

      {feedback && <div className="mb-4 p-2 bg-gray-700 rounded">{feedback}</div>}

      <div className="max-h-40 overflow-y-auto space-y-2">
        {history.map((h, idx) => (
          <div key={idx} className="p-2 bg-gray-800 rounded">
            <p className="font-semibold">Q: {h.question}</p>
            <p>A: {h.answer}</p>
            <p>Score: {h.score}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
