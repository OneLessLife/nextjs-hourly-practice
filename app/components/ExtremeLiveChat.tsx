"use client";

import { useEffect, useState, useRef } from "react";

type Message = {
  id: number;
  user: string;
  text: string;
};

const users = ["Alice", "Bob", "Charlie", "You"];

export default function ExtremeLiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fake other users sending messages every 3-5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * 3)]; // not "You"
      const randomText = [
        "Hello!",
        "How's it going?",
        "Check this out!",
        "Did you finish the task?",
        "Let's meet at 5pm",
      ][Math.floor(Math.random() * 5)];

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), user: randomUser, text: randomText },
      ]);
    }, Math.random() * 2000 + 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), user: "You", text: input },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col bg-gray-900 rounded-xl p-4 w-full max-w-md h-[500px]">
      <h2 className="text-xl font-bold mb-3">Live Chat</h2>

      <div className="flex-1 overflow-y-auto mb-3 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${
              msg.user === "You" ? "bg-blue-600 text-white self-end" : "bg-gray-700 text-white self-start"
            } max-w-[80%]`}
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
          placeholder="Type a message..."
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
