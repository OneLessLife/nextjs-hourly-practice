"use client";

import { useState } from "react";

export default function FormValidation() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-100

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      calculatePasswordStrength(value);
    }
  }

  function calculatePasswordStrength(password: string) {
    let strength = 0;
    if (password.length >= 6) strength += 30;
    if (/[A-Z]/.test(password)) strength += 30;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20; // special char
    setPasswordStrength(strength);
  }

  function validate() {
    let valid = true;
    const newErrors = { username: "", email: "", password: "", confirmPassword: "" };

    // Username
    if (form.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    // Password strength
    if (passwordStrength < 60) {
      newErrors.password = "Password is too weak";
      valid = false;
    }

    // Confirm password
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");

    if (validate()) {
      setSuccess("✅ Registration successful!");
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
      setPasswordStrength(0);
    }
  }

  // Dynamic color based on strength
  const strengthColor =
    passwordStrength < 40 ? "bg-red-500" :
    passwordStrength < 70 ? "bg-yellow-400" :
    "bg-green-500";

  return (
    <div className="max-w-sm space-y-4">
      <h2 className="text-xl font-bold">Register Form</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <div>
          <input
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <p className="text-red-400 text-sm">{errors.username}</p>
        </div>

        <div>
          <input
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <p className="text-red-400 text-sm">{errors.email}</p>
        </div>

        <div>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <div className="w-full h-2 bg-gray-700 rounded mt-1">
            <div
              className={`h-2 rounded ${strengthColor}`}
              style={{ width: `${passwordStrength}%` }}
            ></div>
          </div>
          <p className="text-red-400 text-sm">{errors.password}</p>
        </div>

        <div>
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded font-semibold hover:bg-blue-400 transition"
        >
          Submit
        </button>

      </form>

      {success && (
        <p className="text-green-400 font-semibold">{success}</p>
      )}
    </div>
  );
}
