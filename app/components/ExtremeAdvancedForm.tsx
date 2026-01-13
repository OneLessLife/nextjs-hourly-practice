"use client";

import { useEffect, useState } from "react";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const STORAGE_KEY = "extreme-form-draft";

export default function ExtremeAdvancedForm() {
  const [form, setForm] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [draftSaved, setDraftSaved] = useState(false);

  // 🔹 Load draft on first render
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  // 🔹 Auto-save draft on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setDraftSaved(true);

    const t = setTimeout(() => setDraftSaved(false), 1500);
    return () => clearTimeout(t);
  }, [form]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function clearDraft() {
    localStorage.removeItem(STORAGE_KEY);
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-bold">Extreme Advanced Form</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      {/* Draft indicator */}
      {draftSaved && (
        <p className="text-sm text-green-400">Draft saved locally ✓</p>
      )}

      <div className="flex gap-3">
        <button className="flex-1 bg-blue-600 p-2 rounded">
          Submit
        </button>

        <button
          onClick={clearDraft}
          className="bg-red-600 px-3 rounded"
        >
          Clear Draft
        </button>
      </div>
    </div>
  );
}
