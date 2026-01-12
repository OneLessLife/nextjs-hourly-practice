"use client";

import { useState } from "react";

// Fake async username check
const fakeCheckUsername = (username: string) =>
  new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(username.toLowerCase() !== "admin" && username.length >= 3);
    }, 500);
  });

// Fake API submission
const fakeAPISubmit = (data: any) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 1500);
  });

export default function ExtremeAdvancedForm() {
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
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") calculatePasswordStrength(value);
    if (name === "username") checkUsername(value);
  }

  async function checkUsername(username: string) {
    setUsernameAvailable(null);
    if (username.trim().length < 3) return;
    const available = await fakeCheckUsername(username);
    setUsernameAvailable(available);
  }

  function calculatePasswordStrength(password: string) {
    let strength = 0;
    if (password.length >= 6) strength += 30;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }

  function validate() {
    let valid = true;
    const newErrors = { username: "", email: "", password: "", confirmPassword: "" };

    // Username
    if (form.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    } else if (usernameAvailable === false) {
      newErrors.username = "Username is already taken";
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");

    if (validate()) {
      setLoading(true);
      await fakeAPISubmit(form);
      setLoading(false);

      setSuccess("🎉 Registration successful!");
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
      setPasswordStrength(0);
      setUsernameAvailable(null);
    }
  }

  const strengthColor =
    passwordStrength < 40 ? "bg-red-500" :
    passwordStrength < 70 ? "bg-yellow-400" :
    "bg-green-500";

  return (
    <div className="max-w-sm space-y-4">
      <h2 className="text-xl font-bold">Extreme Advanced Register Form</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Username */}
        <div>
          <input
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          {usernameAvailable !== null && (
            <p
              className={`text-sm ${
                usernameAvailable ? "text-green-400" : "text-red-400"
              }`}
            >
              {usernameAvailable ? "Username is available" : "Username is taken"}
            </p>
          )}
          <p className="text-red-400 text-sm">{errors.username}</p>
        </div>

        {/* Email */}
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

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-300"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>

          {/* Strength meter */}
          <div className="w-full h-2 bg-gray-700 rounded mt-1">
            <div
              className={`h-2 rounded ${strengthColor}`}
              style={{ width: `${passwordStrength}%` }}
            />
          </div>
          <p className="text-red-400 text-sm">{errors.password}</p>
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
        </div>

        {/* Submit button with loading */}
        <button
          type="submit"
          className={`w-full bg-blue-500 px-4 py-2 rounded font-semibold hover:bg-blue-400 transition flex justify-center items-center`}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {success && <p className="text-green-400 font-semibold animate-pulse">{success}</p>}
    </div>
  );
}
