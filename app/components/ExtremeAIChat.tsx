"use client";

import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";

type Message = { id: number; user: string; text: string };

export default function ExtremeAIChat() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Avoid SSR hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => scrollToBottom(), [messages]);

  if (!mounted) return null; // render only on client

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), user: "You", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      const botMsg: Message = { id: Date.now() + 1, user: "AI", text: data.answer };
      setMessages((prev) => [...prev, botMsg]);

      // Confetti on each AI answer
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);

    } catch (err) {
      const botMsg: Message = { id: Date.now() + 1, user: "AI", text: "Error answering your question." };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 rounded-xl p-4 w-full max-w-md h-[500px] relative">
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}
      <h2 className="text-xl font-bold mb-3">Extreme AI Q&A Chat</h2>

      <div className="flex-1 overflow-y-auto mb-3 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-[80%] ${
              msg.user === "You"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-700 text-white self-start"
            }`}
          >
            <span className="font-semibold">{msg.user}: </span>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="p-2 rounded max-w-[80%] bg-gray-700 text-white self-start animate-pulse">
            AI is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 rounded bg-gray-800 text-white"
          placeholder="Ask me anything..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}
