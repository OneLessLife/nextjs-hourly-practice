"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  user: string;
  text: string;
};

const botAnswers: { [key: string]: string } = {
  hello: "Hi! How can I help you today?",
  hi: "Hello there! What do you want to ask?",
  help: "Sure! I can answer your questions here.",
  default: "Interesting question! Let me think...",
};

export default function ExtremeQAChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), user: "You", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate bot answer
    setTimeout(() => {
      const lower = input.toLowerCase();
      const answer =
        Object.keys(botAnswers).find((k) => lower.includes(k)) || "default";
      const botMsg: Message = {
        id: Date.now() + 1,
        user: "Bot",
        text: botAnswers[answer],
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800); // slight delay

    setInput("");
  };

  return (
    <div className="flex flex-col bg-gray-900 rounded-xl p-4 w-full max-w-md h-[500px]">
      <h2 className="text-xl font-bold mb-3">Q&A Chat</h2>

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
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 rounded bg-gray-800 text-white"
          placeholder="Ask me something..."
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
